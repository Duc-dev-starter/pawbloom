import React from 'react'
import { columns } from './columns'
import { DataTableProduct } from './data-table'
import { Blog } from '@/types/blog'

async function getDataBlog(): Promise<Blog[]> {
    // Fetch data from your API here.
    return [
        {
            id: "1",
            title: "sản phẩm cho mèo",
            status: "draft",
            description: '',
            createdAt: "2024-12-01T10:30:00.000Z", // Example ISO 8601 date
            updatedAt: "2024-12-01T10:30:00.000Z",
            author: 'duc',
            content: '',
            category: ''
        },
        {
            id: "2",
            title: "sản phẩm cho chó",
            status: "draft",
            description: '',
            createdAt: "2024-12-01T10:30:00.000Z", // Example ISO 8601 date
            updatedAt: "2024-12-01T10:30:00.000Z",
            author: 'duc',
            content: '',
            category: ''
        },
    ]
}


const ManageCategory = async () => {
    const products = await getDataCategory()
    return (
        <DataTableProduct columns={columns} data={products} />
    )
}

export default ManageCategory;
