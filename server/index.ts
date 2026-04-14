import express from "express";
import cors from "cors";
import { initDb } from "./db.js";
import { resumeRouter } from "./routes/resumes.js";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

initDb();

app.use("/api/resumes", resumeRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
