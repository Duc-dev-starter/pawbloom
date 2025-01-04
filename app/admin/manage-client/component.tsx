"use client"
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTableClient } from './data-table'
import { Client } from '@/types/user'
import { getUsers } from '@/services/user'

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
        return <>
            <Skeleton />
        </>;
    }
    return (
        <DataTableClient columns={columns} data={clients} />
    )
}

export default ManageClientsComponent;
