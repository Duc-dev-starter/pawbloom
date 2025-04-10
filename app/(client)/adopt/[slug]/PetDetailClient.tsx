"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, PawPrint, Calendar, Weight, Ruler, Check, X, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Pet } from "@/types/pet"
import { cn } from "@/lib/utils"
import { useFavorites } from "@/hooks/use-favorite"
import AdoptionModal from "@/components/adopt/AdoptModal"
import { getPet } from "@/services/pet"



interface PetDetailClientProps {
    slug: string
}

export default function PetDetailClient({ slug }: PetDetailClientProps) {
    const [pet, setPet] = useState<Pet | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false)
    const { isFavorite, toggleFavorite } = useFavorites()

    // Define isFavoriteRef here
    const isFavoriteRef = useFavorites() // Cập nhật tiêu đề trang động
    useEffect(() => {
        if (pet) {
            document.title = `${pet.name} - ${pet.breed} | Pawbloom`
        }
    }, [pet])

    useEffect(() => {
        // Fetch dữ liệu thú cưng
        const fetchPet = async () => {
            setIsLoading(true)
            try {
                const response = await getPet(slug)

                if (response.data) {
                    setPet(response.data)


                } else {
                    // Không tìm thấy thú cưng
                    console.error("Pet not found")
                }
            } catch (error) {
                console.error("Error fetching pet:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPet()
    }, [slug])


    const handleToggleFavorite = () => {
        if (!pet) return

        toggleFavorite({
            id: pet.id,
            name: pet.name,
            photoURL: pet.photoURL,
            breed: pet.breed,
        })
    }

    const handleAdopt = () => {
        if (!pet || pet.status !== "Available") return
        setIsAdoptModalOpen(true)
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Nhận nuôi ${pet?.name} tại Pawbloom`,
                text: `Hãy xem ${pet?.name}, một ${pet?.breed} ${pet?.age} tuổi đang cần một mái ấm mới!`,
                url: window.location.href,
            })
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(window.location.href)
            alert("Đã sao chép đường dẫn vào clipboard!")
        }
    }

    const renderFeature = (value: boolean, label: string) => (
        <div className="flex items-center gap-2">
            {value ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
            <span>{label}</span>
        </div>
    )

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[90vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
            </div>
        )
    }

    if (!pet) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[90vh] px-4">
                <h1 className="text-3xl font-bold mb-4">Không tìm thấy thú cưng</h1>
                <p className="text-gray-500 mb-6 text-center">
                    Thú cưng bạn đang tìm kiếm không tồn tại hoặc đã được nhận nuôi.
                </p>
                <Link href="/adopt">
                    <Button className="bg-brand hover:bg-brand/90">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Quay lại trang tìm kiếm
                    </Button>
                </Link>
            </div>
        )
    }

    const getPetType = (breed: string): string => {
        const dogBreeds = ["Retriever", "Beagle", "Labrador", "Shih Tzu", "Poodle", "Bulldog", "Shepherd"]
        return dogBreeds.some((dogBreed) => breed.includes(dogBreed)) ? "Chó" : "Mèo"
    }

    const getStatusColor = (status: string): string => {
        switch (status) {
            case "Available":
                return "bg-green-500 text-white"
            case "Pending":
                return "bg-yellow-500 text-white"
            case "Adopted":
                return "bg-gray-500 text-white"
            default:
                return "bg-brand text-white"
        }
    }

    const getStatusText = (status: string): string => {
        switch (status) {
            case "Available":
                return "Có sẵn"
            case "Pending":
                return "Đang xử lý"
            case "Adopted":
                return "Đã nhận nuôi"
            default:
                return status
        }
    }



    return (
        <section className="px-4 py-8 min-h-[90vh] md:px-16">
            <div className="mx-auto max-w-7xl">
                {/* Breadcrumb và nút quay lại */}
                <div className="mb-6 flex items-center">
                    <Link href="/adopt">
                        <Button variant="ghost" className="gap-1 p-0 hover:bg-transparent">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="text-sm text-gray-500">Quay lại</span>
                        </Button>
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-sm text-gray-700">{pet.name}</span>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Phần hình ảnh */}
                    <div className="relative">
                        <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                            <Image
                                src={pet.photoURL || "/placeholder.svg"}
                                alt={pet.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>

                        <div className="absolute top-4 left-4">
                            <Badge className={cn("px-3 py-1", getStatusColor(pet.status))}>{getStatusText(pet.status)}</Badge>
                        </div>

                        <div className="absolute top-4 right-4 flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full bg-white/80 hover:bg-white"
                                onClick={handleShare}
                            >
                                <Share2 className="h-5 w-5 text-gray-700" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full bg-white/80 hover:bg-white"
                                onClick={handleToggleFavorite}
                            >
                                <Heart className={cn("h-5 w-5", isFavorite(pet.id) ? "fill-brand text-brand" : "text-gray-700")} />
                            </Button>
                        </div>
                    </div>

                    {/* Phần thông tin */}
                    <div className="flex flex-col">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold">{pet.name}</h1>
                                <div className="mt-1 flex items-center gap-2">
                                    <Badge variant="outline" className="bg-brand/10 text-brand">
                                        {getPetType(pet.breed)}
                                    </Badge>
                                    <span className="text-gray-500">{pet.breed}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-3">
                                <Calendar className="mb-1 h-5 w-5 text-brand" />
                                <span className="text-sm font-medium">{pet.age} tuổi</span>
                            </div>
                            <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-3">
                                <Weight className="mb-1 h-5 w-5 text-brand" />
                                <span className="text-sm font-medium">{pet.weight} kg</span>
                            </div>
                            <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-3">
                                <Ruler className="mb-1 h-5 w-5 text-brand" />
                                <span className="text-sm font-medium">{pet.size}</span>
                            </div>
                        </div>

                        <Tabs defaultValue="about" className="mb-6">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="about">Thông tin</TabsTrigger>
                                <TabsTrigger value="features">Đặc điểm</TabsTrigger>
                                <TabsTrigger value="adoption">Nhận nuôi</TabsTrigger>
                            </TabsList>

                            <TabsContent value="about" className="mt-4">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="mb-2 font-medium">Mô tả</h3>
                                        <p className="text-gray-600">{pet.description}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 font-medium">Thông tin cơ bản</h3>
                                        <ul className="grid grid-cols-2 gap-y-2">
                                            <li className="flex items-center gap-2">
                                                <span className="text-gray-500">Giống:</span>
                                                <span>{pet.breed}</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-gray-500">Giới tính:</span>
                                                <span>{pet.gender === "Male" ? "Đực" : "Cái"}</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-gray-500">Màu sắc:</span>
                                                <span>{pet.color}</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-gray-500">Kích thước:</span>
                                                <span>{pet.size}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="features" className="mt-4">
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                    {renderFeature(pet.neutering, "Đã thiến/triệt sản")}
                                    {renderFeature(pet.vaccinations, "Đã tiêm phòng")}
                                    {renderFeature(pet.rabiesVaccination, "Tiêm phòng dại")}
                                    {renderFeature(pet.humanFriendly, "Thân thiện với người")}
                                    {renderFeature(pet.dogFriendly, "Thân thiện với chó")}
                                    {renderFeature(pet.catFriendly, "Thân thiện với mèo")}
                                    {renderFeature(pet.pottyCare, "Đã huấn luyện vệ sinh")}
                                    {renderFeature(pet.dietarySpecific, "Chế độ ăn đặc biệt")}
                                </div>
                            </TabsContent>

                            <TabsContent value="adoption" className="mt-4">
                                <div className="space-y-4">
                                    <p className="text-gray-600">
                                        Nhận nuôi một thú cưng là một quyết định quan trọng và lâu dài. Trước khi nhận nuôi, hãy chắc chắn
                                        rằng bạn có đủ thời gian, không gian và nguồn lực để chăm sóc cho thú cưng mới của mình.
                                    </p>

                                    <div className="rounded-lg bg-muted p-4">
                                        <h4 className="mb-2 font-medium">Quy trình nhận nuôi</h4>
                                        <ol className="ml-5 list-decimal space-y-2 text-gray-600">
                                            <li>Điền đơn đăng ký nhận nuôi</li>
                                            <li>Phỏng vấn với nhân viên trung tâm</li>
                                            <li>Kiểm tra nhà cửa (nếu cần)</li>
                                            <li>Thanh toán phí nhận nuôi</li>
                                            <li>Đón thú cưng về nhà</li>
                                        </ol>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>

                        <Separator className="my-4" />

                        <div className="mt-auto flex flex-col gap-4 sm:flex-row">
                            <Button
                                variant="outline"
                                className="flex-1 gap-2 border-brand text-brand hover:bg-brand/10"
                                onClick={handleToggleFavorite}
                            >
                                <Heart className={cn("h-5 w-5", isFavoriteRef.isFavorite(pet.id) ? "fill-brand" : "")} />
                                {isFavoriteRef.isFavorite(pet.id) ? "Đã yêu thích" : "Yêu thích"}
                            </Button>

                            <Button
                                className="flex-1 gap-2 bg-brand hover:bg-brand/90"
                                disabled={pet.status !== "Available"}
                                onClick={handleAdopt}
                            >
                                <PawPrint className="h-5 w-5" />
                                Nhận nuôi ngay
                            </Button>
                        </div>

                        {pet.status !== "Available" && (
                            <p className="mt-2 text-center text-sm text-gray-500">
                                {pet.status === "Pending"
                                    ? "Thú cưng này đang trong quá trình xử lý nhận nuôi"
                                    : "Thú cưng này đã được nhận nuôi"}
                            </p>
                        )}
                    </div>
                </div>

            </div>

            {/* Modal nhận nuôi */}
            {pet && <AdoptionModal pet={pet} isOpen={isAdoptModalOpen} onClose={() => setIsAdoptModalOpen(false)} />}
        </section>
    )
}

