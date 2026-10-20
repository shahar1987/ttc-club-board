// Anonymous stats collector for the club app (paste into Extensions > Apps Script of the stats sheet).
// Deploy: Deploy > New deployment > Web app, Execute as: Me, Who has access: Anyone.
// Hardened 2026-10-20: allow-list of event types, length limits, formula-injection guard,
// per-visitor rate limit and a hard row cap so nobody can flood or break the sheet.
const TYPES = ["view", "section", "click", "player", "league", "post", "social"];
const MAX_ROWS = 200000;          // stop writing long before the Sheets cell limit
const PER_VISITOR_10MIN = 60;     // events per anonymous visitor per 10 minutes

function clean(v, n) {
  if (typeof v !== "string") return "";
  v = v.replace(/[\u0000-\u001f]/g, " ").slice(0, n);   // no control characters (tab/CR tricks)
  return /^[=+\-@|]/.test(v) ? "'" + v : v;              // never let a cell become a formula
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "[]");
    const list = (Array.isArray(body) ? body : [body]).slice(0, 20);
    const rows = list
      .filter(x => x && TYPES.indexOf(x.t) >= 0 && typeof x.v === "string" && /^[a-z0-9]{6,16}$/.test(x.v))
      .map(x => [new Date(), x.v, x.t, clean(x.n, 80), clean(x.s, 20), clean(x.d, 10)]);
    if (!rows.length) return ContentService.createTextOutput("ok");

    const cache = CacheService.getScriptCache();
    const key = "rl_" + rows[0][1];
    const used = Number(cache.get(key) || 0);
    if (used + rows.length > PER_VISITOR_10MIN) return ContentService.createTextOutput("ok");
    cache.put(key, String(used + rows.length), 600);

    const lock = LockService.getScriptLock();
    lock.waitLock(5000);
    try {
      const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("events");
      if (sh.getLastRow() < MAX_ROWS) sh.getRange(sh.getLastRow() + 1, 1, rows.length, 6).setValues(rows);
    } finally { lock.releaseLock(); }
  } catch (err) {}
  return ContentService.createTextOutput("ok");
}
