import React from 'react'
import { columns } from './columns'
import { Blog } from '@/types/blog'
import { DataTableBlog } from './data-table'
import { Metadata } from 'next'

async function getDataBlog(): Promise<Blog[]> {
    // Fetch data from your API here.
    return [
        {
            id: "1",
            title: "sản phẩm cho mèo",
            status: "draft",
            description: '',
            createdAt: "2024-12-01T10:30:00.000Z", // Example ISO 8601 date
            updatedAt: "2024-12-01T10:30:00.000Z",
            author: 'duc',
            content: '',
            category: ''
        },
        {
            id: "2",
            title: "sản phẩm cho chó",
            status: "draft",
            description: '',
            createdAt: "2024-12-01T10:30:00.000Z", // Example ISO 8601 date
            updatedAt: "2024-12-01T10:30:00.000Z",
            author: 'duc',
            content: '',
            category: ''
        },
    ]
}

export const generateMetadata = async (): Promise<Metadata> => ({
    title: 'Quản lí tin tức',
    description: 'Pawbloom – Nơi kết nối những trái tim yêu thương với những chú thú cưng cần được yêu thương. Chúng tôi giúp tạo dựng mái ấm mới và mang lại cơ hội thứ hai cho thú cưng từ các trạm cứu trợ.',
    keywords: ['Pawbloom', 'nhận nuôi thú cưng', 'trạm cứu trợ', 'yêu thương thú cưng', 'mái ấm thú cưng'],
    openGraph: {
        title: 'Pawbloom - Tìm kiếm thú cưng cho bạn',
        description: 'Khám phá những bé thú cưng dễ thương đang cần mái ấm. Hãy để Pawbloom giúp bạn tìm thấy người bạn đồng hành hoàn hảo!',
        images: '/assets/images/homepage.png',
        url: 'https://pawbloom.com',
        type: 'website',
    },
});

const ManageBlogs = async () => {
    const blogs = await getDataBlog()
    return (
        <DataTableBlog columns={columns} data={blogs} />
    )
}

export default ManageBlogs;
