"use client"

import { Column, ColumnDef } from "@tanstack/react-table"
import React, { ReactNode } from 'react';
import { FaCheck, FaInbox } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { getVietnameseStatus } from "@/utils";
import { Category } from "@/types/category";
import SortableHeader from "@/components/admin/SortableHeader";
import { CategoryMenuDropdown } from "@/components/admin/manage-category";



// const reverseStatusMapping = Object.fromEntries(
//     Object.entries(statusProduct).map(([key, value]) => [value, key])
// );



export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'name',
        header: ({ column }: { column: Column<Category> }) => <SortableHeader<Category> column={column} label="Danh mục" />
    },
    {
        accessorKey: 'author',
        header: ({ column }: { column: Column<Category, unknown> }) => <SortableHeader column={column} label="Người tạo" />
    },
    {
        accessorKey: 'description',
        header: ({ column }: { column: Column<Category, unknown> }) => <SortableHeader column={column} label="Mô tả" />
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        filterFn: "multiSelect",
        cell: ({ row }: { row: { original: Category } }) => {
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
                    <span className="text-sm">{getVietnameseStatus(status, "category")}</span>
                </span>
            )
        }

    },
    {
        accessorKey: 'createdAt',
        header: ({ column }: { column: Column<Category, unknown> }) => <SortableHeader column={column} label="Ngày tạo" />,
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
        accessorKey: 'updatedAt',
        header: ({ column }: { column: Column<Category, unknown> }) => <SortableHeader column={column} label="Ngày cập nhật" />,
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
            return <CategoryMenuDropdown row={row} />
        }
    },
]
