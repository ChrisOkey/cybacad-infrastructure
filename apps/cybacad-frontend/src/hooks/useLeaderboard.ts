"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
// ✅ This import works now!
import { db } from "../lib/firebase";

export type LeaderboardEntry = {
  name: string;
  score: number; // Renamed from 'xp' to match UI component
};

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        // 1. Try to fetch from Firestore
        const snapshot = await getDocs(collection(db, "leaderboard"));
        
        if (!snapshot.empty) {
          const data = snapshot.docs.map(doc => ({ 
            name: doc.data().name, 
            score: doc.data().xp || doc.data().score 
          })) as LeaderboardEntry[];
          setEntries(data);
        } else {
          // 2. Fallback: Use Mock Data if DB is empty
          console.log("⚠️ Leaderboard collection empty. Using mock data.");
          setEntries([
            { name: "Alice Cyber", score: 15420 },
            { name: "Bob Hacker", score: 12350 },
            { name: "Charlie Net", score: 11200 },
            { name: "Dave Dev", score: 8500 },
            { name: "Eve Exploit", score: 4200 },
          ]);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return { entries, loading };
}