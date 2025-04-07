"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Mail, Phone, Globe, ArrowUpDown, Filter, X, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { getFosters } from "@/services/foster"
import { Foster } from "@/types/foster"



export default function FosterClient() {
    const [fosters, setFosters] = useState<Foster[]>([])
    const [filteredFosters, setFilteredFosters] = useState<Foster[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Search và filter states
    const [searchTerm, setSearchTerm] = useState("")
    const [sortOption, setSortOption] = useState<"name" | "none">("none")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([])

    // Lấy danh sách các quận từ dữ liệu
    const getDistricts = (fosters: Foster[]): string[] => {
        const districts = fosters.map((foster) => {
            // Nếu có field district, sử dụng nó
            if (foster.district) return foster.district

            // Nếu không có district, thử trích xuất từ địa chỉ
            try {
                // Giả sử địa chỉ có format: "Số nhà, Quận/Huyện, Thành phố"
                const addressParts = foster.address.split(", ")
                if (addressParts.length > 1) {
                    // Lấy phần thứ hai của địa chỉ (thường là quận/huyện)
                    const districtPart = addressParts[1]
                    // Kiểm tra xem có chứa từ "Quận" hoặc "Huyện" không
                    if (districtPart.includes("Quận") || districtPart.includes("Huyện")) {
                        return districtPart
                    }
                }
            } catch (e) {
                console.log("Error extracting district from address", e)
            }

            // Nếu không thể trích xuất, trả về "Khác"
            return "Khác"
        })

        // Loại bỏ các giá trị trùng lặp
        return [...new Set(districts)]
    }

    const [districts, setDistricts] = useState<string[]>([])

    // Fetch dữ liệu
    useEffect(() => {
        const fetchFosters = async () => {
            setIsLoading(true)
            try {
                const response = await getFosters()
                const validFosters = response.data.filter(
                    (foster: Foster) => foster.name !== "string" && foster.address !== "string",
                )
                setFosters(validFosters)
                setFilteredFosters(validFosters)
                setDistricts(getDistricts(validFosters))
            } catch (err) {
                console.error("Error fetching fosters:", err)
                setError("Không thể tải danh sách trạm cứu trợ. Vui lòng thử lại sau.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchFosters()
    }, [])

    // Áp dụng search, sort và filter
    useEffect(() => {
        let result = [...fosters]

        // Áp dụng search
        if (searchTerm) {
            result = result.filter(
                (foster) =>
                    foster.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    foster.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    foster.address.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        // Áp dụng filter theo quận
        if (selectedDistricts.length > 0) {
            result = result.filter((foster) => {
                // Nếu có field district, sử dụng nó
                if (foster.district) {
                    return selectedDistricts.includes(foster.district)
                }

                // Nếu không có district, thử trích xuất từ địa chỉ
                try {
                    const addressParts = foster.address.split(", ")
                    if (addressParts.length > 1) {
                        const districtPart = addressParts[1]
                        if (districtPart.includes("Quận") || districtPart.includes("Huyện")) {
                            return selectedDistricts.includes(districtPart)
                        }
                    }
                } catch (e) {
                    console.log("Error extracting district from address", e)
                }

                // Nếu không thể trích xuất, kiểm tra xem "Khác" có được chọn không
                return selectedDistricts.includes("Khác")
            })
        }

        // Áp dụng sort
        if (sortOption !== "none") {
            result.sort((a, b) => {
                if (sortOption === "name") {
                    return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
                }
                return 0
            })
        }

        setFilteredFosters(result)
    }, [fosters, searchTerm, sortOption, sortDirection, selectedDistricts])

    // Xử lý thay đổi sort
    const handleSortChange = (option: "name" | "none") => {
        if (sortOption === option) {
            // Nếu đang chọn cùng option, đổi hướng sort
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            // Nếu chọn option mới, set option và reset hướng sort
            setSortOption(option)
            setSortDirection("asc")
        }
    }

    // Xử lý thay đổi filter quận
    const handleDistrictChange = (district: string) => {
        setSelectedDistricts((prev) => (prev.includes(district) ? prev.filter((d) => d !== district) : [...prev, district]))
    }

    // Reset tất cả filter
    const resetFilters = () => {
        setSearchTerm("")
        setSortOption("none")
        setSortDirection("asc")
        setSelectedDistricts([])
    }

    // Hiển thị skeleton khi đang loading
    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="mb-8">
                    <Skeleton className="h-12 w-full mb-4" />
                    <div className="flex gap-4 mb-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-64 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        )
    }

    // Hiển thị lỗi
    if (error) {
        return (
            <div className="container mx-auto py-16 px-4 text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
                <Button onClick={() => window.location.reload()}>Tải lại trang</Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Trạm Cứu Trợ Đối Tác</h1>
                <p className="text-gray-600 mb-6">
                    Khám phá các trạm cứu trợ động vật đối tác với Pawbloom, nơi bạn có thể tìm hiểu thêm về việc nhận nuôi và hỗ
                    trợ.
                </p>

                {/* Search và Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Tìm kiếm theo tên, địa chỉ hoặc mô tả..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                        {searchTerm && (
                            <button
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setSearchTerm("")}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="min-w-[140px]">
                                <Filter className="mr-2 h-4 w-4" />
                                Bộ lọc
                                {selectedDistricts.length > 0 && (
                                    <Badge variant="secondary" className="ml-2">
                                        {selectedDistricts.length}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Bộ lọc</SheetTitle>
                                <SheetDescription>Lọc danh sách trạm cứu trợ theo các tiêu chí</SheetDescription>
                            </SheetHeader>

                            <div className="py-4">
                                <h3 className="text-sm font-medium mb-2">Quận/Huyện</h3>
                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                    {districts.map((district) => (
                                        <div key={district} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`district-${district}`}
                                                checked={selectedDistricts.includes(district)}
                                                onChange={() => handleDistrictChange(district)}
                                                className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                                            />
                                            <label htmlFor={`district-${district}`} className="ml-2 text-sm">
                                                {district}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button variant="outline" onClick={resetFilters}>
                                        Đặt lại
                                    </Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button>Áp dụng</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="min-w-[140px]">
                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                Sắp xếp
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleSortChange("name")}>
                                Theo tên {sortOption === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSortChange("none")}>Mặc định</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Filter Indicators */}
                {(searchTerm || selectedDistricts.length > 0 || sortOption !== "none") && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {searchTerm && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                                Tìm kiếm: {searchTerm}
                                <button onClick={() => setSearchTerm("")}>
                                    <X size={14} />
                                </button>
                            </Badge>
                        )}

                        {selectedDistricts.map((district) => (
                            <Badge key={district} variant="secondary" className="flex items-center gap-1">
                                {district}
                                <button onClick={() => handleDistrictChange(district)}>
                                    <X size={14} />
                                </button>
                            </Badge>
                        ))}

                        {sortOption !== "none" && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                                Sắp xếp: {sortOption === "name" ? "Theo tên" : ""} {sortDirection === "asc" ? "↑" : "↓"}
                                <button onClick={() => setSortOption("none")}>
                                    <X size={14} />
                                </button>
                            </Badge>
                        )}

                        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-6">
                            Xóa tất cả
                        </Button>
                    </div>
                )}

                {/* Results Count */}
                <p className="text-sm text-gray-500">
                    Hiển thị {filteredFosters.length} trên tổng số {fosters.length} trạm
                </p>
            </div>

            {/* Foster Cards */}
            {filteredFosters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFosters.map((foster, index) => (
                        <Card key={index} className="h-full flex flex-col">
                            <CardHeader>
                                <CardTitle className="line-clamp-1">{foster.name}</CardTitle>
                                <CardDescription className="flex items-start gap-1">
                                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-400" />
                                    <span>{foster.address}</span>
                                </CardDescription>
                                {foster.district && (
                                    <Badge variant="outline" className="mt-2">
                                        {foster.district}
                                    </Badge>
                                )}
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-gray-600 line-clamp-3 mb-4">{foster.description}</p>
                                <Separator className="my-4" />
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <a href={`mailto:${foster.contactEmail}`} className="text-sm text-brand hover:underline">
                                            {foster.contactEmail}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <a href={`tel:${foster.contactPhone}`} className="text-sm">
                                            {foster.contactPhone}
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <a href={foster.websiteUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                                    <Button variant="outline" className="w-full">
                                        <Globe className="mr-2 h-4 w-4" />
                                        Truy cập website
                                    </Button>
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">Không tìm thấy kết quả</h3>
                    <p className="text-gray-500 mb-4">Không có trạm cứu trợ nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
                    <Button onClick={resetFilters}>Xóa bộ lọc</Button>
                </div>
            )}
        </div>
    )
}

