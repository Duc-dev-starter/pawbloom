"use client";

import { HeartIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';

type Product = {
    id: string;
    name: string;
    price: string;
    image: string;
    rating: number;
    reviews: number;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const router = useRouter();

    const navigateToHome = () => {
        router.push('/');
    };

    return (
        <div className="overflow-hidden p-3">
            {/* Image Section */}
            <div className="relative cursor-pointer rounded-lg bg-gray-100 p-10">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={240}
                    height={240}
                    className="h-auto w-full rounded-md object-cover"
                />
                <div className="absolute right-2 top-2 cursor-pointer rounded-full bg-white p-1 shadow-md hover:bg-gray-200">
                    <HeartIcon className="size-4" />
                </div>

            </div>

            {/* Product Info */}
            <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-10">
                    <p className="text-base font-semibold">{product.name}</p>
                    <p className="text-base font-bold text-brand">{product.price}</p>
                </div>
                <p className="text-sm text-gray-500">Iphone</p>

                {/* Rating Section */}
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, index) => (
                        <StarIcon key={index} className="size-4 text-yellow-400" />
                    ))}
                    <p className="text-sm text-gray-600">({product.reviews})</p>
                </div>

                {/* Add to Cart Button */}
                <Button
                    variant="outline"
                    className="border-black bg-white text-black hover:border-none hover:bg-brand hover:text-white"
                    onClick={navigateToHome}
                >
                    Thêm vào giỏ hàng
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
