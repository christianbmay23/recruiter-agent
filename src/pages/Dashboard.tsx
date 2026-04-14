import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ResumeVersion {
  id: number;
  name: string;
  overall_score: number | null;
  created_at: string;
}

export default function Dashboard() {
  const [versions, setVersions] = useState<ResumeVersion[]>([]);

  useEffect(() => {
    fetch("/api/resumes")
      .then((r) => r.json())
      .then(setVersions)
      .catch(() => setVersions([]));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link
          to="/resume"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          New Resume
        </Link>
      </div>
      {versions.length === 0 ? (
        <p className="text-gray-500">
          No resumes yet.{" "}
          <Link to="/resume" className="text-indigo-600 underline">
            Upload one
          </Link>{" "}
          to get started.
        </p>
      ) : (
        <div className="grid gap-4">
          {versions.map((v) => (
            <Link
              key={v.id}
              to={`/analysis/${v.id}`}
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{v.name}</span>
                <span className="text-sm text-gray-500">
                  {new Date(v.created_at).toLocaleDateString()}
                </span>
              </div>
              {v.overall_score !== null && (
                <div className="mt-2 text-indigo-600 font-semibold">
                  Score: {v.overall_score}/100
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
