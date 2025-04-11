"use client"

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deletePet } from "@/services/application"
import { useToast } from "@/hooks/use-toast"

interface DeletePetDialogProps {
	isOpen: boolean
	onClose: () => void
	petId: string
	petName: string
	onSuccess: () => void
}

export function DeletePetDialog({ isOpen, onClose, petId, petName, onSuccess }: DeletePetDialogProps) {
	const { toast } = useToast()

	const handleDelete = async () => {
		try {
			const result = await deletePet(petId)

			if (result) {
				toast({
					title: "Xóa thành công",
					description: `Thú cưng ${petName} đã được xóa`,
				})
				onSuccess()
			} else {
				toast({
					variant: "destructive",
					title: "Lỗi xóa",
					description: result,
				})
			}
		} catch (error) {
			console.log('====================================');
			console.log(error);
			console.log('====================================');
			toast({
				variant: "destructive",
				title: "Đã xảy ra lỗi",
				description: "Vui lòng thử lại sau",
			})
		} finally {
			onClose()
		}
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
					<AlertDialogDescription>
						Thao tác này sẽ xóa thú cưng <strong>{petName}</strong> và không thể hoàn tác.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Hủy</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
						Xóa
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
