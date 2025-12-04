"use client";
import { createContext } from "react";
import type { AuthState, AuthAdapter } from "./types";

export type AuthContextValue = AuthState & {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  adapter: AuthAdapter;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
