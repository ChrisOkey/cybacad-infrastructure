// src/app/providers/auth/mock/MockAuthAdapter.ts
import type { AuthAdapter, User } from "../types";

let current: User | null = null;
const listeners = new Set<(u: User | null) => void>();

function notify() {
  listeners.forEach((cb) => cb(current));
}

export const MockAuthAdapter: AuthAdapter = {
  onAuthStateChanged(cb) {
    listeners.add(cb);
    cb(current); // immediately emit current state
    return () => listeners.delete(cb);
  },

  async signIn() {
    current = {
      id: "mock-123",
      email: "learner@example.com",
      displayName: "Mock Learner",
      roles: ["learner"],
    };
    notify();
  },

  async signOut() {
    current = null;
    notify();
  },

  async getCurrentUser() {
    return current;
  },
};
