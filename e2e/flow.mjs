// End-to-end test of the real sign-in + event registration flow, against the Firebase emulators
// with the production firestore.rules. Run by .github/workflows/e2e.yml.
import { chromium } from "playwright";
import assert from "node:assert/strict";

const APP = "http://127.0.0.1:8000/";
const DB = "http://127.0.0.1:8080/v1/projects/demo-ttcmh/databases/(default)/documents";
const admin = { headers: { Authorization: "Bearer owner" } };
const docs = async (c) => ((await (await fetch(`${DB}/${c}`, admin)).json()).documents || []);
const field = (d, k) => { const f = d.fields[k] || {}; return f.stringValue ?? f.integerValue ?? f.booleanValue; };

const browser = await chromium.launch();
const errors = [];
let step = "start";
// logs are read through annotations (the raw log download is not reachable from every tool)
const ok = (m) => console.log("::notice::✓ " + m);

async function signIn(page, email, name) {
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
  page.on("console", (m) => { if (m.type() === "error" && !/favicon|googleapis|Failed to load resource/.test(m.text())) errors.push(`${label} console: ${m.text()}`); });
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

try {
  await run({ width: 390, height: 844 }, "android");
  await run({ width: 375, height: 667 }, "small");
  assert.deepEqual(errors, [], "no page errors");
  console.log("\nכל הבדיקות עברו");
} catch (e) {
  console.log(`::error::✗ נכשל בשלב ${step}: ${String(e.message).replace(/\n/g, " | ").slice(0, 900)}`); for (const x of errors.slice(0, 8)) console.log(`::warning::${x.replace(/\n/g, " ").slice(0, 400)}`); process.exitCode = 1;
} finally { await browser.close(); }
