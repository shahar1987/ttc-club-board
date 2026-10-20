// End-to-end test of the real sign-in + event registration flow, against the Firebase emulators
// with the production firestore.rules. Run by .github/workflows/e2e.yml.
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const APP = "http://127.0.0.1:8000/";
const DB = "http://127.0.0.1:8080/v1/projects/demo-ttcmh/databases/(default)/documents";
const admin = { headers: { Authorization: "Bearer owner" } };
const docs = async (c) => ((await (await fetch(`${DB}/${c}`, admin)).json()).documents || []);
const field = (d, k) => { const f = d.fields[k] || {}; return f.stringValue ?? f.integerValue ?? f.booleanValue; };

const browser = await chromium.launch();
const errors = [];
let step = "start";
// logs are read through annotations (the raw log download is not reachable from every tool)
// waitForFunction polls with eval, which the page's CSP blocks; evaluate() does not
async function until(page, fn, ms = 15000) { for (const t = Date.now(); Date.now() - t < ms; await page.waitForTimeout(200)) if (await page.evaluate(fn).catch(() => false)) return; throw new Error("timed out waiting"); }
const ok = (m) => console.log("::notice::✓ " + m);

async function signIn(page, email, name) {
  await until(page, () => typeof ME !== "undefined" && ME.ready);
  const [pop] = await Promise.all([page.waitForEvent("popup"), page.click("#gateIn")]);
  await pop.waitForLoadState();
  await pop.getByText("Add new account").click();
  await pop.locator("#email-input").fill(email);
  await pop.locator("#display-name-input").fill(name);
  await pop.getByText("Sign in with Google.com").click();
  await pop.waitForEvent("close", { timeout: 15000 }).catch(() => {});
}

async function run(viewport, label) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2, locale: "he-IL" });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${label}: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" && !/favicon|googleapis|Failed to load resource|RPC_ERROR|net::ERR_FAILED/.test(m.text())) errors.push(`${label} console: ${m.text()}`); });
  const shot = (n) => page.screenshot({ path: `shots/${label}-${n}.png` });
  const email = `parent-${label}@example.com`;

  step = "gate"; await page.goto(APP);
  await page.waitForSelector("#gate:not([hidden])", { timeout: 10000 }); await shot("1-gate"); ok(`${label}: מסך כניסה מופיע`);

  step = "sign-in"; await signIn(page, email, "דנה כהן");
  await page.waitForSelector("#mForm", { timeout: 10000 }); await shot("2-member"); ok(`${label}: התחברות עם Google פותחת את טופס הפרטים`);
  assert.equal(await page.inputValue("#mName"), "דנה כהן");

  step = "member-save"; await page.fill("#mPhone", "050-1234567"); await page.check("#mOk"); await page.click("#mSave");
  await page.waitForSelector("#gate", { state: "hidden", timeout: 10000 }); ok(`${label}: שמירת שם וטלפון נכנסת לאפליקציה`);
  const bm = (await docs("boardMembers")).find((d) => field(d, "email") === email);
  assert.ok(bm, "boardMembers doc saved"); assert.equal(field(bm, "phone"), "0501234567");

  step = "popup"; await page.waitForSelector("#pop:not([hidden])", { timeout: 10000 }); await shot("3-popup"); ok(`${label}: חלון מרוץ העגור קופץ`);
  await page.click("#popGo"); await page.waitForSelector("#evForm", { timeout: 10000 });
  const heats = await page.$$eval(".f-heat option", (o) => o.map((x) => x.textContent));
  assert.deepEqual(heats, ["4 ק״מ (משפחות)", "10 ק״מ", "21 ק״מ"]);

  step = "event-form";
  await page.selectOption(".pp-row[data-i='0'] .f-bd", "31"); await page.selectOption(".pp-row[data-i='0'] .f-bm", "2"); await page.selectOption(".pp-row[data-i='0'] .f-by", "1985");
  await page.fill("#evCity", "שניר"); await page.click("#evSave");
  assert.match(await page.textContent("#evErr"), /לא קיים/); ok(`${label}: תאריך שלא קיים (31 בפברואר) נעצר עם הסבר`);
  await page.selectOption(".pp-row[data-i='0'] .f-bm", "12");
  await page.selectOption(".pp-row[data-i='0'] .f-heat", "10 ק״מ");
  await page.click("#ppAdd");
  await page.fill(".pp-row[data-i='1'] .f-first", "נועה");
  await page.selectOption(".pp-row[data-i='1'] .f-bd", "1"); await page.selectOption(".pp-row[data-i='1'] .f-bm", "2"); await page.selectOption(".pp-row[data-i='1'] .f-by", "2015");
  await page.selectOption(".pp-row[data-i='1'] .f-gender", "נ");
  await page.selectOption(".pp-row[data-i='1'] .f-shirt", "ילדים 10");
  await page.fill("#evCity", "שניר");
  await shot("4-form");
  await page.click("#evSave");
  step = "event-save";
  let mine = [];
  for (let i = 0; i < 20 && mine.length < 2; i++) { await page.waitForTimeout(500); mine = (await docs("eventSignups")).filter((d) => field(d, "email") === email); }
  if (mine.length < 2) { await shot("4-error"); throw new Error(`saved ${mine.length}/2; form says: "${await page.textContent("#evErr").catch(() => "")}"`); }
  assert.equal(mine.length, 2, "two signups saved");
  const kid = mine.find((d) => field(d, "firstName") === "נועה");
  assert.equal(field(kid, "lastName"), "כהן"); assert.equal(field(kid, "birth"), "1.2.2015"); assert.equal(field(mine.find((d) => field(d, "firstName") !== "נועה"), "birth"), "31.12.1985"); assert.equal(field(kid, "heat"), "4 ק״מ (משפחות)");
  ok(`${label}: הרשמה של שני משתתפים נשמרה עם כל הפרטים`);

  step = "registered-view"; await page.waitForTimeout(800);
  await page.evaluate(() => openEvent()); await page.waitForSelector("#evCancel", { timeout: 10000 }); await shot("5-registered");
  assert.match(await page.textContent("#sheet"), /אתם רשומים/); ok(`${label}: פתיחה חוזרת מראה "אתם רשומים"`);

  step = "cancel"; page.once("dialog", (d) => d.accept()); await page.click("#evCancel"); await page.waitForTimeout(1500);
  assert.equal((await docs("eventSignups")).filter((d) => field(d, "email") === email).length, 0); ok(`${label}: ביטול הרשמה מוחק`);

  step = "reload"; await page.reload(); await page.waitForTimeout(3500);
  assert.equal(await page.isVisible("#gate"), false, "member is not gated again after reload"); ok(`${label}: אחרי רענון נכנס ישר בלי מסך כניסה`);
  step = "weak-line"; await page.route("http://127.0.0.1:8080/**", (r) => r.abort());
  await page.reload(); await page.waitForTimeout(6000);
  assert.equal(await page.isVisible("#gate"), false, "no sign-in screen when the database is unreachable");
  assert.equal(await page.isVisible("#mForm"), false, "not asked for details again when the database is unreachable");
  await page.unroute("http://127.0.0.1:8080/**"); ok(`${label}: גם בלי חיבור למסד — לא מבקש להתחבר או למלא פרטים שוב`);
  await ctx.close();
}

async function kid() {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } }); const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`kid: ${e.message}`));
  step = "kid"; await page.goto(APP); await page.waitForSelector("#gate:not([hidden])", { timeout: 10000 });
  await page.click("#gateKid"); assert.equal(await page.isVisible("#gate"), false);
  await page.reload(); await page.waitForTimeout(4500);
  assert.equal(await page.isVisible("#gate"), false, "kid stays in view-only after reload");
  assert.equal(await page.isVisible("#pop"), false, "no event popup for a kid"); ok("מתחת ל-18: נכנס לצפייה בלי התחברות, ונשאר כך גם אחרי רענון");
  await ctx.close();
}

// admin page: only the owner (checked by the Firestore rules, not just the page) can read or act
const OWNER_EMAIL = "owner-e2e@example.com";
const admin_h = { Authorization: "Bearer owner" };
const PNG = "iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAIAAADRv8uKAAAAL0lEQVR4nO3NIQEAMAgAsHNBLGrQvwkVcJitwKI634V/sorFYrFYLBaLxWKxeGUATQQA1+P4o08AAAAASUVORK5CYII=";
async function signInAdmin(page, email, name) {
  await until(page, () => typeof TTCAuth !== "undefined" && !!TTCAuth.admin);
  const [pop] = await Promise.all([page.waitForEvent("popup"), page.click("#in")]);
  await pop.waitForLoadState(); await pop.getByText("Add new account").click();
  await pop.locator("#email-input").fill(email); await pop.locator("#display-name-input").fill(name);
  await pop.getByText("Sign in with Google.com").click(); await pop.waitForEvent("close", { timeout: 15000 }).catch(() => {});
}
async function adminFlow() {
  step = "admin-seed";
  const r = await fetch(`${DB}/system/boardOwner`, { method: "PATCH", headers: { ...admin_h, "content-type": "application/json" },
    body: JSON.stringify({ fields: { hash: { stringValue: createHash("sha256").update(OWNER_EMAIL).digest("hex") } } }) });
  assert.ok(r.ok, "seed owner doc");

  step = "admin-stranger"; let ctx = await browser.newContext({ viewport: { width: 390, height: 844 } }); let page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`admin: ${e.message}`));
  await page.goto(APP + "admin.html"); await page.waitForSelector("#in", { timeout: 15000 });
  await signInAdmin(page, "stranger@example.com", "זר");
  await page.waitForSelector("text=הדף הזה פרטי", { timeout: 10000 });
  const code = await page.evaluate(() => TTCAuth.admin.members().then(() => "read!").catch((e) => e.code));
  assert.equal(code, "permission-denied", "a stranger who bypasses the page is refused by the server");
  const code2 = await page.evaluate(() => TTCAuth.admin.push("x", "y", "").then(() => "sent!").catch((e) => e.code));
  assert.equal(code2, "permission-denied"); ok("ניהול: חשבון אחר רואה 'הדף הזה פרטי', והשרת חוסם אותו גם בעקיפת הדף");
  await ctx.close();

  step = "admin-owner"; ctx = await browser.newContext({ viewport: { width: 390, height: 844 } }); page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`admin: ${e.message}`));
  await page.goto(APP + "admin.html"); await page.waitForSelector("#in", { timeout: 15000 });
  await signInAdmin(page, OWNER_EMAIL, "שלום");
  await page.waitForSelector("#new", { timeout: 15000 }); await page.screenshot({ path: "shots/admin-1-posts.png" });
  await page.click("#new");
  await page.fill("#fT", "אימון פתוח בשבת"); await page.fill("#fX", "בואו עם חברים");
  await page.setInputFiles("#fI", { name: "p.png", mimeType: "image/png", buffer: Buffer.from(PNG, "base64") });
  await page.waitForSelector("#fIP img", { timeout: 10000 });
  await page.check("#fE"); await page.fill("#fHe", "4 ק״מ (משפחות), 10 ק״מ");
  await page.screenshot({ path: "shots/admin-2-form.png", fullPage: true });
  await page.click("#fS"); await page.waitForSelector("#new", { timeout: 15000 });
  const posts = await docs("boardPosts"); const mine = posts.find((d) => field(d, "title") === "אימון פתוח בשבת");
  if (!mine) throw new Error("post not saved: " + (await page.textContent("#fErr").catch(() => "")));
  assert.ok(field(mine, "img"), "image linked");
  assert.equal(mine.fields.popup.mapValue.fields.event.stringValue, "crane-2026");
  ok("ניהול: הבעלים מפרסם עדכון עם תמונה וחלון הרשמה");

  step = "admin-push"; await page.click("[data-tab=push]"); await page.waitForSelector("#pT");
  await page.fill("#pT", "האימון היום בוטל"); await page.click("#pGo"); await page.click("#pYes");
  await page.waitForSelector("text=ממתין לשליחה", { timeout: 10000 });
  assert.equal((await docs("pushRequests")).length, 1); ok("ניהול: התראה נכנסת לתור השליחה");

  step = "admin-members"; await page.click("[data-tab=members]");
  await page.waitForSelector("#ml .card", { timeout: 10000 });
  await page.screenshot({ path: "shots/admin-3-members.png" }); ok("ניהול: רשימת הנרשמים נטענת");
  step = "admin-signups"; await page.click("[data-tab=signups]"); await page.waitForSelector("#sl .card", { timeout: 10000 }); ok("ניהול: מסך ההרשמות נטען");
  step = "admin-add-manager"; await page.click("[data-tab=managers]"); await page.waitForSelector("#mE");
  await page.fill("#mE", "mgr-e2e@example.com"); await page.fill("#mN", "עוזר"); await page.click("#mf button[type=submit]");
  await page.waitForSelector("#mgl >> text=mgr-e2e@example.com", { timeout: 10000 }); ok("ניהול: הבעלים מוסיף מנהל");
  await ctx.close();

  step = "manager"; ctx = await browser.newContext({ viewport: { width: 390, height: 844 } }); page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`manager: ${e.message}`));
  await page.goto(APP + "admin.html"); await page.waitForSelector("#in", { timeout: 15000 });
  await signInAdmin(page, "mgr-e2e@example.com", "עוזר");
  await page.waitForSelector("#new", { timeout: 15000 });
  assert.deepEqual(await page.$$eval("#tabbar .tab", (t) => t.map((x) => x.dataset.tab)), ["posts", "more"], "a manager sees updates only");
  await page.click("#new"); await page.fill("#fT", "עדכון ממנהל"); await page.click("#fS"); await page.waitForSelector("#new", { timeout: 15000 });
  assert.ok((await docs("boardPosts")).some((d) => field(d, "title") === "עדכון ממנהל"), "manager post saved");
  assert.equal(await page.evaluate(() => TTCAuth.admin.members().then(() => "read!").catch((e) => e.code)), "permission-denied", "manager cannot read members");
  ok("מנהל: מפרסם עדכון, ולא רואה נרשמים"); await ctx.close();


  step = "portal-shows-post"; ctx = await browser.newContext({ viewport: { width: 390, height: 844 } }); page = await ctx.newPage();
  await page.goto(APP);
  await page.waitForSelector("#newsRail >> text=אימון פתוח בשבת", { timeout: 15000 });
  assert.ok(await page.$('#newsRail img[src^="data:image/jpeg"]'), "picture from the admin page shows in the portal");
  await page.screenshot({ path: "shots/admin-4-portal.png" }); ok("הפורטל מציג את העדכון החדש עם התמונה");
  await ctx.close();
}

// the portal is open: no sign-in for visitors (owner's decision 20.10.2026)
async function visitor(viewport, label) {
  const ctx = await browser.newContext({ viewport }); const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${label}: ${e.message}`));
  step = "visitor-open"; await page.goto(APP); await page.waitForSelector("#sh", { timeout: 10000 }); await page.waitForTimeout(3000);
  assert.equal(await page.$("#gate"), null, "no sign-in screen"); assert.equal(await page.isVisible("#adminLink"), false, "no admin tab for visitors");
  step = "visitor-popup"; await page.waitForSelector("#pop:not([hidden])", { timeout: 10000 });
  const [tab] = await Promise.all([ctx.waitForEvent("page", { timeout: 10000 }), page.click("#popGo")]);
  assert.match(tab.url(), /docs\.google\.com/, "registration opens the organisers' file"); await tab.close();
  step = "visitor-card"; await page.waitForSelector("#me #invite", { timeout: 10000 });
  await page.screenshot({ path: `shots/${label}-home.png` }); ok(`${label}: נכנסים בלי התחברות, חלון המרוץ מוביל להרשמה של המארגנים`);
  await ctx.close();
}

try {
  await visitor({ width: 390, height: 844 }, "android");
  await visitor({ width: 375, height: 667 }, "small");
  await adminFlow();
  assert.deepEqual(errors, [], "no page errors");
  console.log("\nכל הבדיקות עברו");
} catch (e) {
  console.log(`::error::✗ נכשל בשלב ${step}: ${String(e.message).replace(/\n/g, " | ").slice(0, 900)}`); for (const x of errors.slice(0, 8)) console.log(`::warning::${x.replace(/\n/g, " ").slice(0, 400)}`); process.exitCode = 1;
} finally { await browser.close(); }
