import React from 'react'
import { columns } from './columns'
import { Metadata } from 'next'
import { DataTablePosts } from './data-table';

async function getDataPost(): Promise<any[]> {
    // Fetch data from your API here.
    return [
        {
            id: "1",
            name: "Johne Doe",
            status: "operational",
            address: "",
            phoneNumber: '',
            description: "",
            createdAt: "2024-12-01T10:30:00.000Z", // Example ISO 8601 date
            updatedAt: "2024-12-01T10:30:00.000Z",
        },
        {
            id: "2",
            name: "sản phẩm cho chó",
            status: "operational",
            phoneNumber: '',
            address: "",
            description: "",
            createdAt: "2024-12-01T10:30:00.000Z", // Example ISO 8601 date
            updatedAt: "2024-12-01T10:30:00.000Z",
        },
    ]
}

export const generateMetadata = async (): Promise<Metadata> => ({
    title: 'Quản lí trạm cứu hộ',
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


const ManagePostPage = async () => {
    const posts = await getDataPost()
    return (
        <DataTablePosts columns={columns} data={posts} />
    )
}

export default ManagePostPage;
