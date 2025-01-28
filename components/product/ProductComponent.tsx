"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProductList from "./ProductList";

const ProductComponent = () => {
    const router = useRouter();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Handle selecting a category
    const handleCategoryChange = (category: string) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((item) => item !== category)
            : [...selectedCategories, category];

        setSelectedCategories(updatedCategories);

        // Update query params in URL
        const query = updatedCategories.map((cat) => `category=${cat}`).join("&");
        router.push(`?${query}`);
    };

    // Clear all selected categories
    const handleClearAll = () => {
        setSelectedCategories([]);
        router.push("");
    };

    // Handle removing a specific tag
    const handleRemoveTag = (category: string) => {
        const updatedCategories = selectedCategories.filter((item) => item !== category);
        setSelectedCategories(updatedCategories);

        const query = updatedCategories.map((cat) => `category=${cat}`).join("&");
        router.push(`?${query}`);
    };

    return (
        <>
            <div className="flex flex-col gap-4 p-6 lg:flex-row lg:gap-10">
                {/* Sidebar */}
                <div className="min-w-[250px] mt-5">
                    <Accordion type="single" collapsible className="w-full">
                        {/* Categories Accordion */}
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
                                        Chó
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            value="cat"
                                            checked={selectedCategories.includes("cat")}
                                            onChange={() => handleCategoryChange("cat")}
                                        />
                                        Mèo
                                    </label>
                                </div>
                            </AccordionContent>
                        </AccordionItem>


                        {/* Brands Accordion */}
                        <AccordionItem value="brands">
                            <AccordionTrigger>Brands</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            value="brand-a"
                                            checked={selectedCategories.includes("brand-a")}
                                            onChange={() => handleCategoryChange("brand-a")}
                                        />
                                        Brand A
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            value="brand-b"
                                            checked={selectedCategories.includes("brand-b")}
                                            onChange={() => handleCategoryChange("brand-b")}
                                        />
                                        Brand B
                                    </label>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <h1 className="ml-12 h1 mb-4">Sản phẩm</h1>

                    {/* Tags */}
                    {selectedCategories.length > 0 && (
                        <div className="ml-12 flex flex-wrap gap-2">
                            <Button variant="destructive" size="sm" onClick={handleClearAll}>
                                Xóa hết
                            </Button>
                            {selectedCategories.map((category) => (
                                <Badge
                                    key={category}
                                    className="cursor-pointer"
                                    onClick={() => handleRemoveTag(category)}
                                >
                                    {category} <span className="ml-2">×</span>
                                </Badge>
                            ))}
                        </div>
                    )}

                    <ProductList />
                </div>
            </div>
        </>
    );
};

export default ProductComponent;
