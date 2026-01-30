// Utils.js

/**
 * Maps raw Bias numbers (-42 to 42) to descriptive labels.
 */
function getBiasLabel(val) {
  var v = Number(val);
  if (v < -30) return "Extremely Left";
  if (v < -12) return "Left Skew";
  if (v < 12)  return "Center / Balanced";
  if (v < 30)  return "Right Skew";
  return "Extremely Right";
}

/**
 * Maps raw Reliability numbers (0 to 64) to descriptive labels.
 */
function getReliabilityLabel(val) {
  var v = Number(val);
  if (v < 16) return "Low / Fabricated";
  if (v < 32) return "Opinion / Mixed";
  if (v < 48) return "Factual / Analytical";
  return "Highly Reliable";
}

/**
 * Standard HTML include helper for static content
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Helper to render a partial view with data.
 * This evaluates the template, executing any scriptlets inside.
 */
function renderView(filename, data) {
  var template = HtmlService.createTemplateFromFile(filename);
  if (data) {
    for (var key in data) {
      template[key] = data[key];
    }
  }
  return template.evaluate().getContent();
}

/**
 * Helper to get or create the images storage folder.
 */
function getImagesFolder() {
  var folders = DriveApp.getFoldersByName(IMAGES_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    var folder = DriveApp.createFolder(IMAGES_FOLDER_NAME);
    // Ensure the folder is accessible to users with the link (so they can see images)
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return folder;
  }
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
