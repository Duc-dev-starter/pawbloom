import BlogDetail from '@/components/blog/BlogDetail';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Chi tiết',
    description: 'Chi tiết bài viết',
};

const BlogPageDetail = ({ params: { slug } }: { params: { slug: string } }) => {
    return <BlogDetail slug={slug} />;
};

export default BlogPageDetail;