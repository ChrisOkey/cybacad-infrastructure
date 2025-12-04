// src/app/providers/auth/types.ts

export type Role = "admin" | "coach" | "learner";

export type User = {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  roles: Role[];
};

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export type AuthState = {
  user: User | null;
  status: AuthStatus;
};

export interface AuthAdapter {
  onAuthStateChanged: (cb: (user: User | null) => void) => () => void;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
}
