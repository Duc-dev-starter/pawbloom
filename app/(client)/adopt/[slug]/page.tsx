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
import PetCard from "@/components/adopt/PetCard"
import { useFavorites } from "@/hooks/use-favorite"
import { getPet, getPets } from "@/services/pet"
import AdoptionModal from "@/components/adopt/AdoptModal"

// Sample data - replace with your actual API call
const petsData: Pet[] = [
    {
        id: "56bc1632-9343-4d80-ae89-017e18f68064",
        name: "Buddy",
        breed: "Golden Retriever",
        age: 3,
        size: "Large",
        gender: "Male",
        description:
            "A friendly and energetic pet who loves to play. Buddy is a wonderful Golden Retriever who enjoys outdoor activities, especially playing fetch and swimming. He's great with children and other dogs, making him a perfect family pet. Buddy has been trained to follow basic commands and is house-trained. He's looking for an active family who can provide him with plenty of exercise and love.",
        status: "Available",
        photoURL: "/placeholder.svg?height=500&width=500",
        weight: 30.5,
        color: "Golden",
        neutering: true,
        humanFriendly: true,
        dietarySpecific: false,
        rabiesVaccination: true,
        dogFriendly: true,
        pottyCare: false,
        vaccinations: true,
        catFriendly: false,
        rescueCenterId: null,
        createdAt: "2/6/2025 4:09:19 PM",
        updatedAt: "2/6/2025 11:09:19 PM",
    },
    {
        id: "701137a0-35a8-4a15-9513-5ad1f73e44a8",
        name: "Luna",
        breed: "Siamese",
        age: 2,
        size: "Medium",
        gender: "Female",
        description: "A gentle and quiet cat who enjoys cuddling.",
        status: "Available",
        photoURL: "/placeholder.svg?height=300&width=300",
        weight: 4.2,
        color: "Cream",
        neutering: true,
        humanFriendly: true,
        dietarySpecific: true,
        rabiesVaccination: true,
        dogFriendly: false,
        pottyCare: true,
        vaccinations: true,
        catFriendly: true,
        rescueCenterId: null,
        createdAt: "2/8/2025 2:15:30 PM",
        updatedAt: "2/8/2025 9:15:30 PM",
    },
    {
        id: "801137a0-35a8-4a15-9513-5ad1f73e44a9",
        name: "Max",
        breed: "Beagle",
        age: 1,
        size: "Small",
        gender: "Male",
        description: "An energetic puppy who loves to explore and play with toys.",
        status: "Available",
        photoURL: "/placeholder.svg?height=300&width=300",
        weight: 8.7,
        color: "Tricolor",
        neutering: false,
        humanFriendly: true,
        dietarySpecific: false,
        rabiesVaccination: true,
        dogFriendly: true,
        pottyCare: false,
        vaccinations: true,
        catFriendly: true,
        rescueCenterId: null,
        createdAt: "2/10/2025 10:45:12 AM",
        updatedAt: "2/10/2025 5:45:12 PM",
    },
    {
        id: "901137a0-35a8-4a15-9513-5ad1f73e44b0",
        name: "Bella",
        breed: "Persian",
        age: 4,
        size: "Medium",
        gender: "Female",
        description: "A calm and elegant cat who enjoys peaceful environments.",
        status: "Available",
        photoURL: "/placeholder.svg?height=300&width=300",
        weight: 5.1,
        color: "White",
        neutering: true,
        humanFriendly: true,
        dietarySpecific: true,
        rabiesVaccination: true,
        dogFriendly: false,
        pottyCare: true,
        vaccinations: true,
        catFriendly: true,
        rescueCenterId: null,
        createdAt: "2/12/2025 3:30:45 PM",
        updatedAt: "2/12/2025 10:30:45 PM",
    },
    {
        id: "101237a0-35a8-4a15-9513-5ad1f73e44c1",
        name: "Charlie",
        breed: "Labrador Retriever",
        age: 2,
        size: "Large",
        gender: "Male",
        description: "A friendly and active dog who loves water and outdoor activities.",
        status: "Available",
        photoURL: "/placeholder.svg?height=300&width=300",
        weight: 28.3,
        color: "Chocolate",
        neutering: true,
        humanFriendly: true,
        dietarySpecific: false,
        rabiesVaccination: true,
        dogFriendly: true,
        pottyCare: true,
        vaccinations: true,
        catFriendly: false,
        rescueCenterId: null,
        createdAt: "2/15/2025 9:20:18 AM",
        updatedAt: "2/15/2025 4:20:18 PM",
    },
    {
        id: "201237a0-35a8-4a15-9513-5ad1f73e44d2",
        name: "Daisy",
        breed: "Shih Tzu",
        age: 5,
        size: "Small",
        gender: "Female",
        description: "A sweet and affectionate dog who loves to be pampered.",
        status: "Available",
        photoURL: "/placeholder.svg?height=300&width=300",
        weight: 6.2,
        color: "Brown and White",
        neutering: true,
        humanFriendly: true,
        dietarySpecific: true,
        rabiesVaccination: true,
        dogFriendly: true,
        pottyCare: true,
        vaccinations: true,
        catFriendly: true,
        rescueCenterId: null,
        createdAt: "2/18/2025 1:10:33 PM",
        updatedAt: "2/18/2025 8:10:33 PM",
    },
    {
        id: "301237a0-35a8-4a15-9513-5ad1f73e44e3",
        name: "Rocky",
        breed: "Bulldog",
        age: 4,
        size: "Medium",
        gender: "Male",
        description: "A loyal and protective dog with a gentle temperament.",
        status: "Pending",
        photoURL: "/placeholder.svg?height=300&width=300",
        weight: 22.7,
        color: "White and Brown",
        neutering: true,
        humanFriendly: true,
        dietarySpecific: false,
        rabiesVaccination: true,
        dogFriendly: false,
        pottyCare: true,
        vaccinations: true,
        catFriendly: false,
        rescueCenterId: null,
        createdAt: "2/20/2025 11:25:40 AM",
        updatedAt: "2/20/2025 6:25:40 PM",
    },
    {
        id: "401237a0-35a8-4a15-9513-5ad1f73e44f4",
        name: "Coco",
        breed: "Maine Coon",
        age: 3,
        size: "Large",
        gender: "Female",
        description: "A majestic and friendly cat with a beautiful long coat.",
        status: "Available",
        photoURL: "/placeholder.svg?height=300&width=300",
        weight: 7.8,
        color: "Brown Tabby",
        neutering: true,
        humanFriendly: true,
        dietarySpecific: false,
        rabiesVaccination: true,
        dogFriendly: true,
        pottyCare: true,
        vaccinations: true,
        catFriendly: true,
        rescueCenterId: null,
        createdAt: "2/22/2025 2:40:15 PM",
        updatedAt: "2/22/2025 9:40:15 PM",
    },
]

interface AdoptPageDetailProps {
    params: {
        slug: string
    }
}

const AdoptPageDetail = ({ params }: AdoptPageDetailProps) => {
    const { slug } = params
    const [pet, setPet] = useState<Pet | null>(null)
    const [similarPets, setSimilarPets] = useState<Pet[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isAdopting] = useState(false)
    const { isFavorite, toggleFavorite } = useFavorites()
    const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false)

    useEffect(() => {
        // Giả lập API call
        const fetchPet = async () => {
            setIsLoading(true)
            try {
                const response = await getPet(slug);
                console.log(response);

                if (response.data) {
                    setPet(response.data)

                    // Tìm các thú cưng tương tự theo breed
                    const similarPetResponse = await getPets();
                    const similarPet = similarPetResponse.data

                    // Nếu không có thú cưng cùng breed, tìm theo loại (chó/mèo)
                    if (similarPet.length === 0) {
                        const isDog = isDogBreed(response.data.breed)
                        const similarByType = petsData.filter((p) => p.id !== slug && isDogBreed(p.breed) === isDog)
                        setSimilarPets(similarByType.slice(0, 4))
                    } else {
                        setSimilarPets(similarPet.slice(0, 4))
                    }
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

    const isDogBreed = (breed: string): boolean => {
        const dogBreeds = ["Retriever", "Beagle", "Labrador", "Shih Tzu", "Poodle", "Bulldog", "Shepherd"]
        return dogBreeds.some((dogBreed) => breed.includes(dogBreed))
    }

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
                                <Heart className={cn("h-5 w-5", isFavorite(pet.id) ? "fill-brand" : "")} />
                                {isFavorite(pet.id) ? "Đã yêu thích" : "Yêu thích"}
                            </Button>

                            <Button
                                className="flex-1 gap-2 bg-brand hover:bg-brand/90"
                                disabled={pet.status !== "Available" || isAdopting}
                                onClick={handleAdopt}
                            >
                                <PawPrint className="h-5 w-5" />
                                {isAdopting ? "Đang xử lý..." : "Nhận nuôi ngay"}
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

                {/* Phần thú cưng tương tự */}
                <div className="mt-16">
                    <h2 className="mb-6 text-2xl font-bold">Thú cưng tương tự</h2>
                    {similarPets.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {similarPets.map((similarPet) => (
                                <PetCard key={similarPet.id} pet={similarPet} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Không tìm thấy thú cưng tương tự</p>
                    )}
                </div>
            </div>
            {pet && <AdoptionModal pet={pet} isOpen={isAdoptModalOpen} onClose={() => setIsAdoptModalOpen(false)} />}
        </section>
    )
}

export default AdoptPageDetail

