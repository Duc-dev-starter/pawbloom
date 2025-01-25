"use client"
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { DataTableProduct } from './data-table'
import { Product } from '@/types/product'
import { getProducts } from '@/services/product'
import SkeletonCustom from '@/components/SkeletonTable'


const ManageProductsComponent = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await getProducts();
                setProducts(response as unknown as Product[]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [])

    if (loading) {
        return <div><SkeletonCustom columns={columns} /></div>;
    }
    return (
        <DataTableProduct columns={columns} data={products} />
    )
}

export default ManageProductsComponent;
