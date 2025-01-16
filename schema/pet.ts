import { z } from "zod";

export const PetSchema = z.object({
  name: z
    .string()
    .min(1, "Cần điền tên thứ cưng" )
    .max(50, "Tên thú cưng tối đa 50 ký tự" ),
  age: z
    .number()
    .min(1, "Tuổi thú cưng phải từ 1 tháng trở lên")
    .max(50, "Tuổi tối đa của thú cưng là 50 tuổi"),
  description: z
    .string()
    .min(1, "Cần điền mô tả thú cưng" )
    .max(200, "Mô tả thú cưng tối đa 200 ký tự" ), 
  price: z
    .number()
    .min(1000, "Giá phải lớn hơn 1000" )
    .nonnegative("Gía không được bé hơn 1000"),
});


export type PetFormData = z.infer<typeof PetSchema>

