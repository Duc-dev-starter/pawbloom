"use client"
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { getCategories } from '@/services/category'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTableCategory } from './data-table'
import { Category } from '@/types/category'
import SkeletonCustom from '@/components/SekeletonTable'

const ManageCategoriesComponent = () => {
    const [blogs, setBlogs] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await getCategories();
                setBlogs(response as unknown as Category[]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, [])

    if (loading) {
        return <div><SkeletonCustom columns={columns} /></div>;

    }
    return (
        <DataTableCategory columns={columns} data={blogs} />
    )
}

export default ManageCategoriesComponent;
