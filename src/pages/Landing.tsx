import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold text-indigo-600 mb-4">
        Recruiter Agent
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl text-center">
        AI-powered resume intelligence. Upload your resume, paste a job
        description, and get a grade, ATS review, match score, and tailored
        rewrite.
      </p>
      <Link
        to="/resume"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
}
