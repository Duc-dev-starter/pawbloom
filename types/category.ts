export type CategoryStatus = 'published' | 'inactive' | 'draft';

export type Category = {
    id: string;
    name: string; 
    author: string;
    status: CategoryStatus
    description: string;
    createdAt: string; 
    updatedAt: string; 
}