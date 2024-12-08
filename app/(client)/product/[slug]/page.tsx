import MultiImages from '@/components/MultiImages';
import RelatedProduct from '@/sections/product/RelatedProduct';
import { notFound } from 'next/navigation';
import React from 'react';

// Fake API Function
async function fetchProduct(slug: string) {
    // Giả lập fetch từ API
    const productData = {
        id: '1',
        name: 'Mountain Retreat',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus nihil, repudiandae sint maiores...',
        images: [
            {
                id: 1,
                url: 'https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
            },
            {
                id: 2,
                url: 'https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
            },
            {
                id: 3,
                url: 'https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
            },
            {
                id: 4,
                url: 'https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
            },
        ],
        originalPrice: 59,
        discountedPrice: 49,
        additionalInfo:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda odit eius omnis, distinctio laudantium facere praesentium corrupti ullam asperiores cumque vel, officiis eveniet voluptas veniam soluta itaque illum quibusdam ducimus?',
    };

    // Giả lập nếu slug không khớp
    if (slug !== 'mountain-retreat') return null;

    return productData;
}

// Component hiển thị chi tiết sản phẩm
const ProductDetail = async ({ params }: { params: { slug: string } }) => {
    const product = await fetchProduct(params.slug);

    // Nếu không có sản phẩm, trả về 404
    if (!product) {
        notFound();
    }

    return (
        <>
            <div className="relative flex flex-col gap-16 px-4 py-10 md:px-8 lg:flex-row lg:px-16 xl:px-32 2xl:px-64">
                {/* Image Section */}
                <div className="top-20 h-max w-full lg:sticky lg:w-1/2">
                    <MultiImages
                        items={product.images.map((img) => ({
                            id: img.id,
                            image: { url: img.url },
                        }))}
                    />
                </div>

                {/* Product Info Section */}
                <div className="flex w-full flex-col gap-6 lg:w-1/2">
                    <h1 className="text-4xl font-medium">{product.name}</h1>
                    <p className="text-gray-500">{product.description}</p>
                    <div className="h-[2px] bg-gray-100"></div>

                    {/* Price */}
                    <div className="flex items-center gap-4">
                        <h3 className="text-xl text-gray-500 line-through">${product.originalPrice}</h3>
                        <h2 className="text-2xl font-medium">${product.discountedPrice}</h2>
                    </div>
                    <div className="h-[2px] bg-gray-100"></div>

                    {/* Additional Info */}
                    <div className="text-sm">
                        <h4 className="mb-4 font-medium">Title</h4>
                        <p>{product.additionalInfo}</p>
                    </div>
                </div>
            </div>
            <RelatedProduct />
        </>


    );
};

export default ProductDetail;
