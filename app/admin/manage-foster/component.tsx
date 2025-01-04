"use client"
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { Skeleton } from '@/components/ui/skeleton'
import { Foster } from '@/types/user'
import { getUsers } from '@/services/user'
import { DataTableFoster } from './data-table'

const ManageFostersComponent = () => {
    const [fosters, setFosters] = useState<Foster[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchFosters = async () => {
            try {
                setLoading(true);
                const response = await getUsers();
                setFosters(response as unknown as Foster[]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchFosters();
    }, [])

    if (loading) {
        return <>
            <Skeleton />
        </>;
    }
    return (
        <DataTableFoster columns={columns} data={fosters} />
    )
}

export default ManageFostersComponent;
