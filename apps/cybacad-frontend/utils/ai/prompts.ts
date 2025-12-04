export const getGeminiPrompt = ({
  lessonTitle,
  userCode,
  userError,
}: {
  lessonTitle: string;
  userCode: string;
  userError?: string;
}): string => {
  const baseIntro = `You're an AI coach helping a learner debug Python code in a cybersecurity lab.`;

  const lessonMap: Record<string, string> = {
    "XSS": `The goal is to prevent Cross-Site Scripting (XSS) by sanitizing user input before rendering HTML.`,
    "SQLi": `The goal is to prevent SQL Injection by using parameterized queries and avoiding string concatenation.`,
    "ML Hardening": `The goal is to secure a machine learning model against adversarial inputs and data poisoning.`,
    "General": `The goal is to help the learner understand and improve their code.`,
  };

  const lessonType = lessonTitle.includes("XSS")
    ? "XSS"
    : lessonTitle.includes("SQL")
    ? "SQLi"
    : lessonTitle.includes("ML")
    ? "ML Hardening"
    : "General";

  const context = lessonMap[lessonType];

  return `${baseIntro}\n\nLesson: ${lessonTitle}\n\n${context}\n\nLearner Code:\n${userCode}\n\n${
    userError ? `Error Message:\n${userError}\n\n` : ""
  }Give a helpful hint to improve or fix the code.`;
};
