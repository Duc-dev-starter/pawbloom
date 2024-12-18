"use client"
import React from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import OTPModal from './OTPModal';

type FormType = "sign-in" | "sign-out" | "sign-up"

const authFormSchema = () => {
    return z
        .object({
            email: z
                .string()
                .email({ message: "Vui lòng nhập một email hợp lệ" })
                .min(2, { message: "Email phải có ít nhất 2 ký tự" })
                .max(50, { message: "Email không được vượt quá 50 ký tự" }),
            password: z
                .string()
                .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
            confirmPassword: z.string().optional(),
            fullName: z
                .string()
                .optional()
                .refine((value) => value === undefined || value.length >= 3, {
                    message: "Tên phải có ít nhất 3 ký tự",
                }),
            phoneNumber: z.string().optional(),
            type: z.enum(["sign-in", "sign-up"]),
        })
        .refine(
            (data) =>
                data.type !== "sign-up" || (data.confirmPassword && data.confirmPassword === data.password),
            {
                message: "Mật khẩu xác nhận không khớp",
                path: ["confirmPassword"],
            }
        )
        .refine((data) => data.type !== "sign-up" || (data.fullName && data.fullName.length >= 3), {
            message: "Tên phải có ít nhất 3 ký tự",
            path: ["fullName"],
        })
        .refine((data) => data.type !== "sign-up" || data.phoneNumber, {
            message: "Số điện thoại là bắt buộc",
            path: ["phoneNumber"],
        });
}



const AuthForm = ({ type }: { type: FormType }) => {
    const formSchema = authFormSchema();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            fullName: "",
            phoneNumber: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
                <h1 className="form-title">
                    {type === "sign-in" ? "Đăng nhập" : "Đăng ký"}
                </h1>

                {/* Trường Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập email của bạn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Trường Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Trường Confirm Password (chỉ khi đăng ký) */}
                {type === "sign-up" && (
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Xác nhận mật khẩu</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Nhập lại mật khẩu"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {/* Trường Full Name (chỉ khi đăng ký) */}
                {type === "sign-up" && (
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Họ và tên</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập họ và tên" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {/* Trường Phone Number (chỉ khi đăng ký) */}
                {type === "sign-up" && (
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập số điện thoại" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <Button type="submit" className="bg-red-400 hover:opacity-85">
                    {type === "sign-in" ? "Đăng nhập" : "Đăng ký"}
                </Button>
                {true && (
                    <OTPModal email={form.getValues("email")} />
                )}
            </form>
        </Form>
    );
};


export default AuthForm;