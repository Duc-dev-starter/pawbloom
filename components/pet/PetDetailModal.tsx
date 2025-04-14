"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, Check, PawPrint, Heart, Calendar, Weight, Ruler } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Pet } from "@/types/pet"
import { getPetStatus } from "@/utils"
import { useRouter } from "next/navigation"

interface PetDetailModalProps {
    pet: Pet | null
    isOpen: boolean
    onClose: () => void
}

export default function PetDetailModal({ pet, isOpen, onClose }: PetDetailModalProps) {
    const [isAdopting, setIsAdopting] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()

    if (!pet) return null


    const handleAdoptClick = () => {
        if (!isLoggedIn) {
            router.push("/sign-in")
            return
        }

        setIsAdopting(true)
        // Thêm logic xử lý nhận nuôi ở đây
        setTimeout(() => {
            setIsAdopting(false)
            onClose()
            // Hiển thị thông báo thành công
        }, 1500)
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user")
            setIsLoggedIn(!!user)
        }
    }, [])


    const renderFeature = (value: boolean, label: string) => (
        <div className="flex items-center gap-2">
            {value ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
            <span>{label}</span>
        </div>
    )

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-brand-200">{pet.name}</DialogTitle>
                    <DialogDescription>
                        {pet.breed} • {pet.age} tuổi • {pet.gender === "Male" ? "Đực" : "Cái"}
                    </DialogDescription>
                </DialogHeader>

                <div className="relative">
                    <Image
                        src={pet.photoURL || "/placeholder.svg"}
                        alt={pet.name}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover rounded-md"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white">{getPetStatus(pet.status)}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 py-2">
                    <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-md">
                        <Calendar className="h-5 w-5 text-brand mb-1" />
                        <span className="text-sm font-medium">{pet.age} tuổi</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-md">
                        <Weight className="h-5 w-5 text-brand mb-1" />
                        <span className="text-sm font-medium">{pet.weight} kg</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-md">
                        <Ruler className="h-5 w-5 text-brand mb-1" />
                        <span className="text-sm font-medium">{pet.size}</span>
                    </div>
                </div>

                <div>
                    <h3 className="font-medium mb-2">Mô tả</h3>
                    <p className="text-sm text-muted-foreground">{pet.description}</p>
                </div>

                <Separator />

                <div>
                    <h3 className="font-medium mb-3">Đặc điểm</h3>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                        {renderFeature(pet.neutering, "Đã thiến/triệt sản")}
                        {renderFeature(pet.vaccinations, "Đã tiêm phòng")}
                        {renderFeature(pet.rabiesVaccination, "Tiêm phòng dại")}
                        {renderFeature(pet.humanFriendly, "Thân thiện với người")}
                        {renderFeature(pet.dogFriendly, "Thân thiện với chó")}
                        {renderFeature(pet.catFriendly, "Thân thiện với mèo")}
                        {renderFeature(pet.pottyCare, "Đã huấn luyện vệ sinh")}
                        {renderFeature(pet.dietarySpecific, "Chế độ ăn đặc biệt")}
                    </div>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="flex-1 border-brand text-brand hover:bg-brand/10" onClick={onClose}>
                        <Heart className="mr-2 h-4 w-4" />
                        Yêu thích
                    </Button>
                    <Button
                        className="flex-1 bg-brand hover:bg-brand/90"
                        onClick={handleAdoptClick}
                        disabled={isAdopting || pet.status !== "Available"}
                    >
                        <PawPrint className="mr-2 h-4 w-4" />
                        {isLoggedIn
                            ? (isAdopting ? "Đang xử lý..." : "Nhận nuôi")
                            : "Đăng nhập để nhận nuôi"}

                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

