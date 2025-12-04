// src/app/guards/RequireAuth.tsx
"use client";
import { useAuth } from "../providers/auth/useAuth";
import LoginGate from "../auth/LoginGate";

type Props = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: Props) {
  const { status, user } = useAuth();

  if (status === "loading") {
    return <p>Loading authentication...</p>;
  }

  if (status === "unauthenticated" || !user) {
    return <LoginGate />;
  }

  return <>{children}</>;
}
