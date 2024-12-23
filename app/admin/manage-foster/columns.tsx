"use client"

import { Column, ColumnDef } from "@tanstack/react-table"
import React, { ReactNode } from 'react';
import { FaCheck, FaInbox } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { getVietnameseStatus } from "@/utils";
import SortableHeader from "@/components/admin/SortableHeader";
import { Foster } from "@/types/user";
import FosterMenuDropdown from "@/components/admin/manage-foster/FosterMenuDropdown";



// const reverseStatusMapping = Object.fromEntries(
//     Object.entries(statusProduct).map(([key, value]) => [value, key])
// );



export const columns: ColumnDef<Foster>[] = [
    {
        accessorKey: 'name',
        header: ({ column }: { column: Column<Foster> }) => <SortableHeader<Foster> column={column} label="Tên trạm" />
    },
    {
        accessorKey: 'phoneNumber',
        header: ({ column }: { column: Column<Foster, unknown> }) => <SortableHeader column={column} label="Số điện thoại" />
    },
    {
        accessorKey: 'address',
        header: ({ column }: { column: Column<Foster, unknown> }) => <SortableHeader column={column} label="Địa chỉ" />
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        filterFn: "multiSelect",
        cell: ({ row }: { row: { original: Foster } }) => {
            const status = row.original.status;
            let colorClass;
            let icon: ReactNode;

            switch (status) {
                case 'operational':
                    colorClass = "text-green-600 bg-green-100";
                    icon = <FaCheck className="text-sm" />;
                    break;
                case 'closed':
                    colorClass = "text-red-600 bg-red-100";
                    icon = <IoClose className="text-sm" />
                    break;
                case 'under_review':
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
        header: ({ column }: { column: Column<Foster, unknown> }) => <SortableHeader column={column} label="Ngày tạo" />,
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
        header: ({ column }: { column: Column<Foster, unknown> }) => <SortableHeader column={column} label="Ngày cập nhật" />,
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
            return <FosterMenuDropdown row={row} />
        }
    },
]
