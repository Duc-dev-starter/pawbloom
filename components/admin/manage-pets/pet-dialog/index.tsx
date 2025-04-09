"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PetForm } from "../pet-form"
import type { Pet } from "@/types/pet"

interface PetDialogProps {
	isOpen: boolean
	onClose: () => void
	pet?: Pet
	onSuccess: () => void
}

export function PetDialog({ isOpen, onClose, pet, onSuccess }: PetDialogProps) {
	const handleSuccess = () => {
		onSuccess()
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="w-full">
				<DialogHeader>
					<DialogTitle>{pet ? `Chỉnh sửa thú cưng: ${pet.name}` : "Thêm thú cưng mới"}</DialogTitle>
				</DialogHeader>
				<PetForm pet={pet} onSuccess={handleSuccess} onCancel={onClose} />
			</DialogContent>
		</Dialog>
	)
}
