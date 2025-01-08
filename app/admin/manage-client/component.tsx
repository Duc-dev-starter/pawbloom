"use client"
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { DataTableClient } from './data-table'
import { Client } from '@/types/user'
import { getUsers } from '@/services/user'
import SkeletonCustom from '@/components/SekeletonTable'

const ManageClientsComponent = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchClients = async () => {
            try {
                setLoading(true);
                const response = await getUsers();
                setClients(response as unknown as Client[]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchClients();
    }, [])

    if (loading) {
        return <><SkeletonCustom columns={columns} /></>
    }
    return (
        <DataTableClient columns={columns} data={clients} />
    )
}

export default ManageClientsComponent;
