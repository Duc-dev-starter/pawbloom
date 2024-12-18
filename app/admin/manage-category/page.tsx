import React from 'react'
import { columns } from './columns'
import { DataTableProduct } from './data-table'
import { Category } from '@/types/category'

async function getDataCategory(): Promise<Category[]> {
    // Fetch data from your API here.
    return [
        {
            id: "1",
            name: "sản phẩm cho mèo",
            status: "draft",
            description: '',
            createdAt: "2024-12-01T10:30:00.000Z", // Example ISO 8601 date
            updatedAt: "2024-12-01T10:30:00.000Z",
            author: 'duc'
        },
        {
            id: "2",
            name: "sản phẩm cho chó",
            status: "draft",
            description: '',
            createdAt: "2024-12-01T10:30:00.000Z", // Example ISO 8601 date
            updatedAt: "2024-12-01T10:30:00.000Z",
            author: 'duc'
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
