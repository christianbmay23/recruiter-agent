import { Router } from "express";
import { getDb } from "../db.js";
import { analyzeResume } from "../services/analyzer.js";

export const resumeRouter = Router();

resumeRouter.get("/", (_req, res) => {
  const db = getDb();
  const rows = db
    .prepare(
      "SELECT id, name, overall_score, created_at FROM resumes ORDER BY created_at DESC"
    )
    .all();
  res.json(rows);
});

resumeRouter.get("/:id", (req, res) => {
  const db = getDb();
  const row = db.prepare("SELECT * FROM resumes WHERE id = ?").get(req.params.id);
  if (!row) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(row);
});

resumeRouter.post("/", (req, res) => {
  const { name, resume_text, job_description } = req.body;
  if (!resume_text) {
    res.status(400).json({ error: "resume_text is required" });
    return;
  }

  const analysis = analyzeResume(resume_text, job_description);

  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO resumes (name, resume_text, job_description, overall_score, ats_score, job_match_score, impact_score, formatting_score, keyword_score, feedback, rewritten_resume)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    name || "Untitled",
    resume_text,
    job_description || null,
    analysis.overall_score,
    analysis.ats_score,
    analysis.job_match_score,
    analysis.impact_score,
    analysis.formatting_score,
    analysis.keyword_score,
    analysis.feedback,
    analysis.rewritten_resume
  );

  res.status(201).json({ id: result.lastInsertRowid });
});
