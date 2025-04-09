import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCategories } from '@/services/category';
import { Blog } from '@/types/blog';
import { Category } from '@/types/category';
import React, { SetStateAction, useEffect, useState } from 'react'

const BlogSelectCategory = ({ selectedCategory, setSelectedCategory }: { selectedCategory: string, setSelectedCategory: React.Dispatch<SetStateAction<Blog["categoryName"]>> }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setSelectedCategory("cat-food");
    }, [])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                if (response.data) {
                    const categoryNames = response.data.map((category: Category) => category.name);
                    setCategories(categoryNames);
                    setSelectedCategory(categoryNames[0]);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [setSelectedCategory]);

    const handleValueChange = (value: string) => {
        setSelectedCategory(value as Blog["categoryName"]);
    }

    return (
        <div className='mt-5 flex flex-col gap-2'>
            <Label className='text-slate-600'>Danh mục tin tức</Label>
            <Select value={selectedCategory} onValueChange={handleValueChange}>
                <SelectTrigger className='h-[45px] shadow-none'>
                    <SelectValue placeholder="Lựa chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                            {category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default BlogSelectCategory