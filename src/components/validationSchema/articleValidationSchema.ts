import { z } from "zod";

export const articleValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(1, "Description is required"),
  readTime: z.string().min(1, "Read time is required"),
  securePassword: z.string().min(1, "Password is required"),
  category: z.string().min(1, "Category is required"), // required
  image: z.string().min(1, "Image URL is required"), // required
});
// export const articleValidationSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   author: z.string().min(1, "Author is required"),
//   description: z.string().min(1, "Description is required"),
//   readTime: z.string().min(1, "Read time is required"),
//   securePassword: z.string().min(1, "Password is required"),
//   category: z.string().min(1, "Category is required"),
//   image: z.string().min(1, "Image URL is required"),
// });
