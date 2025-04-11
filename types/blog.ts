export type BlogStatus = 'Published' | 'Inactive' | 'Draft';

export type Blog = {
    id: string;
    title: string;
    content: string;
    categoryName: string;
    authorName: string;
    status: string;
    description: string | null;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    img?: string;
}