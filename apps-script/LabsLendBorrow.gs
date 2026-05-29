/**
 * Labs Lend → Lego Labs (топ-3 borrow stablecoin, APY asc).
 * Вставь этот файл в тот же проект Google Apps Script, что и Navigator для Lego Labs.
 *
 * 1) Скопируй код в script.google.com (проект с URL …/AKfycbwap…/exec).
 * 2) В начале doGet(e) добавь ветку из doGet-snippet.gs.
 * 3) Один раз запусти installLabsLendHourlyTrigger из редактора.
 * 4) Развёртывание → Управление → Новая версия → обновить Web App.
 *
 * Опционально в «Свойства скрипта»:
 *   DEFILABS_VIP_NAV — NAV:… для fallback на cry-maden008 /api/rates (если GitHub недоступен).
 */

var LABS_LEND_GITHUB_JSON =
  "https://raw.githubusercontent.com/GithubRavilS/Lendingdepositrates/main/data/embed/top-borrow-stablecoins.json";
var LABS_LEND_API_BASE = "https://cry-maden008.pythonanywhere.com";
var LABS_LEND_CACHE_KEY = "LABS_LEND_BORROW_CACHE";
var LABS_LEND_CACHE_TS_KEY = "LABS_LEND_BORROW_CACHE_TS";
var LABS_LEND_CACHE_MAX_AGE_MS = 55 * 60 * 1000;

function fetchLabsLendBorrowLive_() {
  var headers = { Accept: "application/json" };
  var props = PropertiesService.getScriptProperties();
  var nav = props.getProperty("DEFILABS_VIP_NAV");

  var urls = [
    LABS_LEND_API_BASE + "/api/embed/top-borrow-stablecoins",
    LABS_LEND_GITHUB_JSON,
    LABS_LEND_API_BASE +
      "/api/rates?mode=borrow&sort_by=borrow_apy&order=asc&limit=3&token_family=stablecoin",
  ];

  var i;
  for (i = 0; i < urls.length; i++) {
    try {
      var opts = {
        method: "get",
        muteHttpExceptions: true,
        headers: headers,
      };
      if (i === 2 && nav) {
        opts.headers = { Accept: "application/json", Authorization: "Bearer " + nav };
      }
      var res = UrlFetchApp.fetch(urls[i], opts);
      if (res.getResponseCode() !== 200) continue;
      var payload = JSON.parse(res.getContentText());
      if (payload && payload.ok && payload.items && payload.items.length) {
        payload.source = i === 0 ? "labs-lend-embed" : i === 1 ? "github" : "labs-lend-api";
        payload.updatedAt = new Date().toISOString();
        return payload;
      }
    } catch (err) {
      // try next source
    }
  }
  return { ok: false, items: [], error: "all_sources_failed" };
}

function refreshLabsLendBorrowCache() {
  var payload = fetchLabsLendBorrowLive_();
  var props = PropertiesService.getScriptProperties();
  props.setProperty(LABS_LEND_CACHE_KEY, JSON.stringify(payload));
  props.setProperty(LABS_LEND_CACHE_TS_KEY, String(Date.now()));
  return payload;
}

function getLabsLendBorrowPayload() {
  var props = PropertiesService.getScriptProperties();
  var raw = props.getProperty(LABS_LEND_CACHE_KEY);
  var ts = Number(props.getProperty(LABS_LEND_CACHE_TS_KEY) || 0);
  var stale = !ts || Date.now() - ts > LABS_LEND_CACHE_MAX_AGE_MS;

  if (!raw || stale) {
    return refreshLabsLendBorrowCache();
  }

  try {
    var cached = JSON.parse(raw);
    if (cached && cached.ok && cached.items && cached.items.length) {
      return cached;
    }
  } catch (e) {
    // refresh below
  }
  return refreshLabsLendBorrowCache();
}

function installLabsLendHourlyTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  var i;
  for (i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "refreshLabsLendBorrowCache") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger("refreshLabsLendBorrowCache").timeBased().everyHours(1).create();
  refreshLabsLendBorrowCache();
}

function handleLabsLendBorrowDoGet_(e) {
  var callback = e && e.parameter && e.parameter.callback;
  var data = getLabsLendBorrowPayload();
  if (callback) {
    var jsonStr = JSON.stringify(data);
    var safeCallback = String(callback).replace(/[^a-zA-Z0-9_.]/g, "");
    return ContentService.createTextOutput(safeCallback + "(" + jsonStr + ")").setMimeType(
      ContentService.MimeType.JAVASCRIPT,
    );
  }
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
