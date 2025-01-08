"use client"
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { getBlogs } from '@/services/blog'
import { Skeleton } from '@/components/ui/skeleton'
import { Post } from '@/types/post'
import { DataTablePosts } from './data-table'

const ManagePostsComponent = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await getBlogs();
                setPosts(response as unknown as Post[]);
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
