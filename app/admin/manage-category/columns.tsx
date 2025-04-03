"use client"

import { Column, ColumnDef } from "@tanstack/react-table"
import React from 'react';
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
        accessorKey: 'description',
        header: ({ column }: { column: Column<Category, unknown> }) => <SortableHeader column={column} label="Mô tả" />
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
