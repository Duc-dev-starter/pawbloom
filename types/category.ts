export type CategoryStatus = 'Published' | 'Inactive' | 'Draft';

export type Category = {
    id: string;
    name: string;
    author: string;
    status: CategoryStatus
    description: string;
    createdAt: string;
    updatedAt: string;
}