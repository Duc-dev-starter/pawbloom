import HistoryList from '@/components/admin/history/HistoryList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Metadata } from 'next';
import React from 'react'


export const generateMetadata = async (): Promise<Metadata> => ({
    title: 'Lịch sử',
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


const HistoryPage = () => {
    return (
        <div className="p-8">
            <div>
                <h1 className="text-2xl font-bold">Lịch sử giao dịch</h1>
                <p className="text-gray-600">Xem và quản lý lịch sử nhận nuôi thú cưng của bạn</p>
            </div>
            <div className='flex flex-col gap-3 mb-8 mt-6'>
                <div className='flex items-center justify-between'>
                    <Input placeholder='Tìm theo mã' className='max-w-sm h-10' />
                    <div className='flex items-center gap-4'>
                        <Button variant={'secondary'}>Trạng thái</Button>
                    </div>
                </div>
            </div>
            <HistoryList />
        </div>
    )
}

export default HistoryPage