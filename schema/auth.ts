import { z } from "zod";

export const authFormSchema = z.object({
    email: z
        .string()
        .email({ message: "Vui lòng nhập một email hợp lệ" })
        .min(2, { message: "Email phải có ít nhất 2 ký tự" })
        .max(50, { message: "Email không được vượt quá 50 ký tự" }),
    password: z
        .string()
        .min(3, { message: "Mật khẩu phải có ít nhất 3 ký tự" }),
    fullName: z
        .string()
        .optional()
        .refine((value) => !value || value.length >= 3, {
            message: "Tên phải có ít nhất 3 ký tự",
        }),
    phoneNumber: z
        .string()
        .optional()
        .refine((value) => !value || value.length >= 3, {
            message: "Phải nhập đúng số điện thoại",
        }),
});
