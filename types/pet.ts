export type Pet = {
    id: string;
    name: string;
    type: 'dog' | 'cat';
    breed: string;
    age: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    ownerId: string;
    images: string[];
}