import { z } from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(1, "Cần điền tên danh mục" )
    .max(50,"Tên danh mục tối đa 50 ký tự" ),
  description: z
    .string()
    .min(1, "Cần điền mô tả danh mục" )
    .max(100, "Mô tả sản phẩm tối đa 200 ký tự" ), 
});


export type CategoryFormData = z.infer<typeof CategorySchema>

