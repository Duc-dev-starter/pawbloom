"use client"

import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { LuGitPullRequestDraft } from 'react-icons/lu'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Status } from '@/types/status'

type StatusDropdownProps = {
	selectedStatuses: string[];
	setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>;
	statuses: Status[];
}

const StatusDropdown = ({ selectedStatuses, setSelectedStatuses, statuses }: StatusDropdownProps) => {
	const [open, setOpen] = useState(false);

	// Define colors for pet statuses
	const statusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case 'available':
				return 'text-green-600 bg-green-100';
			case 'adopted':
				return 'text-blue-600 bg-blue-100';
			case 'pending':
				return 'text-gray-600 bg-gray-200';
			default:
				return 'text-gray-600 bg-gray-200';
		}
	}

	const handleCheckboxChange = (value: string) => {
		setSelectedStatuses((prev) => {
			const updatedStatuses = prev.includes(value)
				? prev.filter((status) => status !== value)
				: [...prev, value];
			return updatedStatuses;
		});
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
										value={status.value}
									>
										<Checkbox
											checked={selectedStatuses.includes(status.value)}
											onCheckedChange={() => handleCheckboxChange(status.value)}
											className='size-4 rounded-[4px]'
										/>
										<div className={`flex items-center gap-1 ${statusColor(status.value)} rounded-lg p-1 px-4 text-sm`}>
											{status.icon}
											{status.label}
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

export default StatusDropdown;