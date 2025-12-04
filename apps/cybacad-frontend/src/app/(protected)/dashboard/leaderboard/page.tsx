"use client";

// ✅ 1. Import UI (Works after you rebuild the UI package below)
import { Leaderboard } from "@cybacad/ui";

// ✅ 2. Import Hook (Changed to Relative Path to fix "Cannot find module")
// Go up: leaderboard -> dashboard -> (protected) -> app -> src -> hooks
import { useLeaderboard } from "../../../../hooks/useLeaderboard";

export default function LeaderboardPage() {
  const { entries, loading } = useLeaderboard();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Leaderboard 🏆</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Weekly Ranking
        </span>
      </div>

      <div className="max-w-3xl">
        {loading ? (
          <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow-sm">
            Loading scores...
          </div>
        ) : (
          <Leaderboard entries={entries} />
        )}
      </div>
    </div>
  );
}