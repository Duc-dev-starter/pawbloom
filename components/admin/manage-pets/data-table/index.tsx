"use client"

import {
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type PaginationState,
	type Updater,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { DataTableProps, PaginationType } from "@/interfaces/data-table"
import { multiSelectFilter } from "@/utils"
import { StatusDropdown } from "@/components/admin"
import { FaCheck, FaInbox, FaPlus } from "react-icons/fa6"
import type { Status } from "@/types/status"
import { PaginationControls, PaginationSelection } from "@/components/common"
import type { Pet } from "@/types/pet"
import { Button } from "@/components/ui/button"
import { PetDialog } from "../pet-dialog"
import { DeletePetDialog } from "../delete-dialog"
import { getColumns } from "../column"

const petStatuses: Status[] = [
	{ value: "Available", label: "Có sẵn", icon: <FaCheck /> },
	{ value: "Adopted", label: "Đã nhận nuôi", icon: <FaCheck /> },
	{ value: "Pending", label: "Đang chờ", icon: <FaInbox /> },
]

interface DataTablePetsProps<TData, TValue> extends DataTableProps<TData, TValue> {
	pagination: PaginationType
	setPagination: (updater: Updater<PaginationState>) => void
	totalCount?: number
	searchTerm: string
	setSearchTerm: (value: string) => void
	selectedStatuses: string[]
	setSelectedStatuses: (value: string[]) => void
	onRefresh: () => void
}

export function DataTablePets<TData, TValue>({
	data,
	pagination,
	setPagination,
	totalCount = 0,
	searchTerm,
	setSearchTerm,
	selectedStatuses,
	setSelectedStatuses,
	onRefresh,
}: DataTablePetsProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [selectedPet, setSelectedPet] = useState<Pet | null>(null)

	const handleAddPet = () => {
		setIsAddDialogOpen(true)
	}

	const handleEditPet = (pet: Pet) => {
		setSelectedPet(pet)
		setIsEditDialogOpen(true)
	}

	const handleDeletePet = (pet: Pet) => {
		setSelectedPet(pet)
		setIsDeleteDialogOpen(true)
	}

	const handleSuccess = () => {
		onRefresh()
	}

	const columns = getColumns({
		onEdit: handleEditPet,
		onDelete: handleDeletePet,
	})

	useEffect(() => {
		setColumnFilters((prev) => {
			const baseFilter = prev.filter((filter) => filter.id !== "status")
			const newFilter = [...baseFilter]

			if (selectedStatuses.length > 0) {
				newFilter.push({
					id: "status",
					value: selectedStatuses,
				})
			}

			return newFilter
		})
	}, [selectedStatuses])

	const table = useReactTable({
		data,
		// @ts-expect-error
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		manualPagination: true,
		pageCount: Math.ceil(totalCount / pagination.pageSize),
		state: {
			sorting,
			columnFilters,
			pagination,
		},
		onPaginationChange: (updater) => {
			setPagination(updater)
		},
		filterFns: {
			multiSelect: multiSelectFilter,
		},
	})

	return (
		<>
			<Card className="mt-12 flex flex-col border-none px-0 shadow-none">
				<CardHeader className="flex justify-between p-2 px-6">
					<div className="mb-7 flex items-center justify-between">
						<div>
							<CardTitle className="text-[23px] font-bold">Danh sách thú cưng</CardTitle>
							<p className="text-sm text-slate-600">{totalCount} thú cưng</p>
						</div>
					</div>
					<div className="flex flex-col gap-3">
						<div className="flex items-center justify-between gap-4">
							<Input
								placeholder="Tìm kiếm thú cưng"
								className="h-10 flex-1"
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
							/>
							<StatusDropdown
								selectedStatuses={selectedStatuses}
								// @ts-expect-error
								setSelectedStatuses={setSelectedStatuses}
								statuses={petStatuses}
							/>
						</div>
						<div className="mt-2 flex justify-end">
							<Button onClick={handleAddPet} className="flex items-center gap-2">
								<FaPlus className="h-4 w-4" />
								Thêm thú cưng
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<TableHead key={header.id} className="text-center">
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
											</TableHead>
										))}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
											Không có dữ liệu thú cưng.
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

			{/* Add Pet Dialog */}
			<PetDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onSuccess={handleSuccess} />

			{/* Edit Pet Dialog */}
			{selectedPet && (
				<PetDialog
					isOpen={isEditDialogOpen}
					onClose={() => setIsEditDialogOpen(false)}
					pet={selectedPet}
					onSuccess={handleSuccess}
				/>
			)}

			{/* Delete Pet Dialog */}
			{selectedPet && (
				<DeletePetDialog
					isOpen={isDeleteDialogOpen}
					onClose={() => setIsDeleteDialogOpen(false)}
					petId={selectedPet.id}
					petName={selectedPet.name}
					onSuccess={handleSuccess}
				/>
			)}
		</>
	)
}
