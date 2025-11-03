import { z } from 'zod';

export const CourseInputSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  category: z.enum([
    'AI', 'ML', 'Security', 'Python', 'Linux',
    'Data Science', 'Forensics', 'IoT', 'Robotics'
  ]),
  level: z.enum(['Foundational', 'Intermediate', 'Certification']),
  published: z.boolean().default(false),
});
