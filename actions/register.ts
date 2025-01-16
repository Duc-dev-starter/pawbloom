/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import aj from "@/lib/arcjet";
import { authFormSchema } from "@/schema/auth";
import { register } from "@/services/auth";
import { request } from "@arcjet/next";

export async function registerUserAction(entries: any) {
    // Tạo lại FormData từ mảng entries
    const formData = new FormData();
    entries.forEach(([key, value]: [string, string]) => {
        formData.append(key, value);
    });

    console.log([...formData.entries()]); 
    const validatedField = authFormSchema.safeParse({
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        password: formData.get('password'),
        phoneNumber: formData.get('phoneNumber'),
    });

    console.log(validatedField);
    console.log(formData);
    
    if (!validatedField.success) {
        return {
            error: validatedField.error.errors[0].message,
            status: 400,
        };
    }

    const { fullName, password, email, phoneNumber } = validatedField.data;
    try {
        const req = await request();
        const decision = await aj.protect(req, { email });
        console.log(decision);
        if(decision.isDenied()){
            if(decision.reason.isEmail()){
                const emailTypes = decision.reason.emailTypes;
                if(emailTypes.includes('DISPOSABLE')){
                    return {
                        error: 'Không được phép sử dụng địa chỉ email dùng một lần.',
                        status: 403,
                    };
                }
                else if(emailTypes.includes('INVALID')){
                    return {
                        error: 'Địa chỉ email không hợp lệ.',
                        status: 403,
                    };
                }
                else if(emailTypes.includes('NO_MX_RECORDS')){
                    return {
                        error: 'Tên miền email không có bản ghi MX hợp lệ.',
                        status: 403,
                    }; 
                }
                else {
                    return {
                        error: 'Địa chỉ email không được chấp nhận! Vui lòng thử lại.',
                        status: 403,
                    }; 
                }
            } 
            else if(decision.reason.isBot()){
                return {
                    error: 'Phát hiện hoạt động của bot',
                    status: 403,
                }
            }
            else if(decision.reason.isRateLimit()){
                return {
                    error: 'Quá nhiều yêu cầu! Vui lòng thử lại sau.',
                    status: 403,
                }
            }
        }
        const result = await register({
            email,
            password,
            fullName,
            phoneNumber,
        });

          if (result) {
            return {
              success: "Đăng kí người dùng thành công",
              status: 201,
            };
          } else {
            return {
              error: "Hệ thống đang gặp sự cố",
              status: 500,
            };
          }
    } catch (error) {
        console.error(error);
        return {
            error: 'Hệ thống đang gặp sự cố',
            status: 500,
        };
    }
}
