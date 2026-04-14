# Recruiter Agent

AI-powered resume intelligence platform built with React + TypeScript + Vite (frontend) and Node/Express + SQLite (backend).

## Cursor Cloud specific instructions

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Frontend (Vite) | `npm run dev` | 5173 | Proxies `/api/*` to backend at port 3001 |
| Backend (Express) | `npm run server` | 3001 | Uses `tsx` for TypeScript execution; SQLite DB auto-created at `data/recruiter.db` |

Both services must run for the full-stack app to work. Start the backend **before** the frontend so the API proxy works immediately.

### Common commands

See `package.json` `scripts` for the full list. Key commands:

- **Lint:** `npm run lint`
- **Type-check:** `npm run typecheck`
- **Build:** `npm run build`

### Caveats

- The SQLite database file is created automatically on first backend startup at `data/recruiter.db`. This directory is gitignored.
- The analyzer service (`server/services/analyzer.ts`) uses a mock/heuristic scoring engine. It is designed to be replaced with real LLM API calls.
- Vite's proxy config (`vite.config.ts`) forwards `/api` requests to the backend. If the backend port changes, update both `vite.config.ts` and the backend startup.
