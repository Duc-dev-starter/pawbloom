"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Product } from '@/types/product';
import { getProducts } from '@/services/product';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [newProducts, setNewProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            // @ts-ignore
            const products = response.slice(0, 7);
            setNewProducts(products);
        }


        fetchProducts();
    }, [])
    return (
        <section className='pt-16'>
            <Swiper
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    300: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    600: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    900: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1300: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                }}
                modules={[Autoplay]}
                className='h-[399px] mt-5'
            >
                {
                    newProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    )
}


export default ProductList