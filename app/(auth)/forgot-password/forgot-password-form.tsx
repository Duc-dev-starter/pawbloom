"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { forgotPassword } from "@/services/auth"

// Định nghĩa schema validation
const forgotPasswordSchema = z.object({
    email: z.string().min(1, { message: "Email không được để trống" }).email({ message: "Email không hợp lệ" }),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Khởi tạo form với react-hook-form và zod validation
    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(data: ForgotPasswordFormValues) {
        setIsSubmitting(true)
        setError(null)

        try {

            const response = await forgotPassword(data.email);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (!response.success) {
                toast({
                    title: "Hệ thống gặp trục trặc",
                    description: "Có lỗi xảy ra khi gửi yêu cầu.",
                })
            }

            // Hiển thị thông báo thành công
            setIsSuccess(true)
            toast({
                title: "Yêu cầu đã được gửi",
                description: "Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.",
            })
        } catch (err) {
            console.error("Error submitting forgot password request:", err)
            setError("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-4">
            {/* Hiển thị thông báo lỗi */}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Lỗi</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Hiển thị thông báo thành công */}
            {isSuccess ? (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle>Yêu cầu đã được gửi</AlertTitle>
                    <AlertDescription>
                        Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến địa chỉ{" "}
                        <span className="font-medium">{form.getValues("email")}</span>. Vui lòng kiểm tra hộp thư đến của bạn.
                    </AlertDescription>
                </Alert>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@gmail.com"
                                            type="email"
                                            autoComplete="email"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full bg-brand hover:bg-brand/90" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang gửi...
                                </>
                            ) : (
                                "Gửi yêu cầu đặt lại mật khẩu"
                            )}
                        </Button>
                    </form>
                </Form>
            )}
        </div>
    )
}
