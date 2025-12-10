import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export function useAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAdmin() {
      if (!user) {
        setLoading(false);
        return;
      }

      // Quick Hardcode Check (Safest for MVP)
      // Replace this email with your actual login email!
      const ADMIN_EMAILS = ["your-email@gmail.com"]; 
      
      if (ADMIN_EMAILS.includes(user.email || "")) {
        setIsAdmin(true);
      } else {
        // Double check database role (Optional but professional)
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists() && snap.data().role === "admin") {
          setIsAdmin(true);
        }
      }
      setLoading(false);
    }

    checkAdmin();
  }, [user]);

  // Function to guard pages
  const protectRoute = () => {
    if (!loading && !isAdmin) {
      router.push("/dashboard"); // Kick them out
    }
  };

  return { isAdmin, loading, protectRoute };
}