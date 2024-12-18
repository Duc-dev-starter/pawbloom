"use client"
import React, { useState } from 'react'
import { LuGitPullRequestDraft } from 'react-icons/lu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { User } from '@/types/user'

const authors: User[] = [
    {
        id: "1",
        name: 'John',
        createdAt: "2023-12-01T12:00:00Z",
        updatedAt: "2023-12-01T12:00:00Z",
    },
    {
        id: "2",
        name: 'John2',
        createdAt: "2023-12-01T12:00:00Z",
        updatedAt: "2023-12-01T12:00:00Z",
    },
    {
        id: "3",
        name: 'John3',
        createdAt: "2023-12-01T12:00:00Z",
        updatedAt: "2023-12-01T12:00:00Z",
    },
    {
        id: "4",
        name: 'John4',
        createdAt: "2023-12-01T12:00:00Z",
        updatedAt: "2023-12-01T12:00:00Z",
    },
]

type AuthorDropdownProps = {
    selectedAuthor: string[];
    setSelectedAuthor: React.Dispatch<React.SetStateAction<string[]>>;
}

const AuthorDropdown = ({ selectedAuthor, setSelectedAuthor }: AuthorDropdownProps) => {
    const [open, setOpen] = useState(false);

    const handleCheckboxChange = (value: string) => {
        setSelectedAuthor((prev) => {
            const updatedAuthor = prev.includes(value)
                ? prev.filter((category) => category !== value)
                : [...prev, value];

            return updatedAuthor;
        })
    }

    const clearFilters = () => {
        setSelectedAuthor([]);
    }

    return (
        <div className='flex items-center space-x-4'>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="secondary" className='h-10'>
                        <LuGitPullRequestDraft />
                        Tác giả
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-56 p-0' side='bottom' align='end'>
                    <Command className='p-1'>
                        <CommandInput placeholder='Tác giả' />
                        <CommandList>
                            <CommandEmpty className='p-5 text-center text-sm text-slate-500'>
                                Không có tác giả nào được tìm
                            </CommandEmpty>
                            <CommandGroup>
                                {authors.map(author => (
                                    <CommandItem key={author.name} value={author.name}>
                                        <Checkbox className='size-4 rounded-[4px]'
                                            checked={selectedAuthor.includes(author.name)}
                                            onClick={() => handleCheckboxChange(author.name)}
                                        />
                                        <div className='flex items-center gap-1 rounded-lg p-1 px-3 text-sm'>
                                            {author.name}
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

export default AuthorDropdown