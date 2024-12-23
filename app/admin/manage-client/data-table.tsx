"use client"

import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DataTableProps, PaginationType } from "@/interfaces/data-table"
import { multiSelectFilter } from "@/utils"
import { StatusDropdown } from "@/components/admin"
import { FaCheck, FaInbox } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"
import { PaginationControls, PaginationSelection } from "@/components/common"
import { Status } from "@/types/status"

const clientStatuses: Status[] = [
    { value: 'active', label: 'Hoạt động', icon: <FaCheck /> },
    { value: 'inactive', label: 'Ngưng hoạt động', icon: <IoClose /> },
    { value: 'banned', label: 'Bị cấm', icon: <FaInbox /> },
];

export function DataTableClient<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [pagination, setPagination] = useState<PaginationType>({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

    useEffect(() => {
        setColumnFilters((prev) => {
            const baseFilter = prev.filter(
                (filter) => filter.id !== "status"
            );
            const newFilter = [...baseFilter];

            // Add status filter if there are selected statuses
            if (selectedStatuses.length > 0) {
                newFilter.push({
                    id: "status",
                    value: selectedStatuses
                })
            }

            return newFilter;
        })
    }, [selectedStatuses])


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            pagination
        },
        filterFns: {
            multiSelect: multiSelectFilter
        }
    })

    return (
        <>
            <Card className="mt-12 flex flex-col border-none px-0 shadow-none">
                <CardHeader className="flex justify-between p-2 px-6">
                    <div className="mb-7 flex items-center justify-between">
                        <div>
                            <CardTitle className="text-[23px] font-bold">Khách hàng</CardTitle>
                            <p className="text-sm text-slate-600">{data.length} khách hàng</p>
                        </div>
                        {/* <ProductDialog /> */}
                    </div>
                    <div className="flex flex-col gap-3">
                        {/* Search Input and Dropdown */}
                        <div className="flex items-center justify-between gap-4">
                            <Input placeholder="Tìm kiếm danh mục" className="h-10 flex-1"
                                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table.getColumn("name")?.setFilterValue(event.target.value)
                                }
                            />
                            <StatusDropdown selectedStatuses={selectedStatuses} setSelectedStatuses={setSelectedStatuses} statuses={clientStatuses} />
                        </div>
                        {/* Buttons */}
                        <div className="mt-2 flex gap-4">


                        </div>
                    </div>

                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} className="text-center">
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="text-center">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            Không có dữ liệu.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                    </div>
                    <div className="mt-5 flex items-center justify-between">
                        <PaginationSelection pagination={pagination} setPagination={setPagination} />
                        <PaginationControls
                            pageIndex={pagination.pageIndex}
                            pageCount={table.getPageCount()}
                            canPreviousPage={table.getCanPreviousPage()}
                            canNextPage={table.getCanNextPage()}
                            goToPage={table.setPageIndex}
                            nextPage={table.nextPage}
                            previousPage={table.previousPage}
                        />
                    </div>
                </CardContent>
            </Card>

        </>
    )
}
