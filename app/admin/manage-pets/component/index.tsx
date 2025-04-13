"use client"

import SkeletonCustom from "@/components/SkeletonTable"
import type { PaginationType } from "@/interfaces/data-table"
import { getPetSearchPage } from "@/services/pet"
import type { Pet } from "@/types/pet"
import type { PaginationState, Updater } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { DataTablePets } from "@/components/admin/manage-pets/data-table"
import { getColumns } from "@/components/admin/manage-pets/column"

function ManagePets() {
	const [pets, setPets] = useState<Pet[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [pagination, setPagination] = useState<PaginationType>({
		pageIndex: 0,
		pageSize: 10,
	})
	const [totalCount, setTotalCount] = useState<number>(0)
	const [searchTerm, setSearchTerm] = useState<string>("")
	const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

	const fetchPets = async () => {
		try {
			setLoading(true)
			const response = await getPetSearchPage({
				searchTerm: searchTerm,
				page: pagination.pageIndex + 1, // Convert to 1-based indexing for API
				pageSize: pagination.pageSize,
				status: selectedStatuses.length > 0 ? selectedStatuses.join(",") : undefined,
			})
			setPets(response.data.pets)
			setTotalCount(response.data.totalCount)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	// Trigger fetchPets when pagination, searchTerm, or selectedStatuses change
	useEffect(() => {
		fetchPets()
	}, [pagination.pageIndex, pagination.pageSize, searchTerm, selectedStatuses])

	const handlePaginationChange = (updater: Updater<PaginationState>) => {
		setPagination((prev) => {
			const newPagination = typeof updater === "function" ? updater(prev) : updater
			return { ...prev, ...newPagination }
		})
	}

	if (loading) {
		return (
			<div>
				<SkeletonCustom
					columns={getColumns({
						onEdit: () => { },
						onDelete: () => { },
					})}
				/>
			</div>
		)
	}

	return (
		<div>
			<h1 className="text-2xl font-bold">Quản lí thú cưng</h1>
			<DataTablePets
				columns={getColumns({
					onEdit: () => { },
					onDelete: () => { },
				})}
				data={pets}
				pagination={pagination}
				setPagination={handlePaginationChange}
				totalCount={totalCount}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				selectedStatuses={selectedStatuses}
				setSelectedStatuses={setSelectedStatuses}
				onRefresh={fetchPets}
			/>
		</div>
	)
}

export default ManagePets
