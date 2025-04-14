"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Heart, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Pet } from "@/types/pet"
import PetDetailModal from "./PetDetailModal"
import { getPets } from "@/services/pet"
import { getPetStatus } from "@/utils"


export default function MeetPets() {
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
    const [pets, setPets] = useState<Pet[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const fetchPets = async () => {
            const response = await getPets();

            const availablePets = response.data.pets
                .filter((pet: Pet) => pet.status === "Available")
                .sort((a: Pet, b: Pet) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB.getTime() - dateA.getTime();
                })
                .slice(0, 3);

            setPets(availablePets);
        };

        fetchPets();
    }, []);




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
                {pets.map((pet) => (
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
                            <Badge className="absolute right-3 bottom-3 bg-green-500 text-white">{getPetStatus(pet.status)}</Badge>
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

