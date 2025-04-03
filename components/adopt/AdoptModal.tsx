"use client"

import type React from "react"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Pet } from "@/types/pet"
import { toast } from "@/hooks/use-toast"

interface AdoptionModalProps {
    pet: Pet
    isOpen: boolean
    onClose: () => void
}

export default function AdoptionModal({ pet, isOpen, onClose }: AdoptionModalProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        nationality: "Việt Nam",
        address: "",
        reason: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            toast({
                title: "Lỗi",
                description: "Vui lòng nhập họ và tên",
                variant: "destructive",
            })
            return false
        }

        if (!formData.email.trim()) {
            toast({
                title: "Lỗi",
                description: "Vui lòng nhập email",
                variant: "destructive",
            })
            return false
        }

        if (!formData.phoneNumber.trim()) {
            toast({
                title: "Lỗi",
                description: "Vui lòng nhập số điện thoại",
                variant: "destructive",
            })
            return false
        }

        if (!formData.address.trim()) {
            toast({
                title: "Lỗi",
                description: "Vui lòng nhập địa chỉ",
                variant: "destructive",
            })
            return false
        }

        return true
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        // Hiển thị dialog xác nhận
        setShowConfirm(true)
    }

    const handleConfirm = async () => {
        setIsSubmitting(true)

        try {
            // Giả lập API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Đóng modal
            setShowConfirm(false)
            onClose()

            // Hiển thị thông báo thành công
            toast({
                title: "Thành công",
                description: `Đơn nhận nuôi ${pet.name} đã được gửi thành công. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.`,
            })

            // Reset form
            setFormData({
                fullName: "",
                email: "",
                phoneNumber: "",
                nationality: "Việt Nam",
                address: "",
                reason: "",
            })
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Có lỗi xảy ra khi gửi đơn nhận nuôi. Vui lòng thử lại sau.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const adoptionFee = pet.size === "Small" ? 1000000 : pet.size === "Medium" ? 1500000 : 2000000

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Đơn nhận nuôi {pet.name}</DialogTitle>
                        <DialogDescription>Vui lòng điền đầy đủ thông tin để hoàn tất đơn nhận nuôi.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="fullName">Họ và tên</Label>
                                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                                <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                            </div>

                            <div>
                                <Label htmlFor="nationality">Quốc tịch</Label>
                                <Select value={formData.nationality} onValueChange={(value) => handleSelectChange("nationality", value)}>
                                    <SelectTrigger id="nationality">
                                        <SelectValue placeholder="Chọn quốc tịch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Việt Nam">Việt Nam</SelectItem>
                                        <SelectItem value="Mỹ">Mỹ</SelectItem>
                                        <SelectItem value="Nhật Bản">Nhật Bản</SelectItem>
                                        <SelectItem value="Hàn Quốc">Hàn Quốc</SelectItem>
                                        <SelectItem value="Khác">Khác</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="address">Địa chỉ</Label>
                                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="reason">Lý do nhận nuôi (không bắt buộc)</Label>
                                <Textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} rows={3} />
                            </div>

                            <div className="col-span-2 rounded-lg bg-muted p-4">
                                <div className="flex justify-between">
                                    <span className="font-medium">Thú cưng:</span>
                                    <span>{pet.name} ({pet.breed})</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="font-medium">Phí nhận nuôi:</span>
                                    <span>{adoptionFee.toLocaleString("vi-VN")} VNĐ</span>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Phí nhận nuôi bao gồm chi phí tiêm phòng, triệt sản, và chăm sóc y tế cơ bản.
                                </p>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
                            <Button type="submit" className="bg-brand hover:bg-brand/90">Gửi đơn</Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>

            <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận gửi đơn nhận nuôi</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn gửi đơn nhận nuôi {pet.name}? Sau khi gửi đơn, nhân viên trạm cứu trợ sẽ liên hệ với
                            bạn để xác nhận thông tin.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm} className="bg-brand hover:bg-brand/90" disabled={isSubmitting}>
                            {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

