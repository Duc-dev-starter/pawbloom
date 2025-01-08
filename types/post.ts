export type PostStatus = 'published' | 'inactive' | 'draft';

export type Post = {
    id: string;
    title: string;
    content: string;
    author: string;
    status: PostStatus;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}