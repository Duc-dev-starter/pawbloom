"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Pet } from "@/types/pet"
import { cn } from "@/lib/utils"
import { useFavorites } from "@/hooks/use-favorite"

interface PetCardProps {
    pet: Pet
}

export default function PetCard({ pet }: PetCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites()

    const toggleFavoritePet = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite({
            id: pet.id,
            name: pet.name,
            photoURL: pet.photoURL,
            breed: pet.breed,
        })
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
        <Link href={`/adopt/${pet.id}`}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="relative">
                    <Image
                        src={pet.photoURL || "/placeholder.svg"}
                        alt={pet.name}
                        width={400}
                        height={300}
                        className="h-64 w-full object-cover"
                    />
                    <Badge className="absolute left-3 top-3 bg-brand text-white">{getPetType(pet.breed)}</Badge>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-3 top-3 rounded-full bg-white/80 hover:bg-white"
                        onClick={toggleFavoritePet}
                    >
                        <Heart className={cn("h-5 w-5", isFavorite(pet.id) ? "fill-brand text-brand" : "text-brand")} />
                    </Button>
                    <Badge className={cn("absolute right-3 bottom-3", getStatusColor(pet.status))}>
                        {getStatusText(pet.status)}
                    </Badge>
                </div>
                <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{pet.name}</h3>
                        <Badge variant="outline" className="border-brand text-brand">
                            {pet.size}
                        </Badge>
                    </div>
                    <div className="mb-3 flex flex-wrap gap-2">
                        <Badge variant="secondary">{pet.breed}</Badge>
                        <Badge variant="secondary">{pet.age} tuổi</Badge>
                        <Badge variant="secondary">{pet.gender === "Male" ? "Đực" : "Cái"}</Badge>
                    </div>
                    <p className="line-clamp-1 text-sm text-gray-600">{pet.description}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {pet.neutering && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Đã thiến/triệt sản
                            </Badge>
                        )}
                        {pet.vaccinations && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Đã tiêm phòng
                            </Badge>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                    <Button className="w-full bg-brand hover:bg-brand/90">
                        <PawPrint className="mr-2 h-4 w-4" />
                        Tìm hiểu thêm
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    )
}

