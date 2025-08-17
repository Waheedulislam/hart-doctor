import { z } from "zod";

// Zod schema for ICourses
export const courseValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  duration: z.string().min(1, "Duration is required"),
  price: z.number().min(0, "Price must be at least 0"),
  image: z.string().min(1, "Image URL is required"),
  description: z.string().min(1, "Description is required"),
  learnDescription: z.string().min(1, "Detail Description is required"),
  securePassword: z.string().min(1, "Password is required"),
});
