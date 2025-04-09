import { z } from "zod";

export const BlogSchema = z.object({
  title: z
    .string()
    .min(1, "Cần điền tên bài đăng")
    .max(50, "Tên bài đăng tối đa 50 ký tự"),
  content: z
    .string()
    .min(1, "Cần điền tên nội dung")
    .max(50, "Tên nội dung tối đa 50 ký tự"),
  description: z
    .string(),
  authorName: z.string().optional(),
  categoryName: z.string().optional(),
});


export type BlogFormData = z.infer<typeof BlogSchema>

