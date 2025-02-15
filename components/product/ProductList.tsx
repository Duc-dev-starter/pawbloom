"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "./ProductCard";

const ProductList = ({ sortOrder }: { sortOrder: "newest" | "oldest" }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                setProducts(response.data);
                console.log(response)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [sortOrder]);

    return (
        <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 p-6">
                {loading
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))
                    : products.map((product) => (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </>
    );
};

export default ProductList;