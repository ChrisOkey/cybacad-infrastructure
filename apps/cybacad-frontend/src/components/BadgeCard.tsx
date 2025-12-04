// src/components/BadgeCard.tsx
"use client";

type BadgeCardProps = {
  name: string;
  description?: string;
  icon?: string; // optional emoji or icon string
};

export default function BadgeCard({ name, description, icon }: BadgeCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem"
      }}
    >
      {/* Icon */}
      <div style={{ fontSize: "1.5rem" }}>
        {icon ?? "🏅"}
      </div>

      {/* Badge info */}
      <div>
        <h4 style={{ margin: 0 }}>{name}</h4>
        {description && (
          <p style={{ margin: 0, color: "#555", fontSize: "0.9rem" }}>{description}</p>
        )}
      </div>
    </div>
  );
}
