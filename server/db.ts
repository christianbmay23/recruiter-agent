import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "data", "recruiter.db");

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    initDb();
  }
  return db;
}

export function initDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS resumes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL DEFAULT 'Untitled',
      resume_text TEXT NOT NULL,
      job_description TEXT,
      overall_score INTEGER,
      ats_score INTEGER,
      job_match_score INTEGER,
      impact_score INTEGER,
      formatting_score INTEGER,
      keyword_score INTEGER,
      feedback TEXT,
      rewritten_resume TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
}
