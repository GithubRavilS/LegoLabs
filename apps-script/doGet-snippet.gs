/**
 * Вставь в НАЧАЛО существующей функции doGet(e) в том же проекте Apps Script:
 */

function doGet(e) {
  var project =
    e && e.parameter && e.parameter.project
      ? String(e.parameter.project).trim().toLowerCase()
      : "";

  if (project === "labs-lend-borrow") {
    return handleLabsLendBorrowDoGet_(e);
  }

  // … дальше твой текущий код Navigator (getData и т.д.)
}
