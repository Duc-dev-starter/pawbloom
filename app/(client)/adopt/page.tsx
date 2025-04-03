"use client"

import React, { useEffect, useState, useCallback } from "react" // Import useCallback
import SearchPet from "@/components/adopt/SearchPet"
import PetCard from "@/components/adopt/PetCard"
import { Button } from "@/components/ui/button"
import type { Pet, PetFilters } from "@/types/pet" // Assuming Pet type expects 'petId'
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getPets } from "@/services/pet"


interface ApiResponse {
    success: boolean;
    data: {
        pets: Pet[];
        currentPage?: number;
        totalPages?: number;
        hasNext?: boolean;
        hasPrevious?: boolean;
        totalCount?: number;
        pageSize?: number;
    };
    message?: string;
}




const AdoptPage = () => {
    const [allPets, setAllPets] = useState<Pet[]>([])
    const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInitialPets = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const response: ApiResponse = await getPets();

                console.log("API Response Data:", response);

                if (response.success && response.data && response.data.pets) {
                    const mappedPets = response.data.pets;


                    setAllPets(mappedPets);
                    setFilteredPets(mappedPets);
                } else {
                    console.error("Failed to fetch pets:", response.message || "No data returned");
                    setError(response.message || "Failed to load pets.");
                    setAllPets([]);
                    setFilteredPets([]);
                }
            } catch (error: any) {
                console.error("Error fetching pets:", error);
                setError(error.message || "An unexpected error occurred.");
                setAllPets([]);
                setFilteredPets([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialPets();
    }, []);


    const handleFilter = useCallback((filters: PetFilters) => {

        let filtered = [...allPets];

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(
                (pet) =>
                    pet.name.toLowerCase().includes(searchTerm) ||
                    pet.breed.toLowerCase().includes(searchTerm) ||
                    pet.description.toLowerCase().includes(searchTerm),
            );
        }

        if (filters.type && filters.type !== "all") {
            const dogBreeds = ["retriever", "beagle", "labrador", "shih tzu", "bulldog", "shepherd"];
            if (filters.type === "dog") {
                filtered = filtered.filter((pet) => dogBreeds.some((breed) => pet.breed.toLowerCase().includes(breed)));
            } else if (filters.type === "cat") {
                filtered = filtered.filter((pet) => !dogBreeds.some((breed) => pet.breed.toLowerCase().includes(breed)));
            }
        }

        if (filters.size && filters.size !== "all") {
            filtered = filtered.filter((pet) => pet.size.toLowerCase() === filters.size?.toLowerCase());
        }

        if (filters.age && filters.age !== "all") {
            switch (filters.age) {
                case "0-1":
                    filtered = filtered.filter((pet) => pet.age < 1);
                    break;
                case "1-3":
                    filtered = filtered.filter((pet) => pet.age >= 1 && pet.age <= 3);
                    break;
                case "3-7":
                    filtered = filtered.filter((pet) => pet.age > 3 && pet.age <= 7);
                    break;
                case "7+":
                    filtered = filtered.filter((pet) => pet.age > 7);
                    break;
            }
        }

        if (filters.gender && filters.gender !== "all") {
            filtered = filtered.filter((pet) => pet.gender.toLowerCase() === filters.gender?.toLowerCase());
        }

        if (filters.status && filters.status !== "all") {
            filtered = filtered.filter((pet) => pet.status.toLowerCase() === filters.status?.toLowerCase());
        }


        if (filters.sort) {
            const sortedFiltered = [...filtered];
            switch (filters.sort) {
                case "newest":
                    sortedFiltered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    break;
                case "oldest":
                    sortedFiltered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                    break;
                case "name_asc":
                    sortedFiltered.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case "name_desc":
                    sortedFiltered.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case "age_asc":
                    sortedFiltered.sort((a, b) => a.age - b.age);
                    break;
                case "age_desc":
                    sortedFiltered.sort((a, b) => b.age - a.age);
                    break;
            }
            filtered = sortedFiltered;
        }

        setFilteredPets(filtered);
        setCurrentPage(1);
        // setIsLoading(false); 
    }, [allPets]);


    // --- Client-Side Pagination Calculations ---
    const petsPerPage = 8;
    const totalPages = Math.ceil(filteredPets.length / petsPerPage);
    const currentPets = filteredPets.slice((currentPage - 1) * petsPerPage, currentPage * petsPerPage);

    // --- Pagination Handlers ---
    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    const clearFilters = useCallback(() => {
        handleFilter({
            sort: undefined
        });
    }, [handleFilter]);

    return (
        <section className="min-h-[91vh]">
            <SearchPet onFilter={handleFilter} />

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                    <h2 className="text-2xl font-semibold mb-4 text-red-600">Error</h2>
                    <p className="text-gray-500 mb-6">{error}</p>
                </div>
            ) : filteredPets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                    <h2 className="text-2xl font-semibold mb-4">Không có thú cưng nào được tìm thấy</h2>
                    <p className="text-gray-500 mb-6">
                        {allPets.length > 0 ? "No pets match the current filters. Try adjusting your search." : "There are currently no pets listed for adoption."}
                    </p>
                    <Button onClick={clearFilters} className="bg-brand hover:bg-brand/90">
                        Xóa bộ lọc
                    </Button>
                    {allPets.length > 0 && (
                        <Button onClick={clearFilters} className="bg-brand hover:bg-brand/90">
                            Đặt lại tìm kiếm
                        </Button>
                    )}

                </div>
            ) : (
                <>
                    <div className="px-6 py-8 md:px-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {currentPets.map((pet) => (
                            <PetCard key={pet.id} pet={pet} />
                        ))}
                    </div>

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


                            <span className="px-4 py-2 text-sm font-medium">
                                Trang {currentPage} trên {totalPages}
                            </span>


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
    );
};

export default AdoptPage;