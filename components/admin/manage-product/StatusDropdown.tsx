"use client"
import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { FaInbox } from 'react-icons/fa'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { LuGitPullRequestDraft } from 'react-icons/lu'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'

type Status = {
    value: string;
    label: string;
    icon: React.ReactNode;
}

const statuses: Status[] = [
    {
        value: 'published',
        label: 'Công khai',
        icon: <FaCheck />
    },
    {
        value: 'inactive',
        label: 'Ngưng bán',
        icon: <IoClose />
    },
    {
        value: 'draft',
        label: 'Nháp',
        icon: <FaInbox />
    },
]

type StatusDropdownProps = {
    selectedStatuses: string[];
    setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>;
}

const StatusDropdown = ({ selectedStatuses, setSelectedStatuses }: StatusDropdownProps) => {
    const [open, setOpen] = useState(false);

    const statusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'text-green-600 bg-green-100';
            case 'inactive':
                return 'text-red-600 bg-red-100';
            case 'draft':
                return 'text-gray-600 bg-gray-100';
            default:
                break;
        }
    }

    const handleCheckboxChange = (value: string) => {
        setSelectedStatuses((prev) => {
            const updatedStatuses = prev.includes(value)
                ? prev.filter((status) => status !== value)
                : [...prev, value];

            return updatedStatuses;
        })
    }

    const clearFilter = () => {
        setSelectedStatuses([]);
    }

    return (
        <div className='flex items-center space-x-4'>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant={"secondary"} className='h-10'>
                        <LuGitPullRequestDraft /> Trạng thái
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-48 p-0' side='bottom' align='center'>
                    <Command className='p-1'>
                        <CommandList>
                            <CommandGroup>
                                {statuses.map((status) => (
                                    <CommandItem
                                        className='mb-2 h-10'
                                        key={status.value}
                                        value={status.value}>
                                        <Checkbox
                                            checked={selectedStatuses.includes(status.value)}
                                            onCheckedChange={() => handleCheckboxChange(status.value)}
                                            className='size-4 rounded-[4px]' />
                                        <div className={`flex items-center gap-1 ${statusColor(status.value)} rounded-lg p-1 px-4 text-sm`}>
                                            {status.icon}{status.label}
                                        </div>
                                    </CommandItem>

                                ))}
                            </CommandGroup>
                        </CommandList>
                        <div className='flex flex-col gap-2 text-[23px]'>
                            <Separator />
                            <Button onClick={clearFilter} variant={"ghost"} className='mb-1 text-sm'>
                                Xóa bộ lọc
                            </Button>
                        </div>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default StatusDropdown