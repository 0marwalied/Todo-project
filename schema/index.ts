import { z } from "zod";

export const todoFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(32, "Title must be at most 32 characters."),
  body: z.string().max(80, "Body must be at most 80 characters.").optional(),
  completed: z.boolean().optional(),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;
