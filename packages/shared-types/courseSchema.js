"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseInputSchema = void 0;
const zod_1 = require("zod");
exports.CourseInputSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().optional(),
    category: zod_1.z.enum([
        'AI', 'ML', 'Security', 'Python', 'Linux',
        'Data Science', 'Forensics', 'IoT', 'Robotics'
    ]),
    level: zod_1.z.enum(['Foundational', 'Intermediate', 'Certification']),
    published: zod_1.z.boolean().default(false),
});
