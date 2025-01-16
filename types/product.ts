import { Category } from "./category";

export type ProductStatus = 'published' | 'inactive' | 'draft';

export type Product = {
    id: string;
    name: string;
    supplier: string;
    category: string;
    status: ProductStatus;
    slug?:string;
    quantity: number;
    images : string[];
    price: number;
    description: string;
    createdAt: string;
};
