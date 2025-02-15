"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import ProductList from "./ProductList";

const ProductComponent = () => {
    const router = useRouter();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest"); // Trạng thái sort

    // Xử lý chọn danh mục
    const handleCategoryChange = (category: string) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((item) => item !== category)
            : [...selectedCategories, category];

        setSelectedCategories(updatedCategories);

        const query = new URLSearchParams({ sort: sortOrder });
        updatedCategories.forEach((cat) => query.append("category", cat));
        router.push(`?${query.toString()}`);
    };

    // Xử lý xóa tất cả danh mục
    const handleClearAll = () => {
        setSelectedCategories([]);
        router.push(`?sort=${sortOrder}`);
    };

    // Xử lý chọn chế độ sắp xếp
    const handleSortChange = (order: "newest" | "oldest") => {
        setSortOrder(order);
        const query = new URLSearchParams({ sort: order });
        selectedCategories.forEach((cat) => query.append("category", cat));
        router.push(`?${query.toString()}`);
    };

    return (
        <div className="flex flex-col gap-4 p-6 lg:flex-row lg:gap-10">
            {/* Sidebar */}
            <div className="min-w-[250px] mt-5">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="categories">
                        <AccordionTrigger>Categories</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value="dog"
                                        checked={selectedCategories.includes("dog")}
                                        onChange={() => handleCategoryChange("dog")}
                                    />
                                    dog
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value="cat"
                                        checked={selectedCategories.includes("cat")}
                                        onChange={() => handleCategoryChange("cat")}
                                    />
                                    cat
                                </label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <div className="flex justify-between items-center mb-4 ml-12">
                    <h1 className="h1 mt-3">Sản phẩm</h1>

                    {/* Dropdown Sort */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Sắp xếp: {sortOrder === "newest" ? "Mới nhất" : "Cũ nhất"}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleSortChange("newest")}>
                                Ngày mới nhất
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSortChange("oldest")}>
                                Ngày cũ nhất
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Tags */}
                {selectedCategories.length > 0 && (
                    <div className="ml-12 flex flex-wrap gap-2">
                        <Button variant="destructive" size="sm" onClick={handleClearAll}>
                            Xóa hết
                        </Button>
                        {selectedCategories.map((category) => (
                            <Badge key={category} className="cursor-pointer" onClick={() => handleCategoryChange(category)}>
                                {category} <span className="ml-2">×</span>
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Truyền sortOrder vào ProductList */}
                <ProductList sortOrder={sortOrder} />
            </div>
        </div>
    );
};

export default ProductComponent;
