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
import AuthorDropdown from "@/components/admin/manage-category/AuthorDropdown"
import { Status } from "@/types/status"
import { FaCheck, FaInbox } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"
import { StatusDropdown } from "@/components/admin"
import CategoryFilterArea from "@/components/admin/manage-category/CategoryFilterArea"
import { PaginationControls, PaginationSelection } from "@/components/common"
import CategoryDialog from "@/components/admin/manage-category/CategoryDialog"

const categoryStatuses: Status[] = [
    { value: 'published', label: 'Công khai', icon: <FaCheck /> },
    { value: 'inactive', label: 'Ẩn', icon: <IoClose /> },
    { value: 'draft', label: 'Nháp', icon: <FaInbox /> },
];


export function DataTableCategory<TData, TValue>({
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
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

    useEffect(() => {
        setColumnFilters((prev) => {
            // Remove both status and categories filters
            const baseFilter = prev.filter(
                (filter) => filter.id !== "status" && filter.id !== "author"
            );
            const newFilter = [...baseFilter];

            // Add status filter if there are selected statuses
            if (selectedStatuses.length > 0) {
                newFilter.push({
                    id: "status",
                    value: selectedStatuses
                })
            }

            // Add author filter if there are selected authors
            if (selectedAuthors.length > 0) {
                newFilter.push({
                    id: "author",
                    value: selectedAuthors
                })
            }
            return newFilter;
        })
    }, [selectedStatuses, selectedAuthors])


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
                            <CardTitle className="text-[23px] font-bold">Danh mục</CardTitle>
                            <p className="text-sm text-slate-600">{data.length} danh mục</p>
                        </div>
                        <CategoryDialog />
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
                            <StatusDropdown selectedStatuses={selectedStatuses} setSelectedStatuses={setSelectedStatuses} statuses={categoryStatuses} />
                            <AuthorDropdown selectedAuthors={selectedAuthors} setSelectedAuthors={setSelectedAuthors} />
                        </div>
                        {/* Buttons */}
                        <div className="mt-2 flex gap-4">

                            <CategoryFilterArea
                                selectedStatuses={selectedStatuses}
                                setSelectedStatuses={setSelectedStatuses}
                                selectedAuthors={selectedAuthors}
                                setSelectedAuthors={setSelectedAuthors}
                            />
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
