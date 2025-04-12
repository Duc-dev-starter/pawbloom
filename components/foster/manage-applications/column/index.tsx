"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Application } from "@/types/foster-application"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Check, X, Clock } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { updateApplicationStatus } from "@/services/application"
import { toast } from "@/hooks/use-toast"

export const columns: ColumnDef<Application>[] = [
	{
		accessorKey: "applicationId",
		header: "ID",
		cell: ({ row }) => {
			const id = row.getValue("applicationId") as string
			return <div className="font-medium">{id.substring(0, 8)}...</div>
		},
	},
	{
		accessorKey: "pet",
		header: "Thú cưng",
		cell: ({ row }) => {
			const pet = row.getValue("pet") as Application["pet"]
			return (
				<div className="flex items-center gap-2">
					<Avatar className="h-8 w-8">
						<AvatarImage src={pet.photoURL || "/placeholder.svg"} alt={pet.name} />
						<AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="font-medium">{pet.name}</div>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			const pet = row.getValue(id) as Application["pet"]
			return value.includes(pet.name.toLowerCase())
		},
	},
	{
		accessorKey: "user",
		header: "Người nhận nuôi",
		cell: ({ row }) => {
			const user = row.getValue("user") as Application["user"]
			return (
				<div className="flex items-center gap-2">
					<Avatar className="h-8 w-8">
						<AvatarImage src={user.profilePictureUrl || "/placeholder.svg"} alt={user.fullName} />
						<AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-medium">{user.fullName}</div>
						<div className="text-xs text-muted-foreground">{user.email}</div>
					</div>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			const user = row.getValue(id) as Application["user"]
			return value.includes(user.fullName.toLowerCase())
		},
	},
	{
		accessorKey: "applicationDate",
		header: "Ngày đăng ký",
		cell: ({ row }) => {
			const date = new Date(row.getValue("applicationDate"))
			return <div>{format(date, "dd/MM/yyyy")}</div>
		},
	},
	{
		accessorKey: "status",
		header: "Trạng thái",
		cell: ({ row }) => {
			const status = row.getValue("status") as string

			return (
				<Badge
					variant={status === "Approved" ? "secondary" : status === "Rejected" ? "destructive" : "outline"}
					className={`flex items-center gap-1 ${status === "Approved" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}`}
				>
					{status === "Approved" && <Check className="h-3 w-3" />}
					{status === "Rejected" && <X className="h-3 w-3" />}
					{status === "Pending" && <Clock className="h-3 w-3" />}
					{status}
				</Badge>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const application = row.original

			const handleStatusUpdate = async (option: string) => {
				try {
					await updateApplicationStatus(application.applicationId, option)
					toast({
						title: "Cập nhật thành công",
						description: `Đơn đăng ký đã được ${option === "approve" ? "chấp nhận" : "từ chối"}.`,
					})
				} catch (error) {
					console.log(error)
					toast({
						title: "Lỗi",
						description: "Không thể cập nhật trạng thái đơn đăng ký.",
						variant: "destructive",
					})
				}
			}

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Mở menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Hành động</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => handleStatusUpdate("approve")}
							disabled={application.status === "Approved"}
						>
							<Check className="mr-2 h-4 w-4" />
							Chấp nhận
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleStatusUpdate("reject")} disabled={application.status === "Rejected"}>
							<X className="mr-2 h-4 w-4" />
							Từ chối
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
