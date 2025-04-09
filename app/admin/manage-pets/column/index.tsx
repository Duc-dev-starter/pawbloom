"use client"

import SortableHeader from "@/components/admin/SortableHeader";
import { Pet } from "@/types/pet"; // Assuming you'll create this type
import { Column, ColumnDef } from "@tanstack/react-table";
import { ReactNode } from 'react';
import { FaCheck, FaInbox } from "react-icons/fa6";
// import PetMenuDropdown from "@/components/admin/manage-pets/PetMenuDropdown";

export const columns: ColumnDef<Pet>[] = [
	{
		accessorKey: 'name',
		header: ({ column }: { column: Column<Pet> }) => <SortableHeader<Pet> column={column} label="Tên thú cưng" />
	},
	{
		accessorKey: 'breed',
		header: ({ column }: { column: Column<Pet> }) => <SortableHeader<Pet> column={column} label="Giống" />
	},
	{
		accessorKey: 'price',
		header: ({ column }: { column: Column<Pet> }) => <SortableHeader<Pet> column={column} label="Giá" />,
		cell: ({ getValue }) => {
			const value = getValue() as number;
			return (
				<span>
					{value.toLocaleString('vi-VN')} VNĐ
				</span>
			);
		}
	},
	{
		accessorKey: 'age',
		header: ({ column }: { column: Column<Pet> }) => <SortableHeader<Pet> column={column} label="Tuổi" />
	},
	{
		accessorKey: "status",
		header: "Trạng thái",
		filterFn: "multiSelect",
		cell: ({ row }: { row: { original: Pet } }) => {
			const status = row.original.status;
			let colorClass;
			let icon: ReactNode;

			switch (status.toLowerCase()) {
				case 'available':
					colorClass = "text-green-600 bg-green-100";
					icon = <FaCheck className="text-sm" />;
					break;
				case 'adopted':
					colorClass = "text-blue-600 bg-blue-100";
					icon = <FaCheck className="text-sm" />;
					break;
				case 'pending':
					colorClass = "text-gray-600 bg-gray-200";
					icon = <FaInbox className="text-sm" />;
					break;
				default:
					colorClass = "text-gray-600 bg-gray-200";
					icon = <FaInbox className="text-sm" />;
					break;
			}
			return (
				<span className={`rounded-full px-3 py-[2px] font-medium ${colorClass} flex w-fit items-center gap-1`}>
					{icon}
					<span className="text-sm">
						{status === 'Available' ? 'Có sẵn' :
							status === 'Adopted' ? 'Đã nhận nuôi' :
								status === 'Pending' ? 'Đang chờ' : status}
					</span>
				</span>
			);
		}
	},
	{
		accessorKey: 'gender',
		header: ({ column }: { column: Column<Pet> }) => <SortableHeader<Pet> column={column} label="Giới tính" />,
		cell: ({ getValue }) => {
			const value = getValue() as string;
			return <span>{value === 'Male' ? 'Đực' : 'Cái'}</span>;
		}
	},
	{
		accessorKey: 'size',
		header: ({ column }: { column: Column<Pet> }) => <SortableHeader<Pet> column={column} label="Kích thước" />,
		cell: ({ getValue }) => {
			const value = getValue() as string;
			return (
				<span>
					{value === 'Large' ? 'Lớn' :
						value === 'Medium' ? 'Trung bình' :
							value === 'Small' ? 'Nhỏ' : value}
				</span>
			);
		}
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }: { column: Column<Pet> }) => <SortableHeader<Pet> column={column} label="Ngày tạo" />,
		cell: ({ getValue }) => {
			const value = getValue() as string;
			const date = value ? new Date(value) : undefined;
			return (
				<span>
					{date
						? date.toLocaleDateString("vi-VN", {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})
						: "N/A"}
				</span>
			);
		}
	},
	{
		accessorKey: 'updatedAt',
		header: ({ column }: { column: Column<Pet> }) => <SortableHeader<Pet> column={column} label="Ngày cập nhật" />,
		cell: ({ getValue }) => {
			const value = getValue() as string;
			const date = value ? new Date(value) : undefined;
			return (
				<span>
					{date
						? date.toLocaleDateString("vi-VN", {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})
						: "N/A"}
				</span>
			);
		}
	},
	// {
	// 	id: "actions",
	// 	cell: ({ row }) => {
	// 		return <StatusDropdown  />
	// 	}
	// },
]