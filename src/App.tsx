import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ResumeInput from "./pages/ResumeInput";
import Analysis from "./pages/Analysis";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resume" element={<ResumeInput />} />
      <Route path="/analysis/:id" element={<Analysis />} />
    </Routes>
  );
}
