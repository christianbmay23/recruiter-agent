interface AnalysisResult {
  overall_score: number;
  ats_score: number;
  job_match_score: number;
  impact_score: number;
  formatting_score: number;
  keyword_score: number;
  feedback: string;
  rewritten_resume: string | null;
}

export function analyzeResume(
  resumeText: string,
  jobDescription?: string
): AnalysisResult {
  const wordCount = resumeText.split(/\s+/).filter(Boolean).length;
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(resumeText);
  const hasPhone = /[\d()+-]{7,}/.test(resumeText);
  const hasSections =
    /experience|education|skills|summary|objective/i.test(resumeText);
  const hasBullets = /[•\-*]\s/.test(resumeText);

  let atsScore = 50;
  if (hasEmail) atsScore += 10;
  if (hasPhone) atsScore += 10;
  if (hasSections) atsScore += 15;
  if (hasBullets) atsScore += 10;
  if (wordCount > 100) atsScore += 5;
  atsScore = Math.min(atsScore, 100);

  let jobMatchScore = 40;
  if (jobDescription) {
    const jdWords = new Set(
      jobDescription.toLowerCase().match(/\b\w{4,}\b/g) || []
    );
    const resumeWords = new Set(
      resumeText.toLowerCase().match(/\b\w{4,}\b/g) || []
    );
    let overlap = 0;
    for (const w of jdWords) {
      if (resumeWords.has(w)) overlap++;
    }
    const ratio = jdWords.size > 0 ? overlap / jdWords.size : 0;
    jobMatchScore = Math.round(40 + ratio * 60);
  }

  const impactScore = Math.min(
    100,
    50 + (hasBullets ? 15 : 0) + (/\d+%?/.test(resumeText) ? 20 : 0) + (wordCount > 200 ? 15 : 0)
  );

  const formattingScore = Math.min(
    100,
    50 +
      (hasSections ? 20 : 0) +
      (hasBullets ? 15 : 0) +
      (wordCount >= 100 && wordCount <= 800 ? 15 : 0)
  );

  const keywordScore = jobMatchScore;

  const overallScore = Math.round(
    atsScore * 0.25 +
      jobMatchScore * 0.25 +
      impactScore * 0.2 +
      formattingScore * 0.15 +
      keywordScore * 0.15
  );

  const feedbackParts: string[] = [];
  if (!hasEmail) feedbackParts.push("Add a professional email address.");
  if (!hasPhone) feedbackParts.push("Include a phone number for contact.");
  if (!hasSections)
    feedbackParts.push(
      "Add clear section headers (Experience, Education, Skills)."
    );
  if (!hasBullets)
    feedbackParts.push("Use bullet points to list achievements and duties.");
  if (wordCount < 100)
    feedbackParts.push("Resume is too short — add more detail.");
  if (wordCount > 800)
    feedbackParts.push("Resume may be too long — aim for conciseness.");
  if (!/\d+%?/.test(resumeText))
    feedbackParts.push(
      "Include quantified achievements (numbers, percentages)."
    );
  if (feedbackParts.length === 0)
    feedbackParts.push("Resume looks well-structured. Great job!");

  return {
    overall_score: overallScore,
    ats_score: atsScore,
    job_match_score: jobMatchScore,
    impact_score: impactScore,
    formatting_score: formattingScore,
    keyword_score: keywordScore,
    feedback: feedbackParts.join("\n"),
    rewritten_resume: null,
  };
}
