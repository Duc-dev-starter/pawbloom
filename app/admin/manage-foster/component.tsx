"use client"
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { Foster } from '@/types/user'
import { getUsers } from '@/services/user'
import { DataTableFoster } from './data-table'
import SkeletonCustom from '@/components/SkeletonTable'

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
        return <div><SkeletonCustom columns={columns} /></div>;
    }
    return (
        <DataTableFoster columns={columns} data={fosters} />
    )
}

export default ManageFostersComponent;
