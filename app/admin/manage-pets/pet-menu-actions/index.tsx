'use client'

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Pet } from "@/types/pet"

interface PetMenuDropdownProps {
	pet: Pet
	onEdit: (pet: Pet) => void
	onDelete: (pet: Pet) => void
}

export default function PetMenuDropdown({ pet, onEdit, onDelete }: PetMenuDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="size-8 p-0">
					<span className="sr-only">Mở menu</span>
					<MoreHorizontal className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					className="flex cursor-pointer items-center gap-2"
					onClick={() => onEdit(pet)}
				>
					<Pencil className="size-4" />
					<span>Chỉnh sửa</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex cursor-pointer items-center gap-2 text-red-600 focus:text-red-600"
					onClick={() => onDelete(pet)}
				>
					<Trash2 className="size-4" />
					<span>Xóa</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
