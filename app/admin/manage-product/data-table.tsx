"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
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
import PaginationSelection from "@/components/admin/manage-product/PaginationSelection"
import { Button } from "@/components/ui/button"
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { BiFirstPage, BiLastPage } from 'react-icons/bi'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import StatusDropdown from "@/components/admin/manage-product/StatusDropdown"
import CategoryDropdown from "@/components/admin/manage-product/CategoryDropdown"
import FilterArea from "@/components/admin/manage-product/FilterArea"
import ProductDialog from "@/components/admin/manage-product/ProductDialog"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export interface PaginationType {
    pageIndex: number;
    pageSize: number;
}

// Define the custom filter types
declare module "@tanstack/table-core" {
    interface FilterFns {
        multiSelect: FilterFn<unknown>
    }
}

// Define the custom filter function
const multiSelectFilter: FilterFn<unknown> = (
    row,
    columnId,
    filterValue: string[]
) => {
    const rowValue = (row.getValue(columnId) as string).toLowerCase();
    const lowerCaseFilterValues = filterValue.map((val) => val.toLowerCase());
    return filterValue.length === 0 || lowerCaseFilterValues.includes(rowValue);
};



export function DataTableProduct<TData, TValue>({
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
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        setColumnFilters((prev) => {
            // Remove both status and categories filters
            const baseFilter = prev.filter(
                (filter) => filter.id !== "status" && filter.id !== "category"
            );
            const newFilter = [...baseFilter];

            // Add status filter if there are selected statuses
            if (selectedStatuses.length > 0) {
                newFilter.push({
                    id: "status",
                    value: selectedStatuses
                })
            }

            // Add category filter if there are selected categories
            if (selectedStatuses.length > 0) {
                newFilter.push({
                    id: "category",
                    value: selectedCategories
                })
            }
            return newFilter;
        })
    }, [selectedStatuses, selectedCategories])


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
                            <CardTitle className="text-[23px] font-bold">Sản phẩm</CardTitle>
                            <p className="text-sm text-slate-600">34 sản phẩm</p>
                        </div>
                        <ProductDialog />
                    </div>
                    <div className="flex flex-col gap-3">
                        {/* Search Input and Dropdown */}
                        <div className="flex items-center justify-between gap-4">
                            <Input placeholder="Tìm kiếm sản phẩm" className="h-10 flex-1"
                                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table.getColumn("name")?.setFilterValue(event.target.value)
                                }
                            />
                            <StatusDropdown selectedStatuses={selectedStatuses} setSelectedStatuses={setSelectedStatuses} />
                            <CategoryDropdown selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                        </div>
                        {/* Buttons */}
                        <div className="mt-2 flex gap-4">

                            <FilterArea
                                selectedStatuses={selectedStatuses}
                                setSelectedStatuses={setSelectedStatuses}
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
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
                                                <TableHead key={header.id}>
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
                                                <TableCell key={cell.id}>
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
                        <div className="flex items-center gap-6">
                            <span className="text-sm text-gray-500">
                                Trang {pagination.pageIndex + 1} trên {Math.max(1, table.getPageCount())}
                            </span>
                            <div className="flex items-center justify-end space-x-2 py-4">
                                <Button variant="outline" className="size-9 w-12" size="sm" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                                    <BiFirstPage />
                                </Button>

                                <Button variant="outline" className="size-9 w-12" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                    <GrFormPrevious />
                                </Button>

                                <Button variant="outline" className="size-9 w-12" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                    <GrFormNext />
                                </Button>

                                <Button variant="outline" className="size-9 w-12" size="sm" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                                    <BiLastPage />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </>
    )
}
