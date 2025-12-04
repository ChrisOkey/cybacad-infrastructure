"use client";
import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthAdapter, AuthState, User } from "./types";

type Props = { adapter: AuthAdapter; children: React.ReactNode };

export default function AuthProvider({ adapter, children }: Props) {
  const [state, setState] = useState<AuthState>({
    user: null,
    status: "loading",
  });

  useEffect(() => {
    const unsubscribe = adapter.onAuthStateChanged((user: User | null) => {
      setState({
        user,
        status: user ? "authenticated" : "unauthenticated",
      });
    });

    adapter.getCurrentUser().then((user) => {
      setState({
        user,
        status: user ? "authenticated" : "unauthenticated",
      });
    });

    return unsubscribe;
  }, [adapter]);

  const value = useMemo(
    () => ({
      ...state,
      signIn: () => adapter.signIn(),
      signOut: () => adapter.signOut(),
      adapter,
    }),
    [state, adapter]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
