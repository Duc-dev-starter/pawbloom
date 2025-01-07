"use client"
import ProductCard from '@/sections/home/ProductCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    slug: string;
};

// // Dữ liệu giả
// const mockProducts: Product[] = [
//     { id: '1', name: 'Product 1', price: 100, description: 'Description 1', slug: 'product-1' },
//     { id: '2', name: 'Product 2', price: 200, description: 'Description 2', slug: 'product-2' },
//     { id: '3', name: 'Product 3', price: 300, description: 'Description 3', slug: 'product-3' },
//     { id: '4', name: 'Product 4', price: 400, description: 'Description 4', slug: 'product-4' },
// ];

const ProductPage = () => {
    const router = useRouter();
    const [showFilter, setShowFilter] = useState(true);
    const [filterProduct, setFilterProduct] = useState([]);
    const [category, setCategory] = useState([]);

    const handleViewDetails = (slug: string) => {
        router.push(`/product/${slug}`);
    };

    const handleShowFilter = () => {
        setShowFilter(!showFilter);
    }

    return (
        <div className='flex flex-col gap-1 border p-10 sm:flex-row sm:gap-10 lg:p-16 lg:pt-10'>
            <div className='min-w-60'>
                <p onClick={handleShowFilter} className='my-2 flex cursor-pointer items-center gap-2 text-xl'>Filter
                    <Image className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''} `} src='/assets/icons/arrow-right.svg' alt='test' width={20} height={20} />
                </p>
                <div className={`mt-6 border border-gray-300 py-3 pl-5 ${showFilter ? "" : "hidden"} sm::block`}>
                    <p className='mb-3 text-sm font-medium'>Categories</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'dog'} /> Chó
                        </p>

                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Mèo'} /> Mèo
                        </p>


                    </div>
                </div>

                <div className={`my-5 border border-gray-300 py-3 pl-5 ${showFilter ? "" : "hidden"} sm::block`}>
                    <p className='mb-3 text-sm font-medium'>Hãng</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'dog'} /> Chó
                        </p>

                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Mèo'} /> Mèo
                        </p>


                    </div>
                </div>
            </div>

            <div className='flex-1'>
                <div className='mb-4 flex justify-between text-base sm:text-2xl'>
                    <h1 className='h1'>Tất cả sản phẩm</h1>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sắp xếp theo giá" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Tất cả</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>


                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

                </div>
            </div>
        </div>
    );
};

export default ProductPage;
