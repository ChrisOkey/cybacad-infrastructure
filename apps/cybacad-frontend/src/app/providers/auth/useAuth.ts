// src/app/providers/auth/useAuth.ts
"use client";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("AuthProvider is missing. Wrap your app with <AuthProvider>.");
  }
  return ctx;
}
