export type Product = {
    id: string;
    name: string;
    supplier: string;
    category: 'dog-food' | 'cat-food';
    status: 'published' | 'inactive' | 'draft';
    quantity: number;
    price: number;
    description: string
    createdAt: string;
}