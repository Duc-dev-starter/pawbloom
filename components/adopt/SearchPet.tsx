"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { PetFilters } from "@/types/pet"
import { Badge } from "@/components/ui/badge"

interface SearchPetProps {
    onFilter: (filters: PetFilters) => void;
}

export default function SearchPet({ onFilter }: SearchPetProps) {
    const [filters, setFilters] = useState<PetFilters>({
        type: "",
        size: "",
        age: "",
        gender: "",
        status: "",
        search: "",
        sort: "newest",
    });

    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    const handleChange = (field: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Update active filters
        const newActiveFilters = [];
        if (filters.type && filters.type !== "all") newActiveFilters.push(`Loại: ${filters.type === "dog" ? "Chó" : "Mèo"}`);
        if (filters.size && filters.size !== "all") newActiveFilters.push(`Kích thước: ${filters.size}`);
        if (filters.age && filters.age !== "all") newActiveFilters.push(`Tuổi: ${filters.age}`);
        if (filters.gender && filters.gender !== "all") newActiveFilters.push(`Giới tính: ${filters.gender === "Male" ? "Đực" : "Cái"}`);
        if (filters.status && filters.status !== "all") newActiveFilters.push(`Trạng thái: ${filters.status}`);

        setActiveFilters(newActiveFilters);

        if (onFilter) {
            onFilter(filters);
        }
    };

    const clearFilter = (filterToRemove: string) => {
        const fieldMap: Record<string, string> = {
            "Loại: Chó": "type",
            "Loại: Mèo": "type",
            "Kích thước: Small": "size",
            "Kích thước: Medium": "size",
            "Kích thước: Large": "size",
            "Tuổi: 0-1": "age",
            "Tuổi: 1-3": "age",
            "Tuổi: 3-7": "age",
            "Tuổi: 7+": "age",
            "Giới tính: Đực": "gender",
            "Giới tính: Cái": "gender",
            "Trạng thái: Available": "status",
            "Trạng thái: Pending": "status",
            "Trạng thái: Adopted": "status",
        };

        const field = fieldMap[filterToRemove];
        if (field) {
            setFilters(prev => ({ ...prev, [field]: "" }));
            setActiveFilters(prev => prev.filter(f => f !== filterToRemove));

            if (onFilter) {
                onFilter({ ...filters, [field]: "" });
            }
        }
    };

    const clearAllFilters = () => {
        const resetFilters = {
            type: "",
            size: "",
            age: "",
            gender: "",
            status: "",
            search: filters.search, // Keep search term
            sort: filters.sort, // Keep sort option
        };

        setFilters(resetFilters);
        setActiveFilters([]);

        if (onFilter) {
            onFilter(resetFilters);
        }
    };

    return (
        <div className="bg-brand/10 px-6 py-8 md:px-16">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-6 text-3xl font-bold text-brand-200 md:text-4xl">Tìm kiếm thú cưng</h1>

                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Tìm kiếm theo tên..."
                            className="pl-10"
                            value={filters.search}
                            onChange={(e) => handleChange("search", e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit(e);
                                }
                            }}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Bộ lọc
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-md">
                                <SheetHeader>
                                    <SheetTitle>Bộ lọc tìm kiếm</SheetTitle>
                                </SheetHeader>
                                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium">Loại thú cưng</label>
                                            <Select
                                                value={filters.type}
                                                onValueChange={(value) => handleChange("type", value)}
                                            >
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Tất cả" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Tất cả</SelectItem>
                                                    <SelectItem value="dog">Chó</SelectItem>
                                                    <SelectItem value="cat">Mèo</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Kích thước</label>
                                            <Select
                                                value={filters.size}
                                                onValueChange={(value) => handleChange("size", value)}
                                            >
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Tất cả" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Tất cả</SelectItem>
                                                    <SelectItem value="Small">Nhỏ</SelectItem>
                                                    <SelectItem value="Medium">Trung bình</SelectItem>
                                                    <SelectItem value="Large">Lớn</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Độ tuổi</label>
                                            <Select
                                                value={filters.age}
                                                onValueChange={(value) => handleChange("age", value)}
                                            >
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Tất cả" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Tất cả</SelectItem>
                                                    <SelectItem value="0-1">Dưới 1 tuổi</SelectItem>
                                                    <SelectItem value="1-3">1-3 tuổi</SelectItem>
                                                    <SelectItem value="3-7">3-7 tuổi</SelectItem>
                                                    <SelectItem value="7+">Trên 7 tuổi</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Giới tính</label>
                                            <Select
                                                value={filters.gender}
                                                onValueChange={(value) => handleChange("gender", value)}
                                            >
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Tất cả" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Tất cả</SelectItem>
                                                    <SelectItem value="Male">Đực</SelectItem>
                                                    <SelectItem value="Female">Cái</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Trạng thái</label>
                                            <Select
                                                value={filters.status}
                                                onValueChange={(value) => handleChange("status", value)}
                                            >
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Tất cả" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Tất cả</SelectItem>
                                                    <SelectItem value="Available">Có sẵn</SelectItem>
                                                    <SelectItem value="Pending">Đang xử lý</SelectItem>
                                                    <SelectItem value="Adopted">Đã được nhận nuôi</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">Sắp xếp theo</label>
                                            <Select
                                                value={filters.sort}
                                                onValueChange={(value) => handleChange("sort", value)}
                                            >
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Mới nhất" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="newest">Mới nhất</SelectItem>
                                                    <SelectItem value="oldest">Cũ nhất</SelectItem>
                                                    <SelectItem value="name_asc">Tên (A-Z)</SelectItem>
                                                    <SelectItem value="name_desc">Tên (Z-A)</SelectItem>
                                                    <SelectItem value="age_asc">Tuổi (thấp đến cao)</SelectItem>
                                                    <SelectItem value="age_desc">Tuổi (cao đến thấp)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button type="button" variant="outline" className="flex-1" onClick={clearAllFilters}>
                                            Xóa bộ lọc
                                        </Button>
                                        <Button type="submit" className="flex-1 bg-brand hover:bg-brand/90">
                                            Áp dụng
                                        </Button>
                                    </div>
                                </form>
                            </SheetContent>
                        </Sheet>

                        <Select
                            value={filters.sort}
                            onValueChange={(value) => {
                                handleChange("sort", value);
                                onFilter({ ...filters, sort: value });
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sắp xếp theo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Mới nhất</SelectItem>
                                <SelectItem value="oldest">Cũ nhất</SelectItem>
                                <SelectItem value="name_asc">Tên (A-Z)</SelectItem>
                                <SelectItem value="name_desc">Tên (Z-A)</SelectItem>
                                <SelectItem value="age_asc">Tuổi (thấp đến cao)</SelectItem>
                                <SelectItem value="age_desc">Tuổi (cao đến thấp)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {activeFilters.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-500">Bộ lọc đang áp dụng:</span>
                        {activeFilters.map((filter) => (
                            <Badge key={filter} variant="outline" className="flex items-center gap-1 bg-brand/10 px-3 py-1">
                                {filter}
                                <button onClick={() => clearFilter(filter)}>
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-sm text-brand">
                            Xóa tất cả
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
