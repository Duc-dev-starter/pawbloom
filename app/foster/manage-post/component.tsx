"use client"
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { Skeleton } from '@/components/ui/skeleton'
import { Post } from '@/types/post'
import { DataTablePosts } from './data-table'
import { getApplicationsByFoster } from '@/services/application'

const ManagePostsComponent = () => {
    const [posts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await getApplicationsByFoster();
                console.log(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [])

    if (loading) {
        return <>
            <Skeleton />
        </>;
    }
    return (
        <DataTablePosts columns={columns} data={posts} />
    )
}

export default ManagePostsComponent;
