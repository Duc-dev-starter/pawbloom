import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ForgotPasswordForm from "./forgot-password-form"

export const metadata: Metadata = {
    title: "Quên mật khẩu",
    description: "Khôi phục mật khẩu tài khoản Pawbloom của bạn",
}

export default function ForgotPasswordPage() {
    return (
        <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Quên mật khẩu</h1>
                        <p className="text-sm text-muted-foreground">
                            Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.
                        </p>
                    </div>
                    <ForgotPasswordForm />
                    <Link
                        href="/sign-in"
                        className="flex items-center justify-center text-sm text-muted-foreground hover:text-brand"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Quay lại đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    )
}
