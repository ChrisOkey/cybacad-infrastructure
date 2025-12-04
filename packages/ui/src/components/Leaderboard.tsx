// ❌ Removed "use client" (Server Component is better here)

export interface LeaderboardEntry {
  name: string;
  score: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-xl font-bold text-gray-900">🏆 Leaderboard</h2>
        <p className="text-sm text-gray-500">Top learners this week</p>
      </div>
      
      <ul className="divide-y divide-gray-100">
        {entries.map((entry, index) => {
          const rank = index + 1;
          
          return (
            <li
              key={index}
              className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                rank <= 3 ? "bg-yellow-50/30" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank Badge */}
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
                  ${rank === 1 ? "bg-yellow-100 text-yellow-700" : 
                    rank === 2 ? "bg-gray-200 text-gray-700" : 
                    rank === 3 ? "bg-orange-100 text-orange-800" : 
                    "text-gray-400 bg-gray-100"}
                `}>
                  #{rank}
                </div>
                
                <span className="font-medium text-gray-900">{entry.name}</span>
              </div>

              <span className="font-bold text-indigo-600">
                {entry.score.toLocaleString()} XP
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}