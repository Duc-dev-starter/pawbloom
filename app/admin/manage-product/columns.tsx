"use client"

import { Column, ColumnDef } from "@tanstack/react-table"
//  import { statusProduct } from "@/constants/status-product";
import React, { ReactNode } from 'react';
import { FaCheck, FaInbox } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Product } from "@/types/product";
import ProductDropdown from "@/components/admin/manage-product/ProductDropdown";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoMdArrowUp, IoMdArrowDown } from "react-icons/io";
import { ArrowUpDown } from "lucide-react";



// const reverseStatusMapping = Object.fromEntries(
//     Object.entries(statusProduct).map(([key, value]) => [value, key])
// );


const getVietnameseStatus = (status: string) => {
    switch (status) {
        case 'published':
            return 'Công khai';
        case 'inactive':
            return 'Ngưng bán';
        case 'draft':
            return 'Nháp';
        default:
            return 'Nháp';
    }
}

type SortableHeaderProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    column: Column<any, unknown>;
    label: string;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ column, label }) => {
    const isSorted = column.getIsSorted();
    const SortingIcon = isSorted === 'asc'
        ? IoMdArrowDown
        : isSorted === 'desc'
            ? IoMdArrowUp
            : ArrowUpDown;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" aria-label={`Sắp xếp theo ${label}`}>
                    {label}
                    <SortingIcon className="ml-2 size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="bottom">
                <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                    <IoMdArrowUp className="mr-2 size-4" /> Từ thấp đến cao
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                    <IoMdArrowDown className="mr-2 size-4" /> Từ cao đến thấp
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns: ColumnDef<Product[]> = [
    {
        accessorKey: 'name',
        header: ({ column }: { column: Column<Product, unknown> }) => <SortableHeader column={column} label="Sản phẩm" />
    },
    {
        accessorKey: 'category',
        header: ({ column }: { column: Column<Product, unknown> }) => <SortableHeader column={column} label="Danh mục" />,
        filterFn: "multiSelect"
    },
    {
        accessorKey: 'supplier',
        header: ({ column }: { column: Column<Product, unknown> }) => <SortableHeader column={column} label="Nhà cung cấp" />
    },
    {
        accessorKey: 'price',
        header: ({ column }: { column: Column<Product, unknown> }) => <SortableHeader column={column} label="Giá thành" />,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
            }).format(price)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: 'quantity',
        header: ({ column }: { column: Column<Product, unknown> }) => <SortableHeader column={column} label="Số lượng" />
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        filterFn: "multiSelect",
        cell: ({ row }: { row: { original: Product } }) => {
            const status = row.original.status;
            let colorClass;
            let icon: ReactNode;

            switch (status) {
                case 'published':
                    colorClass = "text-green-600 bg-green-100";
                    icon = <FaCheck className="text-sm" />;
                    break;
                case 'inactive':
                    colorClass = "text-red-600 bg-red-100";
                    icon = <IoClose className="text-sm" />
                    break;
                case 'draft':
                    colorClass = "text-gray-600 bg-gray-200";
                    icon = <FaInbox />
                    break;
                default:
                    colorClass = "text-gray-600 bg-gray-200";
                    icon = <FaInbox />
                    break;
            }
            return (
                <span className={`rounded-full px-3 py-[2px] font-medium ${colorClass} flex w-fit items-center gap-1`}>
                    {icon}
                    <span className="text-sm">{getVietnameseStatus(status)}</span>
                </span>
            )
        }

    },
    {
        accessorKey: 'createdAt',
        header: ({ column }: { column: Column<Product, unknown> }) => <SortableHeader column={column} label="Ngày tạo" />,
        cell: ({ getValue }) => {
            const value = getValue();
            const date = value ? new Date(value) : undefined;
            return (
                <span>
                    {date
                        ? date.toLocaleDateString("vi-VI", {
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
        id: "actions",
        cell: ({ row }) => {
            return <ProductDropdown row={row} />
        }
    },
]
