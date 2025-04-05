"use client"
import React, { useState } from 'react'
import { LuGitPullRequestDraft } from 'react-icons/lu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Category } from '@/types/category'

const categories: Category[] = [
    {
        id: "1",
        name: "Thức ăn cho chó",
        createdAt: "2023-12-01T12:00:00Z",
        updatedAt: "2023-12-01T12:00:00Z",
        author: '',
        status: 'Published',
        description: ''
    },
    {
        id: "2",
        name: "Thức ăn cho mèo",
        createdAt: "2023-12-01T12:00:00Z",
        updatedAt: "2023-12-01T12:00:00Z",
        author: '',
        status: 'Published',
        description: ''
    },
    {
        id: "3",
        name: "Phụ kiện cho chó",
        createdAt: "2023-12-01T12:00:00Z",
        updatedAt: "2023-12-01T12:00:00Z",
        author: '',
        status: 'Published',
        description: ''
    },
    {
        id: "4",
        name: "Phụ kiện cho mèo",
        createdAt: "2023-12-01T12:00:00Z",
        updatedAt: "2023-12-01T12:00:00Z",
        author: '',
        status: 'Published',
        description: ''
    },
]

type CategoriesDropdownProps = {
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategoryDropdown = ({ selectedCategories, setSelectedCategories }: CategoriesDropdownProps) => {
    const [open, setOpen] = useState(false);

    const handleCheckboxChange = (value: string) => {
        setSelectedCategories((prev) => {
            const updatedCategories = prev.includes(value)
                ? prev.filter((category) => category !== value)
                : [...prev, value];

            return updatedCategories;
        })
    }

    const clearFilters = () => {
        setSelectedCategories([]);
    }

    return (
        <div className='flex items-center space-x-4'>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="secondary" className='h-10'>
                        <LuGitPullRequestDraft />
                        Danh mục
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-56 p-0' side='bottom' align='end'>
                    <Command className='p-1'>
                        <CommandInput placeholder='Danh mục' />
                        <CommandList>
                            <CommandEmpty className='p-5 text-center text-sm text-slate-500'>
                                Không có danh mục nào được tìm
                            </CommandEmpty>
                            <CommandGroup>
                                {categories.map(category => (
                                    <CommandItem key={category.name} value={category.name}>
                                        <Checkbox className='size-4 rounded-[4px]'
                                            checked={selectedCategories.includes(category.name)}
                                            onClick={() => handleCheckboxChange(category.name)}
                                        />
                                        <div className='flex items-center gap-1 rounded-lg p-1 px-3 text-sm'>
                                            {category.name}
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                        <div className='flex flex-col gap-2 text-[23px]'>
                            <Separator />
                            <Button onClick={clearFilters} variant="ghost" className='mb-1 text-sm'>Xóa bộ lọc</Button>
                        </div>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default CategoryDropdown