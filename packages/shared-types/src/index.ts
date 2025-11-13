// Shared Zod schemas or types go here
export type Course = {
  id: string;
  title: string;
  instructor: string;
  progress?: number;
};
