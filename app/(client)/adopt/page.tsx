"use client"

import { useState } from "react"
import SearchPet from "@/components/adopt/SearchPet"
import PetCard from "@/components/adopt/PetCard"
import { Button } from "@/components/ui/button"
import type { Pet, PetFilters } from "@/types/pet"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Sample data - replace with your actual API call
const petsData: Pet[] = [
    {
        petId: "601137a0-35a8-4a15-9513-5ad1f73e44a7",
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
    },
    {
        petId: "701137a0-35a8-4a15-9513-5ad1f73e44a8",
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
        petId: "801137a0-35a8-4a15-9513-5ad1f73e44a9",
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
        petId: "901137a0-35a8-4a15-9513-5ad1f73e44b0",
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
        petId: "101237a0-35a8-4a15-9513-5ad1f73e44c1",
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
        petId: "201237a0-35a8-4a15-9513-5ad1f73e44d2",
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
        petId: "301237a0-35a8-4a15-9513-5ad1f73e44e3",
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
        petId: "401237a0-35a8-4a15-9513-5ad1f73e44f4",
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
    {
        petId: "401237a0-35a8-4a15-9513-5ad1f73e44f4",
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
    {
        petId: "401237a0-35a8-4a15-9513-5ad1f73e44f4",
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
    {
        petId: "401237a0-35a8-4a15-9513-5ad1f73e44f4",
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
    {
        petId: "401237a0-35a8-4a15-9513-5ad1f73e44f4",
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

const AdoptPage = () => {
    const [pets, setPets] = useState<Pet[]>(petsData)
    const [filteredPets, setFilteredPets] = useState<Pet[]>(petsData)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const petsPerPage = 8
    const totalPages = Math.ceil(filteredPets.length / petsPerPage)

    // Lấy danh sách thú cưng hiện tại dựa trên trang
    const currentPets = filteredPets.slice((currentPage - 1) * petsPerPage, currentPage * petsPerPage)

    // Xử lý lọc thú cưng
    const handleFilter = (filters: PetFilters) => {
        setIsLoading(true)

        // Giả lập thời gian tải
        setTimeout(() => {
            let filtered = [...petsData]

            // Lọc theo từ khóa tìm kiếm
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase()
                filtered = filtered.filter(
                    (pet) =>
                        pet.name.toLowerCase().includes(searchTerm) ||
                        pet.breed.toLowerCase().includes(searchTerm) ||
                        pet.description.toLowerCase().includes(searchTerm),
                )
            }

            // Lọc theo loại thú cưng
            if (filters.type && filters.type !== "all") {
                const dogBreeds = ["Retriever", "Beagle", "Labrador", "Shih Tzu", "Bulldog", "Shepherd"]
                if (filters.type === "dog") {
                    filtered = filtered.filter((pet) => dogBreeds.some((breed) => pet.breed.includes(breed)))
                } else if (filters.type === "cat") {
                    filtered = filtered.filter((pet) => !dogBreeds.some((breed) => pet.breed.includes(breed)))
                }
            }

            // Lọc theo kích thước
            if (filters.size && filters.size !== "all") {
                filtered = filtered.filter((pet) => pet.size === filters.size)
            }

            // Lọc theo độ tuổi
            if (filters.age && filters.age !== "all") {
                switch (filters.age) {
                    case "0-1":
                        filtered = filtered.filter((pet) => pet.age < 1)
                        break
                    case "1-3":
                        filtered = filtered.filter((pet) => pet.age >= 1 && pet.age <= 3)
                        break
                    case "3-7":
                        filtered = filtered.filter((pet) => pet.age > 3 && pet.age <= 7)
                        break
                    case "7+":
                        filtered = filtered.filter((pet) => pet.age > 7)
                        break
                }
            }

            // Lọc theo giới tính
            if (filters.gender && filters.gender !== "all") {
                filtered = filtered.filter((pet) => pet.gender === filters.gender)
            }

            // Lọc theo trạng thái
            if (filters.status && filters.status !== "all") {
                filtered = filtered.filter((pet) => pet.status === filters.status)
            }

            // Sắp xếp kết quả
            if (filters.sort) {
                switch (filters.sort) {
                    case "newest":
                        filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        break
                    case "oldest":
                        filtered = filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                        break
                    case "name_asc":
                        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name))
                        break
                    case "name_desc":
                        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name))
                        break
                    case "age_asc":
                        filtered = filtered.sort((a, b) => a.age - b.age)
                        break
                    case "age_desc":
                        filtered = filtered.sort((a, b) => b.age - a.age)
                        break
                }
            }

            setFilteredPets(filtered)
            setCurrentPage(1) // Reset về trang đầu tiên khi lọc
            setIsLoading(false)
        }, 500)
    }

    // Xử lý chuyển trang
    const goToPage = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1)
        }
    }

    return (
        <section className="min-h-[91vh]">
            <SearchPet onFilter={handleFilter} />

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
                </div>
            ) : filteredPets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <h2 className="text-2xl font-semibold mb-4">Không tìm thấy thú cưng nào</h2>
                    <p className="text-gray-500 mb-6">Vui lòng thử lại với các bộ lọc khác</p>
                    <Button onClick={() => handleFilter({
                        sort: undefined
                    })} className="bg-brand hover:bg-brand/90">
                        Xóa bộ lọc
                    </Button>
                </div>
            ) : (
                <>
                    <div className="px-6 py-8 md:px-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {currentPets.map((pet) => (
                            <PetCard key={pet.petId} pet={pet} />
                        ))}
                    </div>

                    {/* Phân trang */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 pb-10">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="rounded-full border-brand hover:bg-brand/10"
                            >
                                <ChevronLeft className="h-5 w-5 text-brand" />
                            </Button>

                            {Array.from({ length: totalPages }).map((_, index) => {
                                const pageNumber = index + 1
                                // Hiển thị trang hiện tại, trang đầu, trang cuối và các trang lân cận
                                if (
                                    pageNumber === 1 ||
                                    pageNumber === totalPages ||
                                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                ) {
                                    return (
                                        <Button
                                            key={pageNumber}
                                            variant={currentPage === pageNumber ? "default" : "outline"}
                                            onClick={() => goToPage(pageNumber)}
                                            className={`h-10 w-10 rounded-full ${currentPage === pageNumber ? "bg-brand" : "border-brand text-brand hover:bg-brand/10"
                                                }`}
                                        >
                                            {pageNumber}
                                        </Button>
                                    )
                                } else if (
                                    (pageNumber === currentPage - 2 && currentPage > 3) ||
                                    (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                                ) {
                                    return (
                                        <span key={pageNumber} className="px-1">
                                            ...
                                        </span>
                                    )
                                }
                                return null
                            })}

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className="rounded-full border-brand hover:bg-brand/10"
                            >
                                <ChevronRight className="h-5 w-5 text-brand" />
                            </Button>
                        </div>
                    )}
                </>
            )}
        </section>
    )
}

export default AdoptPage

