import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Blog } from '@/types/blog';
import React, { SetStateAction, useEffect } from 'react'

const BlogSelectCategory = ({ selectedCategory, setSelectedCategory }: { selectedCategory: string, setSelectedCategory: React.Dispatch<SetStateAction<Blog["category"]>> }) => {
    const categories = [
        "dog-food",
        "cat-food",
    ]

    useEffect(() => {
        setSelectedCategory("cat-food");
    }, [])

    const handleValueChange = (value: string) => {
        setSelectedCategory(value as Blog["category"]);
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