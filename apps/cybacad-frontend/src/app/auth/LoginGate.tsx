// src/app/auth/LoginGate.tsx
"use client";
import { useAuth } from "../providers/auth/useAuth";

export default function LoginGate() {
  const { signIn } = useAuth();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Sign in to continue</h2>
      <p>You need to be signed in to access this section of Cybacad.</p>
      <button
        onClick={() => signIn()}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Sign in
      </button>
    </div>
  );
}
