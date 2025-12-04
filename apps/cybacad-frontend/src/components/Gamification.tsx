// src/components/Gamification.tsx
"use client";

type GamificationProps = {
  streakDays: number;
  xpPoints: number;
  badges: string[];
};

export default function Gamification({ streakDays, xpPoints, badges }: GamificationProps) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1.5rem", background: "#fafafa" }}>
      <h2>🎮 Gamification</h2>

      {/* Streak */}
      <div style={{ marginBottom: "1rem" }}>
        <strong>🔥 Streak:</strong> {streakDays} day{streakDays !== 1 ? "s" : ""}
      </div>

      {/* XP Points */}
      <div style={{ marginBottom: "1rem" }}>
        <strong>⭐ XP Points:</strong> {xpPoints}
        <div
          style={{
            height: "10px",
            background: "#eee",
            borderRadius: "4px",
            overflow: "hidden",
            marginTop: "0.5rem"
          }}
        >
          <div
            style={{
              width: `${Math.min((xpPoints % 100) , 100)}%`,
              background: "#2196f3",
              height: "100%"
            }}
          />
        </div>
        <small>Level progress: {xpPoints % 100}/100</small>
      </div>

      {/* Badges */}
      <div>
        <strong>🏅 Badges:</strong>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem" }}>
          {badges.length > 0 ? (
            badges.map((badge, idx) => <li key={idx}>{badge}</li>)
          ) : (
            <li>No badges yet — keep going!</li>
          )}
        </ul>
      </div>
    </div>
  );
}
