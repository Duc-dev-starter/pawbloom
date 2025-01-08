import React from 'react';

type ProductCardProps = {
    product: {
        id: string;
        name: string;
        price: number;
        description: string;
        slug: string;
    };
    onViewDetails: () => void;
};

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
    return (
        <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-500 font-bold">${product.price}</p>
            <button
                onClick={onViewDetails}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                View Details
            </button>
        </div>
    );
};

export default ProductCard;
