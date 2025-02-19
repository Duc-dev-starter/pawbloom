"use client"
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface ProductProps {
    product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
    const [hovered, setHovered] = useState(false);
    console.log(hovered);
    return (
        <div className='overflow-hidden'>
            <Link
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                href={`/product/${product.slug || product.id}`} className='flex-center p-2 bg-[#F5F5F5] overflow-hidden relative'>
                <Image src={'https://loremflickr.com/640/480/animals'
                    // || product.images.length > 1 && hovered ? product.images[1] : product.images[0]
                }
                    alt={product.name} height={300} width={200} className='transition-all duration-300'
                />
            </Link>
            <div className='p-3'>
                <h4 className='h4 line-clamp-1 !py-0'>{product.name}</h4>
                <div className='flex justify-between items-center pt-1'>
                    <p className='h5'>{product.category}</p>
                    <h5 className='h5 pr-2'>{product.price}</h5>
                </div>
                <p className='line-clamp-2 py-1 text-xs text-gray-400'>{product.description}</p>
            </div>
        </div>
    );
};

export default ProductCard;


