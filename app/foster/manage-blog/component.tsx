"use client"
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { Blog } from '@/types/blog'
import { DataTableBlog } from './data-table'
import { getBlogs } from '@/services/blog'
import { Skeleton } from '@/components/ui/skeleton'

const ManageBlogsComponent = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await getBlogs();
                setBlogs(response as unknown as Blog[]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, [])

    if (loading) {
        return <>
            <Skeleton />
        </>;
    }
    return (
        <DataTableBlog columns={columns} data={blogs} />
    )
}

export default ManageBlogsComponent;
