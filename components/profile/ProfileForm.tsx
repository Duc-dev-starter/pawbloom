"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

interface User {
    fullName: string
    email: string
    phoneNumber: string | null
    role: string
    profilePictureUrl: string | null
    address: string | null
    bio: string | null
    isActive: boolean
    emailVerified: boolean
    createdAt: string
    updatedAt: string
    lastLoginAt: string | null
}

interface ProfileFormProps {
    userData: User
    createdAtDate: string
    updatedAtDate: string
}

export default function ProfileForm({ userData, createdAtDate, updatedAtDate }: ProfileFormProps) {
    const [formData, setFormData] = useState({
        fullName: userData.fullName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        address: userData.address || "",
        bio: userData.bio || "",
        dob: "", // Ngày sinh không có trong dữ liệu mẫu
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [profileImage, setProfileImage] = useState<string | null>(userData.profilePictureUrl)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Kiểm tra kích thước file (5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    title: "Lỗi",
                    description: "Kích thước file không được vượt quá 5MB",
                    variant: "destructive",
                })
                return
            }

            // Kiểm tra loại file
            if (!file.type.includes("image/")) {
                toast({
                    title: "Lỗi",
                    description: "Chỉ chấp nhận file hình ảnh",
                    variant: "destructive",
                })
                return
            }

            // Tạo URL cho hình ảnh
            const imageUrl = URL.createObjectURL(file)
            setProfileImage(imageUrl)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Giả lập API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Hiển thị thông báo thành công
            toast({
                title: "Thành công",
                description: "Thông tin tài khoản đã được cập nhật",
            })
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Có lỗi xảy ra khi cập nhật thông tin",
                variant: "destructive",
            })
            console.log(error);
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Avatar */}
            <div className="flex items-center justify-between">
                <div className="mt-3 flex gap-3">
                    <div className="relative h-[150px] w-[150px]">
                        <Image
                            src={profileImage || "/placeholder.svg?height=150&width=150"}
                            alt={userData.fullName}
                            width={150}
                            height={150}
                            className="rounded-full object-cover"
                        />
                        <label
                            htmlFor="profile-image"
                            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/30 opacity-0 transition-opacity hover:opacity-100"
                        >
                            <span className="text-sm font-medium text-white">Thay đổi</span>
                        </label>
                        <input type="file" id="profile-image" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </div>
                    <div className="flex flex-col justify-center gap-4">
                        <h3 className="text-2xl font-semibold">{userData.fullName}</h3>
                        <p className="text-sm text-gray-400">PNG, JPG lên tới 5MB</p>
                        <label htmlFor="profile-image" className="cursor-pointer text-xl text-brand">
                            Cập nhật
                        </label>
                    </div>
                </div>
                <div className="ml-10">
                    <p>Ngày tạo tài khoản: {createdAtDate}</p>
                    <p>Ngày cập nhật tài khoản: {updatedAtDate}</p>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-semibold">Chi tiết</h2>
                <div className="flex flex-col justify-center gap-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <Label htmlFor="fullName" className="text-slate-600">
                                Tên
                            </Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Tên người dùng"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-slate-600">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={userData.emailVerified} // Nếu email đã xác thực thì không cho sửa
                            />
                            {userData.emailVerified && <p className="mt-1 text-xs text-green-600">Email đã được xác thực</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <Label htmlFor="dob" className="text-slate-600">
                                Ngày tháng năm sinh
                            </Label>
                            <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="phoneNumber" className="text-slate-600">
                                Số điện thoại
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                placeholder="0898320059"
                                value={formData.phoneNumber || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <Label htmlFor="address" className="text-slate-600">
                                Địa chỉ
                            </Label>
                            <Input
                                id="address"
                                name="address"
                                type="text"
                                placeholder="Địa chỉ của bạn"
                                value={formData.address || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="bio" className="text-slate-600">
                                Giới thiệu
                            </Label>
                            <Textarea
                                id="bio"
                                name="bio"
                                placeholder="Giới thiệu về bản thân"
                                value={formData.bio || ""}
                                onChange={handleChange}
                                rows={4}
                            />
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="w-1/4 rounded-3xl bg-brand" disabled={isSubmitting}>
                            {isSubmitting ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

