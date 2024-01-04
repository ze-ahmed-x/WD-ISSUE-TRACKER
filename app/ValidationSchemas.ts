import { z } from "zod";

export const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255), // as second argument we can pass a custom error message
    description: z.string().min(1, "Description is required")
});
