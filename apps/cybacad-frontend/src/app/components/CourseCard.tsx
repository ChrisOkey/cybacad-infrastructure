// src/app/components/CourseCard.tsx
"use client";

type CourseCardProps = {
  title: string;
  description: string;
  onContinue?: () => void;
};

export default function CourseCard({ title, description, onContinue }: CourseCardProps) {
  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{title}</h2>
        <p style={{ fontSize: "0.95rem", color: "#555" }}>{description}</p>
      </div>
      <button
        onClick={onContinue}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        Continue Learning
      </button>
    </article>
  );
}
