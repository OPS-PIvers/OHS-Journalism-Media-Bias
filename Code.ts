declare namespace GoogleAppsScript {
  namespace Events {
    interface DoGet {
      queryString: string;
      parameter: { [key: string]: string };
      parameters: { [key: string]: string[] };
      contentLength: number;
    }
  }
  namespace HTML {
    interface HtmlOutput {
      setTitle(title: string): HtmlOutput;
      addMetaTag(name: string, content: string): HtmlOutput;
      setXFrameOptionsMode(mode: XFrameOptionsMode): HtmlOutput;
    }
    interface HtmlTemplate {
      evaluate(): HtmlOutput;
    }
    enum XFrameOptionsMode {
      ALLOWALL,
      DEFAULT
    }
  }
}

declare var HtmlService: {
  createTemplateFromFile(filename: string): GoogleAppsScript.HTML.HtmlTemplate;
  XFrameOptionsMode: typeof GoogleAppsScript.HTML.XFrameOptionsMode;
};

declare var SpreadsheetApp: any;

/**
 * Serves the HTML template for the web app.
 * @param e The event parameter for the GET request.
 */
function doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.HTML.HtmlOutput {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('The Weekly Scout')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// --- Persistence Layer ---

/**
 * Helper to get or create the database sheet.
 */
function getDbSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = "Scout_Submissions";
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
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

/**
 * Handles the form submission from the React app.
 */
function submitReport(data: any) {
  try {
    const sheet = getDbSheet();
    const timestamp = new Date();
    
    // Calculate simple XP logic
    let xp = 50; // Base XP
    if (Math.abs(data.bias) < 10) xp += 15; // Centrist bonus
    if (data.wordCount > 50) xp += 10; // Detail bonus
    
    // Mock student identity for now
    const studentName = "Cmdr. Alex Chen"; 
    
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
    const sheet = getDbSheet();
    const lastRow = sheet.getLastRow();
    
    if (lastRow < 2) return []; // Only headers exist
    
    // Get last 10 rows
    const startRow = Math.max(2, lastRow - 9);
    const numRows = lastRow - startRow + 1;
    const data = sheet.getRange(startRow, 1, numRows, 11).getValues();
    
    // Reverse to show newest first and map to object
    return data.reverse().map(row => ({
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
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}