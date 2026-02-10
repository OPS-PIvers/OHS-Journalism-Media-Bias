// Code.js

/**
 * Creates a custom menu in the Spreadsheet.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('THE WEEKLY SCOUT')
      .addItem('Initialize Newsroom', 'initializeSheets')
      .addSeparator()
      .addItem('Open Newsroom Web App', 'openWebAppUrl')
      .addToUi();
}

/**
 * Robust Initialization: Creates sheets and Drive folders.
 */
function initializeSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  getDbSheet(); // Initializes Scout_Submissions
  getImagesFolder(); // Initializes Drive folder
  
  // Teachers Sheet
  var teacherSheet = ss.getSheetByName("Teachers") || ss.insertSheet("Teachers");
  if (teacherSheet.getLastRow() === 0) {
    teacherSheet.appendRow(["Teacher Email", "Teacher Display Name"]);
    teacherSheet.getRange(1, 1, 1, 2).setFontWeight("bold").setBackground("#d1d5db");
    teacherSheet.appendRow([Session.getEffectiveUser().getEmail(), "Lead Editor"]);
  }

  // Roster Sheet
  var rosterSheet = ss.getSheetByName("Roster") || ss.insertSheet("Roster");
  if (rosterSheet.getLastRow() === 0) {
    rosterSheet.appendRow(["Student Email", "Student First", "Student Last", "Total Submissions", "Total XP"]);
    rosterSheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#d1d5db");
  }

  // Ranking System Sheet - Fetching from DEFAULT_RANKS in Constants.js
  var rankingSheet = ss.getSheetByName("Ranking System") || ss.insertSheet("Ranking System");
  if (rankingSheet.getLastRow() === 0) {
    rankingSheet.appendRow(["Points", "Title", "Description"]);
    rankingSheet.getRange(1, 1, 1, 3).setFontWeight("bold").setBackground("#d1d5db");
    rankingSheet.getRange(2, 1, DEFAULT_RANKS.length, 3).setValues(DEFAULT_RANKS);
  }
  
  SpreadsheetApp.getUi().alert('Initialization Complete: Newsroom is ready for operation.');
}

/**
 * Main Router: Serves the Web App views.
 */
function doGet(e) {
  // Handle Email Actions (Approve/Deny)
  if (e.parameter.action && e.parameter.token) {
    return handleEmailAction(e.parameter.action, e.parameter.token);
  }

  var role = getUserRole();
  if (!role) {
    return HtmlService.createHtmlOutputFromFile('views/access_denied')
      .setTitle('Access Denied - The Weekly Scout')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  }

  var page = e.parameter.page || 'dashboard';
  if ((page === 'teacher' || page === 'roster') && role !== ROLE_TEACHER) page = 'dashboard';

  var template = HtmlService.createTemplateFromFile('index');
  template.activePage = page;
  template.userRole = role;
  template.scriptUrl = ScriptApp.getService().getUrl();
  
  return template.evaluate()
    .setTitle(APP_TITLE)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// --- Intelligence Layer (Ranking & Auth) ---

function getRankData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Ranking System");
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  var ranks = [];
  for (var i = 1; i < data.length; i++) {
    ranks.push({ points: Number(data[i][0]), title: data[i][1], description: data[i][2] });
  }
  return ranks.sort(function(a, b) { return b.points - a.points; });
}

function calculateRank(xp, rankData) {
  for (var i = 0; i < rankData.length; i++) {
    if (xp >= rankData[i].points) return rankData[i];
  }
  return { title: "New Hire", description: "Your desk is ready. Submit your first analysis." };
}

function getUserRole() {
  var email = Session.getActiveUser().getEmail().toLowerCase();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var tData = ss.getSheetByName("Teachers").getDataRange().getValues();
  for (var i = 1; i < tData.length; i++) {
    if (tData[i][0].toLowerCase() === email) return ROLE_TEACHER;
  }
  
  var rData = ss.getSheetByName("Roster").getDataRange().getValues();
  for (var j = 1; j < rData.length; j++) {
    if (rData[j][0].toLowerCase() === email) return ROLE_STUDENT;
  }
  return null;
}

// --- Submission & Workflow Logic ---

function submitReport(data) {
  try {
    var sheet = getDbSheet();
    var timestamp = new Date();
    var email = Session.getActiveUser().getEmail(); 
    
    var imageId = "";
    if (data.image) {
      var blob = Utilities.newBlob(Utilities.base64Decode(data.image.split(",")[1]), data.imageType, email + "_" + timestamp.getTime());
      imageId = getImagesFolder().createFile(blob).getId();
    }
    
    var bias = Number(data.bias);
    var reliability = Number(data.reliability);
    var wordCount = Number(data.wordCount);
    
    // Check for "Extreme" conditions (Bonus Candidate)
    // Extreme: High Bias Magnitude (>= 30) AND Low Reliability (< 16)
    var isExtreme = (Math.abs(bias) >= 30 && reliability < 16);
    
    var status = "Approved"; // Default auto-approve
    var xp = XP_BASE + (wordCount > 100 ? XP_BONUS_DETAIL : 0);
    
    if (isExtreme) {
      status = "Pending"; // Needs teacher approval for bonus
      xp = XP_BASE + XP_BONUS_EXTREME + (wordCount > 100 ? XP_BONUS_DETAIL : 0);
    }
    
    sheet.appendRow([timestamp, email, data.url, data.sourceName, data.author, bias, reliability, data.evidence, wordCount, xp, status, "", "", imageId]);
    
    if (isExtreme) {
      sendApprovalEmail({
        timestamp: timestamp,
        student: email,
        source: data.sourceName,
        bias: bias,
        reliability: reliability,
        evidence: data.evidence,
        url: data.url,
        xp: xp
      });
      return { success: true, message: "Analysis identified as Extreme/Complex. Sent to Editor for Bonus XP verification." };
    }
    
    return { success: true, xpEarned: xp, message: "Analysis Auto-Approved. +10 XP Awarded." };
  } catch (err) {
    return { success: false, message: err.toString() };
  }
}

function updateSubmissionStatus(row, status, xpOverride, teacherBias, teacherReliability) {
  if (getUserRole() !== ROLE_TEACHER) throw new Error("Unauthorized");
  var sheet = getDbSheet();
  sheet.getRange(row, 11).setValue(status);
  if (status === "Approved") {
    if (xpOverride) sheet.getRange(row, 10).setValue(xpOverride);
    if (teacherBias) sheet.getRange(row, 12).setValue(teacherBias);
    if (teacherReliability) sheet.getRange(row, 13).setValue(teacherReliability);
  }
  return { success: true };
}

// --- Data Fetching ---

function getRecentReports() {
  var userEmail = Session.getActiveUser().getEmail().toLowerCase();
  var role = getUserRole();
  var data = getDbSheet().getDataRange().getValues();
  var rankData = getRankData();
  
  var allRows = data.slice(1); // All data without headers
  var relevantRows;
  
  if (role === ROLE_TEACHER) {
    relevantRows = allRows; // Teacher sees everyone's submissions
  } else {
    relevantRows = allRows.filter(function(r) { return r[1].toLowerCase() === userEmail; });
  }
  
  var approved = relevantRows.filter(function(r) { return r[10] === "Approved"; });
  
  var stats = {
    total: approved.length,
    avgReliability: approved.length ? (approved.reduce(function(s, r) { return s + Number(r[12] || r[6]); }, 0) / approved.length).toFixed(1) : 0,
    totalXp: approved.reduce(function(s, r) { return s + Number(r[9]); }, 0)
  };

  if (role === ROLE_TEACHER) {
    stats.rank = { title: "EDITOR-IN-CHIEF", description: "You are managing the global editorial flow of the classroom newsroom." };
  } else {
    stats.rank = calculateRank(stats.totalXp, rankData);
  }

  // Return last 10 reports, newest first
  var reports = relevantRows.sort(function(a, b) { return new Date(b[0]) - new Date(a[0]); }).slice(0, 10).map(function(r) {
    var b = r[11] || r[5];
    var rel = r[12] || r[6];
    return { 
      timestamp: r[0], student: r[1], url: r[2], sourceName: r[3], author: r[4], 
      bias: r[5], reliability: r[6], evidence: r[7], xp: r[9], status: r[10], 
      verifiedBias: r[11], verifiedReliability: r[12], imageId: r[13],
      biasLabel: getBiasLabel(b),
      reliabilityLabel: getReliabilityLabel(rel)
    };
  });

  return { reports: reports, stats: stats };
}

function getChartData() {
  var data = getDbSheet().getDataRange().getValues();
  return data.slice(1).filter(function(r) { return r[10] === "Approved"; }).map(function(r) {
    var b = r[11] || r[5];
    var rel = r[12] || r[6];
    return { 
      sourceName: r[3], bias: Number(b), reliability: Number(rel), imageId: r[13], 
      student: r[1], author: r[4], evidence: r[7], url: r[2], timestamp: r[0],
      biasLabel: getBiasLabel(b),
      reliabilityLabel: getReliabilityLabel(rel)
    };
  });
}

function getTeacherData() {
  try {
    var sheet = getDbSheet();
    var lastRow = sheet.getLastRow();
    if (lastRow < 2) return { totalReports: 0, avgReliability: 0, totalXP: 0, students: [] };
    
    var data = sheet.getDataRange().getValues();
    var totalReports = 0;
    var totalReliability = 0;
    var studentMap = {}; 
    
    for (var i = 1; i < data.length; i++) {
      if (data[i][10] === "Approved") {
        totalReports++;
        var student = data[i][1];
        var rel = Number(data[i][12] || data[i][6]);
        var xp = Number(data[i][9]);
        totalReliability += rel;
        if (!studentMap[student]) studentMap[student] = { name: student, xp: 0, reports: 0 };
        studentMap[student].xp += xp;
        studentMap[student].reports += 1;
      }
    }
    
    var students = Object.keys(studentMap).map(function(k) { return studentMap[k]; }).sort(function(a, b) { return b.xp - a.xp; });
    
    return {
      totalReports: totalReports,
      avgReliability: totalReports > 0 ? (totalReliability / totalReports).toFixed(1) : 0,
      totalXP: students.reduce(function(sum, s) { return sum + s.xp; }, 0),
      students: students
    };
  } catch (err) {
    return { totalReports: 0, avgReliability: 0, totalXP: 0, students: [] };
  }
}

function getRosterData() {
  var roster = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Roster").getDataRange().getValues();
  var submissions = getDbSheet().getDataRange().getValues();
  var rankData = getRankData();
  
  return roster.slice(1).map(function(row) {
    var email = row[0];
    var approved = submissions.filter(function(s) { return s[1] === email && s[10] === "Approved"; });
    var xp = approved.reduce(function(s, r) { return s + Number(r[9]); }, 0);
    return { email: email, firstName: row[1], lastName: row[2], reports: approved.length, xp: xp, rankTitle: calculateRank(xp, rankData).title };
  }).sort(function(a, b) { return b.xp - a.xp; });
}

function getPendingSubmissions() {
  if (getUserRole() !== ROLE_TEACHER) return [];
  try {
    var sheet = getDbSheet();
    var data = sheet.getDataRange().getValues();
    var pending = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][10] === "Pending") {
        pending.push({
          row: i + 1,
          timestamp: data[i][0],
          student: data[i][1],
          url: data[i][2],
          sourceName: data[i][3],
          author: data[i][4],
          bias: data[i][5],
          reliability: data[i][6],
          biasLabel: getBiasLabel(data[i][5]),
          reliabilityLabel: getReliabilityLabel(data[i][6]),
          evidence: data[i][7],
          xp: data[i][9],
          imageId: data[i][13]
        });
      }
    }
    return pending.reverse();
  } catch (err) {
    console.error(err);
    return [];
  }
}

function dataIndex(row, all) {
  // Helper to find original row index for approval
  var sheet = getDbSheet();
  var values = sheet.getDataRange().getValues();
  for(var i=0; i<values.length; i++) {
    if(values[i][0].toString() === row[0].toString() && values[i][1] === row[1]) return i+1;
  }
  return -1;
}

function addStudentToRoster(email, first, last) {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Roster").appendRow([email, first, last, 0, 0]);
  return { success: true };
}

function openWebAppUrl() {
  var url = ScriptApp.getService().getUrl();
  var html = HtmlService.createHtmlOutput('<html><script>window.open("' + url + '", "_blank");google.script.host.close();</script></html>').setWidth(10).setHeight(1);
  SpreadsheetApp.getUi().showModalDialog(html, 'Opening...');
}

// --- Helper for Email Approval Workflow ---

function getLeadTeacherEmail() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Teachers");
  if (!sheet) return null;
  var data = sheet.getDataRange().getValues();
  // Return the first teacher in the list (Lead Editor)
  if (data.length > 1) return data[1][0];
  return Session.getActiveUser().getEmail(); // Fallback to current user
}

function sendApprovalEmail(data) {
  var teacherEmail = getLeadTeacherEmail();
  if (!teacherEmail) {
    console.error("No teacher email found.");
    return;
  }
  
  var subject = "ACTION REQUIRED: Extreme Bias/Reliability Reported - " + data.source;
  
  // Create a token to identify the submission
  // Using timestamp and student email as unique identifier
  var idToken = Utilities.base64Encode(JSON.stringify({t: data.timestamp.getTime(), e: data.student}));
  var serviceUrl = ScriptApp.getService().getUrl();
  var approveLink = serviceUrl + "?action=approve&token=" + encodeURIComponent(idToken);
  var denyLink = serviceUrl + "?action=deny&token=" + encodeURIComponent(idToken);
  
  var htmlBody = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 40px 0;">
      <div style="background-color: #ffffff; width: 100%; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
        
        <div style="background-color: #1e3a8a; padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">THE WEEKLY SCOUT</h1>
          <p style="color: #93c5fd; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Intelligence Alert</p>
        </div>
        
        <div style="padding: 40px;">
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
            <strong>Agent ${data.student}</strong> has submitted a report flagged as <strong>EXTREME</strong> (High Bias / Low Reliability).
            <br><br>
            Verification required for <strong>Bonus XP</strong>.
          </p>
          
          <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold; width: 100px;">Source</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${data.source}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold;">Bias (X)</td>
                <td style="padding: 8px 0; color: #1f2937; font-family: monospace;">${data.bias}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold;">Reliability (Y)</td>
                <td style="padding: 8px 0; color: #1f2937; font-family: monospace;">${data.reliability}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: bold;">Evidence</td>
                <td style="padding: 8px 0; color: #374151; font-style: italic;">"${data.evidence}"</td>
              </tr>
            </table>
            <div style="margin-top: 15px;">
              <a href="${data.url}" style="color: #2563eb; text-decoration: none; font-size: 14px; font-weight: 500;">View Original Article &rarr;</a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 40px;">
            <a href="${approveLink}" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; margin-right: 15px; box-shadow: 0 4px 6px -1px rgba(5, 150, 105, 0.3);">APPROVE & AWARD XP</a>
            <a href="${denyLink}" style="display: inline-block; background-color: #dc2626; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);">DENY</a>
          </div>
          
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">Automated Dispatch from The Weekly Scout HQ</p>
        </div>
      </div>
    </div>
  `;
  
  MailApp.sendEmail({
    to: teacherEmail,
    subject: subject,
    htmlBody: htmlBody
  });
}

function handleEmailAction(action, token) {
  var userRole = getUserRole();
  if (userRole !== ROLE_TEACHER) {
    return HtmlService.createHtmlOutput("<div style='font-family:sans-serif; text-align:center; padding:50px;'><h1 style='color:red'>Access Denied</h1><p>You must be logged in as an Editor/Teacher to approve submissions.</p><p><a href='" + ScriptApp.getService().getUrl() + "'>Log In Here</a></p></div>");
  }

  try {
    var jsonString = Utilities.newBlob(Utilities.base64Decode(token)).getDataAsString();
    var decoded = JSON.parse(jsonString);
    var timestamp = decoded.t;
    var student = decoded.e;
    
    var sheet = getDbSheet();
    var data = sheet.getDataRange().getValues();
    var rowIndex = -1;
    
    // Find row by matching timestamp and student email
    for (var i = 1; i < data.length; i++) {
      var rowDate = new Date(data[i][0]);
      if (data[i][1] === student && rowDate.getTime() === timestamp) {
        rowIndex = i + 1;
        break;
      }
    }
    
    if (rowIndex === -1) return HtmlService.createHtmlOutput("<div style='font-family:sans-serif; text-align:center; padding:50px;'><h1 style='color:orange'>Submission Not Found</h1><p>It may have been deleted or already processed.</p></div>");
    
    var currentStatus = sheet.getRange(rowIndex, 11).getValue();
    if (currentStatus !== "Pending") {
       return HtmlService.createHtmlOutput("<div style='font-family:sans-serif; text-align:center; padding:50px;'><h1 style='color:blue'>Already Processed</h1><p>This submission is currently marked as: <strong>" + currentStatus + "</strong></p></div>");
    }
    
    if (action === 'approve') {
       sheet.getRange(rowIndex, 11).setValue("Approved");
       return HtmlService.createHtmlOutput("<div style='font-family:sans-serif; text-align:center; padding:50px;'><h1 style='color:green'>Submission Approved!</h1><p>Student has been awarded full XP (including Bonus).</p><p>You can close this window.</p></div>");
    } else if (action === 'deny') {
       sheet.getRange(rowIndex, 11).setValue("Rejected");
       return HtmlService.createHtmlOutput("<div style='font-family:sans-serif; text-align:center; padding:50px;'><h1 style='color:red'>Submission Denied</h1><p>No XP awarded for this submission.</p><p>You can close this window.</p></div>");
    }
    
  } catch (err) {
    return HtmlService.createHtmlOutput("Error processing request: " + err.toString());
  }
}