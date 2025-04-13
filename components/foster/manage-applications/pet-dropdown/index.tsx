"use client"

import type React from "react"

import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Pet } from "@/types/pet"

interface PetDropdownProps {
	selectedPets: string[]
	setSelectedPets: React.Dispatch<React.SetStateAction<string[]>>
	pets: Pet[]
}

export function PetDropdown({ selectedPets, setSelectedPets, pets }: PetDropdownProps) {
	const togglePet = (value: string) => {
		if (selectedPets.includes(value)) {
			setSelectedPets(selectedPets.filter((pet) => pet !== value))
		} else {
			setSelectedPets([...selectedPets, value])
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" className="w-[200px] justify-between">
					{selectedPets.length > 0 ? `${selectedPets.length} thú cưng` : "Thú cưng"}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Tìm thú cưng..." />
					<CommandList>
						<CommandEmpty>Không tìm thấy thú cưng.</CommandEmpty>
						<CommandGroup>
							{pets.map((pet) => (
								<CommandItem key={pet.id} value={pet.name} onSelect={() => togglePet(pet.name)}>
									<Check
										className={cn("mr-2 h-4 w-4", selectedPets.includes(pet.name) ? "opacity-100" : "opacity-0")}
									/>
									{pet.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
