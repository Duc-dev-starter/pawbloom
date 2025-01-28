
// ProductCard Component

import Link from "next/link";
import CustomCard from "./CustomCard";



const ProductCard = ({ product }) => {
    return (
        <CustomCard className="cursor-pointer">
            <Link href={`/product/${product.id}`}>
                <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.title}
                    className="w-full h-fit object-cover rounded-2xl mb-4"
                />
                <div className="mb-2">
                    <h2 className="text-lg font-semibold truncate">{product.title}</h2>
                </div>
                <p className="text-sm text-gray-600">${product.price}</p>
            </Link>
        </CustomCard>
    );
};

export default ProductCard;