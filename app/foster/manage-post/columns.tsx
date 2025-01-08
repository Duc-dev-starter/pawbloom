"use client"

import { Column, ColumnDef } from "@tanstack/react-table"
//  import { statusProduct } from "@/constants/status-product";
import React, { ReactNode } from 'react';
import { FaCheck, FaInbox } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Product } from "@/types/product";
import { getVietnameseStatus } from "@/utils";
import SortableHeader from "@/components/admin/SortableHeader";
import { ProductMenuDropdown } from "@/components/admin/manage-product";



// const reverseStatusMapping = Object.fromEntries(
//     Object.entries(statusProduct).map(([key, value]) => [value, key])
// );


export const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'title',
        header: ({ column }: { column: Column<any, unknown> }) => <SortableHeader column={column} label="Tiêu đề" />
    },
    {
        accessorKey: 'category',
        header: ({ column }: { column: Column<any, unknown> }) => <SortableHeader column={column} label="Danh mục" />,
        filterFn: "multiSelect"
    },
    {
        accessorKey: 'supplier',
        header: ({ column }: { column: Column<any, unknown> }) => <SortableHeader column={column} label="Nhà cung cấp" />
    },
    {
        accessorKey: 'price',
        header: ({ column }: { column: Column<any, unknown> }) => <SortableHeader column={column} label="Giá thành" />,
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
                    <span className="text-sm">{getVietnameseStatus(status, "product")}</span>
                </span>
            )
        }

    },
    {
        accessorKey: 'createdAt',
        header: ({ column }: { column: Column<Product, unknown> }) => <SortableHeader column={column} label="Ngày tạo" />,
        cell: ({ getValue }) => {
            const value = getValue() as string;
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
            return <ProductMenuDropdown row={row} />
        }
    },
]
