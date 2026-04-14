# Recruiter Agent

AI-powered resume intelligence platform.

## Product Goal
Recruiter Agent helps users upload or paste a resume, paste a job description, receive a resume grade, ATS compatibility review, job-match score, tailored rewrite, version comparison, and export-ready output.

## Features
- Resume grading across ATS safety, job match, impact, formatting, and keyword coverage
- Job description matching
- Truth-preserving resume rewrite architecture
- Version tracking and side-by-side comparison
- Export-ready document flow
- Modular AI service layer ready for OpenAI, Gemini, Claude, or other LLMs

## Stack
- React + TypeScript + Vite
- Tailwind CSS
- Node + Express
- SQLite via better-sqlite3

## Suggested Local Setup

```bash
npm install
npm run dev
```

In a fuller implementation, run the API server separately:

```bash
npm run server
```

## Current Status
This repo is an agent-ready scaffold. The AI logic is intentionally modular and can be replaced with real LLM calls.

## Next Agent Tasks
1. Complete the Vite/Tailwind project config.
2. Add real auth.
3. Wire the API and frontend with environment-based URLs.
4. Add PDF and DOCX export.
5. Replace mock analysis/tailoring with real AI service calls.
6. Add tests and deployment configuration.

## Trust Rules
- Never fabricate experience, titles, dates, or achievements.
- Use placeholders for unconfirmed metrics.
- Keep generated resumes ATS-safe by default.
