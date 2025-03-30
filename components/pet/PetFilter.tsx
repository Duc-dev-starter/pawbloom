"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PetFilters } from "@/types/pet"

interface PetFilterProps {
    onFilter: (filters: PetFilters) => void
}

export default function PetFilter() {
    const [filters, setFilters] = useState<PetFilters>({
        type: "",
        size: "",
        age: "",
        gender: "",
        status: "",
        search: "",
        sort: ""
    })

    const handleChange = (field: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }))
    }



    return (
        <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-medium text-brand-200">Tìm kiếm thú cưng</h3>
            <form className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Tìm kiếm theo tên..."
                        className="pl-10"
                        value={filters.search}
                        onChange={(e) => handleChange("search", e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Select value={filters.type} onValueChange={(value) => handleChange("type", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Loại thú cưng" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="dog">Chó</SelectItem>
                            <SelectItem value="cat">Mèo</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filters.size} onValueChange={(value) => handleChange("size", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Kích thước" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="Small">Nhỏ</SelectItem>
                            <SelectItem value="Medium">Trung bình</SelectItem>
                            <SelectItem value="Large">Lớn</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filters.age} onValueChange={(value) => handleChange("age", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Độ tuổi" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="0-1">Dưới 1 tuổi</SelectItem>
                            <SelectItem value="1-3">1-3 tuổi</SelectItem>
                            <SelectItem value="3-7">3-7 tuổi</SelectItem>
                            <SelectItem value="7+">Trên 7 tuổi</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filters.gender} onValueChange={(value) => handleChange("gender", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Giới tính" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="Male">Đực</SelectItem>
                            <SelectItem value="Female">Cái</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={filters.status} onValueChange={(value) => handleChange("status", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="Available">Có sẵn</SelectItem>
                            <SelectItem value="Pending">Đang xử lý</SelectItem>
                            <SelectItem value="Adopted">Đã được nhận nuôi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button type="submit" className="w-full bg-brand hover:bg-brand/90">
                    Tìm kiếm
                </Button>
            </form>
        </div>
    )
}

