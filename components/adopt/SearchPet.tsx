"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pet } from "@/types/pet";
import axios from "axios";

const SearchPet = () => {
    const [searchTerm, setSearchTerm] = useState<string>(""); // Giá trị từ input
    const [results, setResults] = useState<Pet[]>([]); // Kết quả tìm kiếm
    const [loading, setLoading] = useState<boolean>(false); // Trạng thái tải

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        setLoading(true);
        try {
            const response = await axios.get(`/api/pets/search`, {
                params: { query: searchTerm },
            });
            setResults(response.data || []);
        } catch (error) {
            console.error("Error searching pets:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <div className="flex items-center gap-2 mb-4">
                <Input
                    type="text"
                    placeholder="Search for a pet..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                />
                <Button onClick={handleSearch} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </Button>
            </div>
            <div className="space-y-4">
                {results.length === 0 && !loading && (
                    <p className="text-gray-500">No pets found. Try another search term.</p>
                )}
                {results.map((pet) => (
                    <Card key={pet.id} className="p-4">
                        <h3 className="text-lg font-semibold">{pet.name}</h3>
                        <p className="text-sm text-gray-600">Type: {pet.type}</p>
                        <p className="text-sm text-gray-600">Breed: {pet.breed}</p>
                        <p className="text-sm text-gray-600">Age: {pet.age} years</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SearchPet;
