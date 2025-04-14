"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { resendEmail, verifyEmailUser } from "@/services/user"

export default function VerifyEmailPage() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [message, setMessage] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus("error")
                setMessage("Không tìm thấy mã xác minh trong đường dẫn URL.")
                return
            }

            try {
                const response = await verifyEmailUser(token)
                // @ts-expect-error columns may not match expected type due to dynamic typing
                if (response.success) {
                    setStatus("success")
                    setMessage("Email của bạn đã được xác minh thành công!")
                    setTimeout(() => {
                        window.location.href = '/sign-in'
                    }, 1300)
                } else {
                    setStatus("error")
                    setMessage(
                        "Liên kết xác minh của bạn đã hết hạn. Vui lòng nhập email để nhận lại liên kết mới.",
                    )
                }
            } catch (error) {
                setStatus("error")
                setMessage("Đã xảy ra lỗi khi gửi lại email xác minh. Điền vào email của bạn để xác nhận lại.")
                console.error("Lỗi xác minh:", error)
            }
        }

        verifyEmail()
    }, [token])

    const requestNewVerificationEmail = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await resendEmail(email)
            // @ts-expect-error columns may not match expected type due to dynamic typing
            if (response.success) {
                setStatus("success")
                setMessage("Email xác minh mới đã được gửi. Vui lòng kiểm tra hộp thư của bạn.")
            } else {
                setStatus("error")
                setMessage("Không thể gửi email xác minh mới. Vui lòng thử lại.")
            }
        } catch (error) {
            setStatus("error")
            setMessage("Đã xảy ra lỗi khi gửi lại email xác minh. Điền vào email của bạn để xác nhận lại.")
            console.error("Lỗi gửi lại email xác minh:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Xác minh Email</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
                    {status === "loading" && (
                        <>
                            <Loader2 className="h-16 w-16 animate-spin text-gray-400" />
                            <p className="text-center text-gray-600">Đang xác minh email của bạn...</p>
                        </>
                    )}

                    {status === "success" && (
                        <>
                            <CheckCircle className="h-16 w-16 text-green-500" />
                            <p className="text-center text-gray-700">{message}</p>
                        </>
                    )}

                    {status === "error" && (
                        <>
                            <XCircle className="h-16 w-16 text-red-500" />
                            <p className="text-center text-gray-700">{message}</p>
                        </>
                    )}

                    {(status === "error") && (
                        <>
                            <form onSubmit={requestNewVerificationEmail} className="w-full space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Địa chỉ email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                        placeholder="Nhập email của bạn"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Đang gửi...
                                        </>
                                    ) : (
                                        "Gửi lại liên kết xác minh"
                                    )}
                                </Button>
                            </form>
                        </>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={() => window.location.href = '/'} className="w-full">
                        Quay về trang chủ
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
