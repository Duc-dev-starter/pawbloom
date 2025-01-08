export type BlogStatus = 'published' | 'inactive' | 'draft';

export type Blog = {
    id: string;
    title: string;
    content: string;
    author: string;
    status: BlogStatus;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}