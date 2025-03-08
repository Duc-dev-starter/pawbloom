"use client"
import React, { useEffect, useState } from 'react'
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
// import OTPModal from './OTPModal';
import { useToast } from '@/hooks/use-toast';
import { authFormSchema } from '@/schema/auth';
import { registerUserAction } from '@/actions/register';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Path from '@/constants/paths';
import { useRouter } from 'next/navigation';
import { login } from '@/services/auth';
import { JwtPayload } from '@/types/auth';
import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "@/lib/firebase";
import axios from 'axios';


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

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    const handleLoginWithSpecialMethod = async (providerType: "facebook" | "google") => {
        if (!isClient) return;

        try {
            let provider;
            switch (providerType) {
                case "facebook":
                    provider = facebookProvider;
                    break;
                case "google":
                    provider = googleProvider;
                    break;
                default:
                    throw new Error("Unsupported provider");
            }

            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            console.log(`${providerType} ID Token:`, idToken);

            const response = await axios.post("https://your-backend.com/api/auth", {
                provider: providerType,
                idToken,
            });

            console.log("Backend response:", response.data);

            // Xóa lỗi validation nếu có
            form.clearErrors();
        } catch (error) {
            console.error(`${providerType} login error:`, error);
        }
    };



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
                                        Quên mật khẩu?
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
                    <div className="grid grid-cols-3 gap-4">
                        <Button type='button' variant="outline" className="w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                    fill="currentColor"
                                />
                            </svg>
                            <span className="sr-only">Login with Apple</span>
                        </Button>
                        <Button type='button' onClick={() => handleLoginWithSpecialMethod("google")} variant="outline" className="w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill='#4285F4'>
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            <span className="sr-only">Login with Google</span>
                        </Button>
                        <Button type='button' onClick={() => handleLoginWithSpecialMethod("facebook")} variant="outline" className="w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495V14.708h-3.13v-3.622h3.13V8.412c0-3.1 1.893-4.79 4.66-4.79 1.324 0 2.464.099 2.794.143v3.24h-1.917c-1.503 0-1.793.715-1.793 1.763v2.31h3.586l-.467 3.622h-3.119V24h6.116C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
                            </svg>

                            <span className="sr-only">Login with Facebook</span>
                        </Button>
                    </div>
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
            {/* {true && (
                <OTPModal email={form.getValues("email")} />
            )} */}
        </>
    );
};


export default AuthForm;