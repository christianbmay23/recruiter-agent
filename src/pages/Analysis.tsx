import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface AnalysisResult {
  id: number;
  name: string;
  resume_text: string;
  job_description: string | null;
  overall_score: number;
  ats_score: number;
  job_match_score: number;
  impact_score: number;
  formatting_score: number;
  keyword_score: number;
  feedback: string;
  rewritten_resume: string | null;
  created_at: string;
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const color =
    score >= 80
      ? "bg-green-500"
      : score >= 60
        ? "bg-yellow-500"
        : "bg-red-500";
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="font-medium">{score}/100</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full transition-all`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default function Analysis() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/resumes/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(setData)
      .catch(() => setError("Resume not found."));
  }, [id]);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <p className="text-red-600">{error}</p>
        <Link to="/dashboard" className="text-indigo-600 underline mt-4 block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <Link
          to="/dashboard"
          className="text-indigo-600 hover:underline text-sm"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Overall Score:{" "}
          <span className="text-indigo-600">{data.overall_score}/100</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <ScoreBar label="ATS Compatibility" score={data.ats_score} />
          <ScoreBar label="Job Match" score={data.job_match_score} />
          <ScoreBar label="Impact" score={data.impact_score} />
          <ScoreBar label="Formatting" score={data.formatting_score} />
          <ScoreBar label="Keywords" score={data.keyword_score} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">Feedback</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{data.feedback}</p>
      </div>

      {data.rewritten_resume && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-3">Tailored Resume</h2>
          <pre className="text-sm bg-gray-50 p-4 rounded whitespace-pre-wrap">
            {data.rewritten_resume}
          </pre>
        </div>
      )}
    </div>
  );
}
