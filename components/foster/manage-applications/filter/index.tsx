"use client"

import type React from "react"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ApplicationFilterAreaProps {
	selectedStatuses: string[]
	setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>
	selectedPets: string[]
	setSelectedPets: React.Dispatch<React.SetStateAction<string[]>>
}

const ApplicationFilterArea = ({
	selectedStatuses,
	setSelectedStatuses,
	selectedPets,
	setSelectedPets,
}: ApplicationFilterAreaProps) => {
	// Remove a status filter
	const handleRemoveStatus = (status: string) => {
		setSelectedStatuses(selectedStatuses.filter((s) => s !== status))
	}

	// Remove a pet filter
	const handleRemovePet = (pet: string) => {
		setSelectedPets(selectedPets.filter((p) => p !== pet))
	}

	// Clear all filters
	const handleClearAll = () => {
		setSelectedStatuses([])
		setSelectedPets([])
	}

	// If no filters are selected, don't render anything
	if (selectedStatuses.length === 0 && selectedPets.length === 0) {
		return null
	}

	return (
		<div className="flex flex-wrap items-center gap-2">
			{selectedStatuses.map((status) => (
				<Badge key={status} variant="secondary" className="flex items-center gap-1">
					{status}
					<Button variant="ghost" size="sm" className="h-4 w-4 p-0" onClick={() => handleRemoveStatus(status)}>
						<X className="h-3 w-3" />
						<span className="sr-only">Remove {status} filter</span>
					</Button>
				</Badge>
			))}

			{selectedPets.map((pet) => (
				<Badge key={pet} variant="secondary" className="flex items-center gap-1">
					{pet}
					<Button variant="ghost" size="sm" className="h-4 w-4 p-0" onClick={() => handleRemovePet(pet)}>
						<X className="h-3 w-3" />
						<span className="sr-only">Remove {pet} filter</span>
					</Button>
				</Badge>
			))}

			{(selectedStatuses.length > 0 || selectedPets.length > 0) && (
				<Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={handleClearAll}>
					Xóa tất cả
				</Button>
			)}
		</div>
	)
}

export default ApplicationFilterArea
