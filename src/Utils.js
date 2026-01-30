// Utils.js

/**
 * Standard HTML include helper
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Helper to get or create the database sheet.
 */
function getDbSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Initialize headers
    sheet.appendRow([
      "Timestamp", 
      "Student", 
      "URL", 
      "Source Name", 
      "Author", 
      "Bias_X", 
      "Reliability_Y", 
      "Evidence", 
      "WordCount",
      "XP_Earned",
      "Status"
    ]);
    // Optional styling for headers
    sheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#e0e0e0");
  }
  return sheet;
}
