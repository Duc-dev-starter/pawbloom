import { z } from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(1, "Cần điền tên sản phẩm" )
    .max(50, "Tên sản phẩm tối đa 50 ký tự" ),
  supplier: z
    .string()
    .min(1, "Cần điền tên nhà cung cấp" )
    .max(50,"Tên nhà cung cấp tối đa 50 ký tự" ),
  description: z
    .string()
    .min(1, "Cần điền mô tả sản phẩm" )
    .max(200, "Mô tả sản phẩm tối đa 200 ký tự" ), 
  quantity: z
    .number()
    .min(1, "Số lượng phải lớn hơn hoặc bằng 1" )
    .nonnegative("Số lượng không được bé hơn 1"),
  price: z
    .number()
    .min(1000, "Giá phải lớn hơn 1000" )
    .nonnegative("Gía không được bé hơn 1000"),
});


export type ProductFormData = z.infer<typeof ProductSchema>

