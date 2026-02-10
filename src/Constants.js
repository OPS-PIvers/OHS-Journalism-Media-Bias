// Constants.js
var SHEET_NAME = "Scout_Submissions";
var APP_TITLE = "The Weekly Scout";
var IMAGES_FOLDER_NAME = "Weekly_Scout_Images";

// Roles
var ROLE_TEACHER = 'teacher';
var ROLE_STUDENT = 'student';

// XP System - Scaled for 125-point Ranking System
var XP_BASE = 10;
var XP_BONUS_EXTREME = 10;
var XP_BONUS_ACCURACY = 2; // Awarded by teacher during approval
var XP_BONUS_DETAIL = 2;   // Awarded for evidence over 100 words

// Default Rankings (Used only for first-time initialization)
var DEFAULT_RANKS = [
  [0, "Cub Reporter", "Congratulations! Your journey has begun! As a Cub Reporter, you’re learning the ropes, and your first story is just starting to take root."],
  [20, "Stringer", "Congratulations! You've earned the title of Stringer. Your ability to find stories in unexpected places and provide quick updates is making an impact."],
  [30, "Staff Writer", "Congratulations! You have achieved the title of Staff Writer. Like a reliable member of the newsroom, you are showing your presence and building your influence."],
  [35, "Beat Reporter", "Congratulations! You are now a Beat Reporter. Your deep connection to your specific \"patch\" and your ability to grow sources are becoming apparent."],
  [38, "Photojournalist", "Congratulations! You've earned the title of Photojournalist. Your \"eye\" for the story and your spirited approach to capturing the truth are now recognized."],
  [40, "Fact-Checker", "Congratulations! You’re now a Fact-Checker. You are showing your power to stop misinformation in its tracks and keep the record straight."],
  [42, "The Source", "You have achieved the ultimate answer of 42 points. You are \"The Source.\" You hold the secrets everyone wants—just be sure to protect your anonymity."],
  [45, "Investigative Journalist", "Congratulations! You are now an Investigative Journalist. Your persistence and dominance in uncovering the truth are becoming undeniable."],
  [48, "Copy Editor", "Congratulations! You are a Copy Editor. Like a formidable guardian of grammar, you're a force to be reckoned with in the labyrinth of style guides."],
  [50, "Editorial Writer", "Congratulations! You've earned the title of Editorial Writer. Your intelligence and ability to persuade your readers are now your greatest weapons."],
  [52, "War Correspondent", "Congratulations! You are now a War Correspondent. Your ability to remain resilient and bounce back from the toughest assignments is unmatched."],
  [55, "Bureau Chief", "Congratulations! You have achieved the title of Bureau Chief. A powerful leader of your region, you are poised to manage the strongest stories."],
  [58, "Foreign Correspondent", "Congratulations! You are now a Foreign Correspondent. Your prowess in navigating complex global landscapes is a sight to behold."],
  [60, "Columnist", "Congratulations! You have earned the title of Columnist. Your unique voice and diverse insights are blending together into a brand that is truly your own."],
  [62, "News Anchor", "Congratulations! You’ve reached 62 points and are now a News Anchor. Your influence is growing, and your voice can be heard across the entire landscape."],
  [65, "Managing Editor", "Congratulations! You have reached a new level of power as Managing Editor. You are an awe-inspiring force in the newsroom whose authority is known by all."],
  [68, "Executive Producer", "Congratulations! You have earned the title of Executive Producer. Your control over the narrative and your ability to shape reality for the audience are truly powerful."],
  [70, "Ombudsman", "Congratulations! You are now the Ombudsman. Your mastery of ethics and your ability to guide the industry through the \"unknown\" of moral dilemmas is unmatched."],
  [75, "Editor-in-Chief", "Congratulations! You have earned the title of Editor-in-Chief. Like the ruler of the paper, you hold absolute power over what makes the front page."],
  [80, "Media Mogul", "Congratulations! You are now a Media Mogul. Your wisdom, command, and ability to see the \"big picture\" make you a true leader in the industry."],
  [85, "Muckraker", "Congratulations! You are a Muckraker. You are a supreme force of transformation, exposing corruption and changing the world with your every move."],
  [90, "Pulitzer Winner", "Congratulations! You have achieved the divine title of Pulitzer Winner. Your influence is a source of ultimate power, illuminating the truth for all."],
  [95, "The Fourth Estate", "Congratulations! You've earned the title of The Fourth Estate. You command the \"watchdog\" of democracy, and your power over society is undeniable."],
  [100, "The Truth", "Congratulations! You've reached the pinnacle. You are \"The Truth.\" You are the primordial force of journalism—the beginning and the end of every story."],
  [125, "Legacy", "Congratulations! You've reached the secret ranking of Legacy. Even after the ink dries and the broadcast ends, your work continues to change the world."]
];