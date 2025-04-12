"use client"

import { useEffect, useState } from "react"
import { columns } from "../column"
import type { Application } from "@/types/foster-application"
import { DataTableApplication } from "../data-table"
import { getApplicationsByFoster } from "@/services/application"
import SkeletonCustom from "@/components/SkeletonTable"

const ManageApplicationsComponent = () => {
	const [applications, setApplications] = useState<Application[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchApplications = async () => {
			try {
				setLoading(true)
				const response = await getApplicationsByFoster()
				setApplications(response?.data)
			} catch (error) {
				console.error("Error fetching applications:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchApplications()
	}, [])

	if (loading) {
		return (
			<div>
				<SkeletonCustom columns={columns} />
			</div>
		)
	}

	return <DataTableApplication columns={columns} data={applications} />
}

export default ManageApplicationsComponent
