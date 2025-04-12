"use client"

import type React from "react"

import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Status } from "@/types/status"

interface StatusDropdownProps {
	selectedStatuses: string[]
	setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>
	statuses: Status[]
}

export function StatusDropdown({ selectedStatuses, setSelectedStatuses, statuses }: StatusDropdownProps) {
	const toggleStatus = (value: string) => {
		if (selectedStatuses.includes(value)) {
			setSelectedStatuses(selectedStatuses.filter((status) => status !== value))
		} else {
			setSelectedStatuses([...selectedStatuses, value])
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" className="w-[200px] justify-between">
					{selectedStatuses.length > 0 ? `${selectedStatuses.length} trạng thái` : "Trạng thái"}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Tìm trạng thái..." />
					<CommandList>
						<CommandEmpty>Không tìm thấy trạng thái.</CommandEmpty>
						<CommandGroup>
							{statuses.map((status) => (
								<CommandItem key={status.value} value={status.value} onSelect={() => toggleStatus(status.value)}>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											selectedStatuses.includes(status.value) ? "opacity-100" : "opacity-0",
										)}
									/>
									<div className="flex items-center gap-2">
										{status.icon}
										{status.label}
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
