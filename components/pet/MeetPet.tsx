"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Pet } from "@/types/pet"
import PetDetailModal from "./PetDetailModal"

// Sample data - replace with your actual data
const petsData: Pet[] = [
    {
        id: "601137a0-35a8-4a15-9513-5ad1f73e44a7",
        name: "Buddy",
        breed: "Golden Retriever",
        age: 3,
        size: "Large",
        gender: "Male",
        description: "A friendly and energetic pet who loves to play.",
        status: "Available",
        photoURL: "/placeholder.svg?height=300&width=300",
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
        price: 30000
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
        price: 30000
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
        price: 30000
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
        price: 30000
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
        price: 30000
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
        price: 30000
    },
]

export default function MeetPets() {
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const selectedPets = petsData.slice(0, 3)


    const handlePetClick = (pet: Pet) => {
        setSelectedPet(pet)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="w-full">
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-brand-200 md:text-3xl">Gặp gỡ thú cưng</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {selectedPets.map((pet) => (
                    <Card key={pet.id} className="overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative">
                            <Image
                                src={pet.photoURL || "/placeholder.svg"}
                                alt={pet.name}
                                width={400}
                                height={300}
                                className="h-64 w-full object-cover cursor-pointer"
                                onClick={() => handlePetClick(pet)}
                            />
                            <Badge className="absolute left-3 top-3 bg-brand text-white">
                                {pet.breed.includes("Retriever") ||
                                    pet.breed.includes("Beagle") ||
                                    pet.breed.includes("Labrador") ||
                                    pet.breed.includes("Shih Tzu")
                                    ? "Chó"
                                    : "Mèo"}
                            </Badge>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute right-3 top-3 rounded-full bg-white/80 hover:bg-white"
                            >
                                <Heart className="h-5 w-5 text-brand" />
                            </Button>
                            <Badge className="absolute right-3 bottom-3 bg-green-500 text-white">{pet.status}</Badge>
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
                                <Badge variant="secondary">{pet.weight} kg</Badge>
                            </div>
                            <p className="line-clamp-2 text-sm text-gray-600">{pet.description}</p>

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
                                {pet.humanFriendly && (
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                        Thân thiện với người
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="border-t p-4">
                            <Button className="w-full bg-brand hover:bg-brand/90" onClick={() => handlePetClick(pet)}>
                                <PawPrint className="mr-2 h-4 w-4" />
                                Tìm hiểu thêm
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>


            <PetDetailModal pet={selectedPet} isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}

