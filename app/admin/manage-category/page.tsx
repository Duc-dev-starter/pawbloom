import React from 'react'
import { columns } from './columns'
import { DataTableProduct } from './data-table'
import { Product } from '@/types/product'

async function getDataProduct(): Promise<Product[]> {
    // Fetch data from your API here.
    return [
        {
            id: "1",
            name: "Sản phẩm A",
            category: "cat-food",
            supplier: "Nhà cung cấp X",
            price: 10000,
            status: "draft",
            quantity: 10,
            description: '',
            createdAt: "2024-12-01T10:30:00.000Z", // Example ISO 8601 date
        },
        {
            id: "2",
            name: "Sản phẩm B",
            category: "cat-food",
            supplier: "Nhà cung cấp Y",
            price: 20000,
            status: "inactive",
            quantity: 20,
            description: '',
            createdAt: "2024-11-28T15:45:00.000Z",
        },
        {
            id: "3",
            name: "Sản phẩm C",
            category: "dog-food",
            supplier: "Nhà cung cấp Z",
            price: 30000,
            status: "published",
            quantity: 30,
            description: '',
            createdAt: "2024-12-10T08:15:00.000Z",
        },
        {
            id: "4",
            name: "Test",
            category: "dog-food",
            supplier: "Nhà cung cấp Z",
            price: 30000,
            status: "published",
            quantity: 30,
            description: '',
            createdAt: "2024-11-30T20:00:00.000Z",
        },
        {
            id: "5",
            name: "Test2",
            category: "dog-food",
            supplier: "Nhà cung cấp Z",
            price: 30000,
            status: "published",
            quantity: 30,
            description: '',
            createdAt: "2024-11-25T11:20:00.000Z",
        },
        {
            id: "6",
            name: "Test3",
            category: "dog-food",
            supplier: "Nhà cung cấp Z",
            price: 30000,
            status: "published",
            quantity: 30,
            description: '',
            createdAt: "2024-12-14T09:30:00.000Z",
        },
        {
            id: "7", name: "Test3", category: "dog-food", supplier: "Nhà cung cấp Z", price: 30000, status: "published",
            quantity: 30,
            description: '',
            createdAt: "2024-12-14T09:30:00.000Z"
        },
        {
            id: "8", name: "Test3", category: "dog-food", supplier: "Nhà cung cấp Z", price: 30000, status: "published",
            quantity: 30,
            description: '',
            createdAt: "2024-12-14T09:30:00.000Z"
        },
        {
            id: "9", name: "Test3", category: "dog-food", supplier: "Nhà cung cấp Z", price: 30000, status: "published",
            quantity: 30,
            description: '',
            createdAt: "2024-12-14T09:30:00.000Z"
        },
        {
            id: "10", name: "Test3", category: "dog-food", supplier: "Nhà cung cấp Z", price: 30000, status: "published",
            quantity: 30,
            description: '',
            createdAt: "2024-12-14T09:30:00.000Z"
        },
        {
            id: "11", name: "Test3", category: "dog-food", supplier: "Nhà cung cấp Z", price: 30000, status: "published",
            quantity: 30,
            description: '',
            createdAt: "2024-12-14T09:30:00.000Z"
        },
    ]
}


const ManageCategory = async () => {
    const products = await getDataProduct()
    return (
        <DataTableProduct columns={columns} data={products} />
    )
}

export default ManageCategory;
