"use client"
import React, { useState } from 'react'
import { jwtDecode } from "jwt-decode";
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
import { useToast } from '@/hooks/use-toast';
import { authFormSchema } from '@/schema/auth';
import { registerUserAction } from '@/actions/register';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Path from '@/constants/paths';
import { useRouter } from 'next/navigation';
import { login } from '@/services/auth';
import { JwtPayload } from '@/types/auth';

type FormType = "sign-in" | "sign-up"

interface AuthFormProps extends React.ComponentPropsWithoutRef<"form"> {
    type: FormType;
}



const AuthForm: React.FC<AuthFormProps> = ({ type, className, ...props }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: "",
            fullName: "",
            phoneNumber: "",
        },
    });
    const { toast } = useToast();


    const onSubmit = async (values: z.infer<typeof authFormSchema>) => {
        console.log(values);
        setLoading(true);
        try {
            if (type === "sign-up") {
                const formData = new FormData();
                (Object.keys(values) as Array<keyof typeof values>).forEach((key) => {
                    const value = values[key];
                    formData.append(key, value !== undefined && value !== null ? value.toString() : '');
                });
                console.log([...formData.entries()]);
                console.log(formData);

                // Gửi mảng entries thay vì FormData
                const result = await registerUserAction([...formData.entries()]);
                console.log(result);
                if (result.success) {
                    router.push('')
                } else {
                    throw new Error(result?.error || 'Có lỗi xảy ra')
                }
            } else {
                const response = await login(values);
                console.log(response);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                if (response.success) {
                    const token = response.data.token;
                    const decodedToken: JwtPayload = jwtDecode(token);
                    switch (decodedToken.role) {
                        case "user":
                            router.push(Path.HOME);
                            break;
                        case "admin":
                            router.push(Path.ADMIN_DASHBOARD);
                            break;
                        default:
                            router.push(Path.HOME);
                            break;
                    }
                } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    throw new Error(response?.error || 'Có lỗi xảy ra')
                }
            }
        } catch (error) {
            console.log(error);
            if (type === 'sign-up') {
                toast({
                    title: "Đăng ký thất bại",
                    description: error instanceof Error ? error.message : 'Có lỗi xảy ra',
                    variant: "destructive"
                });
            }
        } finally {
            setLoading(false);
        }
    };





    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">{type === 'sign-up' ? 'Đăng kí tài khoản' : 'Đăng nhập tài khoản'}</h1>
                        <p className="text-balance text-sm text-muted-foreground">
                            {type === 'sign-up' ? "Điền đầy đủ thông tin để tạo tài khoản mới" : ' Nhập email để đăng nhập vào tài khoản của bạn'}
                        </p>
                    </div>


                    {/* Trường Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        disabled={loading}
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
                        disabled={loading}
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex items-center'>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    {type === 'sign-in' && <Link
                                        href={Path.FORGOT_PASSWORD}
                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                    >
                                        Quên mật khẩu   ?
                                    </Link>}
                                </div>
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

                    {/* Trường Full Name (chỉ khi đăng ký) */}
                    {type === "sign-up" && (
                        <FormField
                            control={form.control}
                            name="fullName"
                            disabled={loading}
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
                            disabled={loading}
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

                    <Button disabled={loading} type="submit" className="bg-red-400 hover:opacity-85">
                        {type === "sign-in" ? "Đăng nhập" : "Đăng ký"}
                    </Button>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                            Hoặc tiếp tục với
                        </span>
                    </div>
                    <Button variant="outline" className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        Đăng nhập với Google
                    </Button>
                </form>
            </Form>

            {type === 'sign-up' ? <div className="text-center text-sm mt-4">
                Đã có tài khoản?{" "}
                <Link href={Path.LOGIN} className="underline underline-offset-4">
                    Đăng nhập
                </Link>
            </div> :
                <div className="text-center text-sm mt-4">
                    Chưa có tài khoản?{" "}
                    <Link href={Path.REGISTER} className="underline underline-offset-4">
                        Đăng kí
                    </Link>
                </div>
            }
            {true && (
                <OTPModal email={form.getValues("email")} />
            )}
        </>
    );
};


export default AuthForm;