import { z } from 'zod';

export const loginZodSchema = z.object({
    email: z.string().trim().pipe(z.email("Invalid email address")),
password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginZodSchemaType = z.infer<typeof loginZodSchema>;

export const registerZodSchema = z.object({
    email: z.string().trim().pipe(z.email()),
    displayName: z.string().min(1, "Display name is required").max(50, "Display name must be less than 50 characters"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type RegisterZodSchemaType = z.infer<typeof registerZodSchema>;

export const profileZodSchema = z.object({
    displayName: z.string().min(1, "Display name is required").max(50, "Display name must be less than 50 characters"),
    photoURL: z.union([z.url("Invalid URL"), z.literal("")]).optional(),
});

export type ProfileZodSchemaType = z.infer<typeof profileZodSchema>;

export const taskZodSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    description: z.string().max(500, "Description must be less than 500 characters").optional(),
    completed: z.boolean().optional(),
});

export type TaskZodSchemaType = z.infer<typeof taskZodSchema>;

export const messageZodSchema = z.object({
    text: z.string().trim().min(1, "Message text is required").max(1000, "Message text must be less than 1000 characters"),
});

export type MessageZodSchemaType = z.infer<typeof messageZodSchema>;