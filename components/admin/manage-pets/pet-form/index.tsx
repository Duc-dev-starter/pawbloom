"use client"

import type React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect, useState, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import type { Pet } from "@/types/pet"
import { createPet, updatePet, updatePetImageAction } from '../pet-action/pet-actions'
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

const petFormSchema = z.object({
	name: z.string().min(1, { message: "Tên thú cưng không được để trống" }),
	breed: z.string().min(1, { message: "Giống thú cưng không được để trống" }),
	price: z.coerce.number().min(0, { message: "Giá không được âm" }),
	age: z.coerce.number().min(0, { message: "Tuổi không được âm" }),
	weight: z.coerce.number().min(0, { message: "Cân nặng không được âm" }),
	status: z.enum(["Available", "Adopted", "Pending"]),
	gender: z.enum(["Male", "Female"]),
	size: z.enum(["Small", "Medium", "Large"]),
	color: z.string().min(1, { message: "Màu sắc không được để trống" }),
	description: z.string().optional(),
	photoURL: z.string().optional(),
	neutering: z.boolean().default(false),
	humanFriendly: z.boolean().default(false),
	dietarySpecific: z.boolean().default(false),
	rabiesVaccination: z.boolean().default(false),
	dogFriendly: z.boolean().default(false),
	pottyCare: z.boolean().default(false),
	vaccinations: z.boolean().default(false),
	catFriendly: z.boolean().default(false),
})

type PetFormValues = z.infer<typeof petFormSchema>

interface PetFormProps {
	pet?: Pet
	onSuccess: () => void
	onCancel: () => void
}

export function PetForm({ pet, onSuccess, onCancel }: PetFormProps) {
	const { toast } = useToast()
	const isEditing = !!pet
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const form = useForm<PetFormValues>({
		resolver: zodResolver(petFormSchema),
		defaultValues: {
			name: "",
			breed: "",
			price: 0,
			age: 0,
			weight: 0,
			status: "Available",
			gender: "Male",
			size: "Medium",
			color: "",
			description: "",
			photoURL: "",
			neutering: false,
			humanFriendly: false,
			dietarySpecific: false,
			rabiesVaccination: false,
			dogFriendly: false,
			pottyCare: false,
			vaccinations: false,
			catFriendly: false,
		},
	})

	useEffect(() => {
		if (pet) {
			form.reset({
				name: pet.name,
				breed: pet.breed,
				price: pet.price,
				age: pet.age,
				weight: pet.weight || 0,
				status: pet.status as any,
				gender: pet.gender as any,
				size: pet.size as any,
				color: pet.color || "",
				description: pet.description || "",
				photoURL: pet.photoURL || "",
				neutering: pet.neutering || false,
				humanFriendly: pet.humanFriendly || false,
				dietarySpecific: pet.dietarySpecific || false,
				rabiesVaccination: pet.rabiesVaccination || false,
				dogFriendly: pet.dogFriendly || false,
				pottyCare: pet.pottyCare || false,
				vaccinations: pet.vaccinations || false,
				catFriendly: pet.catFriendly || false,
			})

			if (pet.photoURL) {
				setPreviewUrl(pet.photoURL)
			}
		}
	}, [pet, form])

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setImageFile(file)
			const reader = new FileReader()
			reader.onloadend = () => {
				setPreviewUrl(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	async function onSubmit(data: PetFormValues) {
		try {
			if (isEditing) {
				// Update pet data first
				const formData = new FormData()
				Object.entries(data).forEach(([key, value]) => {
					formData.append(key, value.toString())
				})

				const result = await updatePet(pet.id, formData)

				if (!result.success) {
					toast({
						variant: "destructive",
						title: "Lỗi cập nhật",
						description: result.error,
					})
					return
				}

				// If image was changed, upload it separately
				if (imageFile) {
					const imageResult = await updatePetImageAction(pet.id, imageFile)

					if (!imageResult.success) {
						toast({
							variant: "destructive",
							title: "Lỗi cập nhật ảnh",
							description: "Không thể cập nhật ảnh thú cưng",
						})
					}
				}

				toast({
					title: "Cập nhật thành công",
					description: `Thú cưng ${data.name} đã được cập nhật`,
				})
				onSuccess()
			} else {
				// For new pets
				const formData = new FormData()
				Object.entries(data).forEach(([key, value]) => {
					formData.append(key, value.toString())
				})

				// Add image file if available
				if (imageFile) {
					formData.append("imageFile", imageFile)
				}

				const result = await createPet(formData)

				if (result) {
					toast({
						title: "Thêm mới thành công",
						description: `Thú cưng ${data.name} đã được thêm mới`,
					})
					onSuccess()
				} else {
					toast({
						variant: "destructive",
						title: "Lỗi thêm mới",
						description: result.error,
					})
				}
			}
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Đã xảy ra lỗi",
				description: "Vui lòng thử lại sau",
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tên thú cưng</FormLabel>
									<FormControl>
										<Input placeholder="Nhập tên thú cưng" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="breed"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Giống</FormLabel>
									<FormControl>
										<Input placeholder="Nhập giống thú cưng" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Giá (VNĐ)</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="age"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tuổi</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="weight"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cân nặng (kg)</FormLabel>
										<FormControl>
											<Input type="number" step="0.1" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="color"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Màu sắc</FormLabel>
										<FormControl>
											<Input placeholder="Nhập màu sắc" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-3 gap-4">
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Trạng thái</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Chọn trạng thái" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Available">Có sẵn</SelectItem>
												<SelectItem value="Adopted">Đã nhận nuôi</SelectItem>
												<SelectItem value="Pending">Đang chờ</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="gender"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Giới tính</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Chọn giới tính" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Male">Đực</SelectItem>
												<SelectItem value="Female">Cái</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="size"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Kích thước</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Chọn kích thước" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Small">Nhỏ</SelectItem>
												<SelectItem value="Medium">Trung bình</SelectItem>
												<SelectItem value="Large">Lớn</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mô tả</FormLabel>
									<FormControl>
										<Textarea placeholder="Nhập mô tả về thú cưng" className="resize-none" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="space-y-6">
						<div className="space-y-2">
							<FormLabel>Hình ảnh thú cưng</FormLabel>
							<div className="flex flex-col items-center gap-4">
								{previewUrl && (
									<div className="relative h-48 w-full overflow-hidden rounded-md">
										<Image src={previewUrl || "/placeholder.svg"} alt="Pet preview" fill className="object-cover" />
									</div>
								)}
								<Input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="w-full"
								/>
								<FormDescription>
									{isEditing ? "Tải lên ảnh mới để thay đổi ảnh hiện tại" : "Tải lên ảnh thú cưng"}
								</FormDescription>
							</div>
						</div>

						<FormField
							control={form.control}
							name="photoURL"
							render={({ field }) => (
								<FormItem>
									<FormLabel>URL ảnh (tùy chọn)</FormLabel>
									<FormControl>
										<Input placeholder="Nhập URL ảnh" {...field} />
									</FormControl>
									<FormDescription>Bạn có thể nhập URL ảnh thay vì tải lên</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="space-y-4 mt-6">
							<h3 className="font-medium">Đặc điểm thú cưng</h3>
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="neutering"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>Đã triệt sản</FormLabel>
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="humanFriendly"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>Thân thiện với người</FormLabel>
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="dietarySpecific"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>Chế độ ăn đặc biệt</FormLabel>
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="rabiesVaccination"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>Tiêm phòng dại</FormLabel>
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="dogFriendly"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>Thân thiện với chó</FormLabel>
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="pottyCare"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>Đã huấn luyện vệ sinh</FormLabel>
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="vaccinations"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>Đã tiêm phòng</FormLabel>
											</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="catFriendly"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>Thân thiện với mèo</FormLabel>
											</div>
										</FormItem>
									)}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="flex justify-end space-x-2">
					<Button variant="outline" type="button" onClick={onCancel}>
						Hủy
					</Button>
					<Button type="submit">{isEditing ? "Cập nhật" : "Thêm mới"}</Button>
				</div>
			</form>
		</Form>
	)
}
