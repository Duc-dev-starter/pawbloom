export type ProductStatus = 'published' | 'inactive' | 'draft';

export type Product = {
    id: string;
    name: string;
    supplier: string;
    category: 'dog-food' | 'cat-food';
    status: ProductStatus;
    quantity: number;
    price: number;
    description: string;
    createdAt: string;
};
