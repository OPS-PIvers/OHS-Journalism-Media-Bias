// Code.js

/**
 * Serves the HTML template for the web app.
 * Dynamically serves views based on parameters or defaults to dashboard.
 */
function doGet(e) {
  var page = e.parameter.page || 'dashboard';
  var role = getUserRole();
  
  // Security: Prevent students from accessing teacher page
  if (page === 'teacher' && role !== ROLE_TEACHER) {
    page = 'dashboard';
  }

  var template = HtmlService.createTemplateFromFile('index');
  
  // Pass variables to the template
  template.activePage = page;
  template.userRole = role;
  
  return template.evaluate()
    .setTitle(APP_TITLE)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// --- Auth Layer ---

function getUserRole() {
  // In a real environment, check the user's email against a database of teachers.
  // For this template, we treat the script owner (developer) as the teacher.
  var activeUser = Session.getActiveUser().getEmail();
  var effectiveUser = Session.getEffectiveUser().getEmail();
  
  // If running in dev mode or user is the owner
  if (activeUser === effectiveUser || activeUser === '') {
    return ROLE_TEACHER;
  }
  
  // TODO: Add logic to check a "Teachers" sheet if needed
  return ROLE_STUDENT;
}

// --- Persistence Layer ---

/**
 * Handles the form submission from the client.
 */
function submitReport(data) {
  try {
    var sheet = getDbSheet();
    var timestamp = new Date();
    
    // Calculate simple XP logic
    var xp = XP_BASE; 
    if (Math.abs(data.bias) < 10) xp += XP_BONUS_CENTRIST; 
    if (data.wordCount > 50) xp += XP_BONUS_DETAIL; 
    
    // Mock student identity for now (or get from Session)
    var studentName = Session.getActiveUser().getEmail() || "Anonymous Scout"; 
    
    sheet.appendRow([
      timestamp,
      studentName,
      data.url,
      data.sourceName,
      data.author,
      data.bias,
      data.reliability,
      data.evidence,
      data.wordCount,
      xp,
      "Pending" // Initial status
    ]);
    
    return { success: true, xpEarned: xp, message: "Report successfully archived." };
  } catch (err) {
    return { success: false, message: "Transmission failed: " + err.toString() };
  }
}

/**
 * Fetches the most recent reports for the dashboard.
 */
function getRecentReports() {
  try {
    var sheet = getDbSheet();
    var lastRow = sheet.getLastRow();
    
    if (lastRow < 2) return []; // Only headers exist
    
    // Get last 10 rows
    var startRow = Math.max(2, lastRow - 9);
    var numRows = lastRow - startRow + 1;
    var data = sheet.getRange(startRow, 1, numRows, 11).getValues();
    
    // Reverse to show newest first and map to object
    return data.reverse().map(function(row) {
      return {
        timestamp: row[0],
        student: row[1],
        url: row[2],
        sourceName: row[3],
        author: row[4],
        bias: Number(row[5]),
        reliability: Number(row[6]),
        evidence: row[7],
        wordCount: row[8],
        xp: row[9],
        status: row[10]
      };
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}
