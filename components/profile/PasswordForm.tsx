"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function PasswordForm() {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const validateForm = () => {
        // Kiểm tra mật khẩu cũ không được để trống
        if (!formData.oldPassword) {
            toast({
                title: "Lỗi",
                description: "Vui lòng nhập mật khẩu cũ",
                variant: "destructive",
            })
            return false
        }

        // Kiểm tra mật khẩu mới không được để trống
        if (!formData.newPassword) {
            toast({
                title: "Lỗi",
                description: "Vui lòng nhập mật khẩu mới",
                variant: "destructive",
            })
            return false
        }

        // Kiểm tra mật khẩu mới phải có ít nhất 8 ký tự
        if (formData.newPassword.length < 8) {
            toast({
                title: "Lỗi",
                description: "Mật khẩu mới phải có ít nhất 8 ký tự",
                variant: "destructive",
            })
            return false
        }

        // Kiểm tra mật khẩu xác nhận phải khớp với mật khẩu mới
        if (formData.newPassword !== formData.confirmPassword) {
            toast({
                title: "Lỗi",
                description: "Mật khẩu xác nhận không khớp với mật khẩu mới",
                variant: "destructive",
            })
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            // Giả lập API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Reset form sau khi thành công
            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            })

            // Hiển thị thông báo thành công
            toast({
                title: "Thành công",
                description: "Mật khẩu đã được cập nhật",
            })
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Có lỗi xảy ra khi cập nhật mật khẩu",
                variant: "destructive",
            })
            console.log(error);
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-10">
                <h2 className="text-2xl font-semibold">Đổi mật khẩu</h2>
                <p className="mb-6 mt-2 text-gray-500">
                    Đảm bảo mật khẩu mới của bạn có ít nhất 8 ký tự và bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt để tăng
                    cường bảo mật.
                </p>

                <div className="flex flex-col justify-center gap-8">
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <Label htmlFor="oldPassword" className="text-slate-600">
                                Mật khẩu cũ
                            </Label>
                            <div className="relative">
                                <Input
                                    id="oldPassword"
                                    name="oldPassword"
                                    type={showOldPassword ? "text" : "password"}
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                >
                                    {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <Label htmlFor="newPassword" className="text-slate-600">
                                Mật khẩu mới
                            </Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <Label htmlFor="confirmPassword" className="text-slate-600">
                                Xác nhận mật khẩu
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="rounded-3xl bg-brand w-[12%]" disabled={isSubmitting}>
                            {isSubmitting ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

