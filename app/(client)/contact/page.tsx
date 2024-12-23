import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Metadata } from 'next';
import React from 'react';

export const generateMetadata = (): Metadata => ({
    title: 'Liên hệ',
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

const ContactPage = () => {
    return (
        <div className="p-8">
            <h1 className="h1 text-center">Liên hệ</h1>
            <p className="text-center text-base">Nếu có bất kì thắc mắc gì, hãy liên hệ với chúng tôi qua email.</p>
            <p className="text-center text-base">Chúng tôi rất vui lòng nhận các thông tin từ các bạn.</p>

            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                {/* Phần gửi email */}
                <div className="w-full rounded-lg bg-white p-6 md:w-1/2">
                    <h2 className="mb-4 text-lg font-semibold">Gửi Email</h2>
                    <div className="mb-4">
                        <Label htmlFor="name" className="text-slate-600">Tên</Label>
                        <Input id="name" type="text" placeholder="Tên người gửi" className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="email" className="text-slate-600">Email</Label>
                        <Input id="email" type="email" placeholder="email@gmail.com" className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="message" className="text-slate-600">Nội dung</Label>
                        <textarea
                            id="message"
                            rows={6}
                            placeholder="Nội dung..."
                            className="mt-2 w-full rounded-md border p-2"
                        />
                    </div>
                    <Button className="w-1/6 bg-brand-100">Gửi</Button>
                </div>

                {/* Phần thông tin liên hệ */}
                <div className="w-full rounded-lg bg-white p-6 md:w-1/2">
                    <h2 className="mb-4 text-lg font-semibold">Thông Tin Liên Hệ</h2>
                    <p className="mb-3 text-slate-600">
                        <strong>Địa chỉ:</strong> 123 Đường ABC, Phường XYZ, Thành phố Hồ Chí Minh
                    </p>
                    <p className="mb-3 text-slate-600">
                        <strong>Số điện thoại:</strong> +84 123 456 789
                    </p>
                    <p className="mb-3 text-slate-600">
                        <strong>Email:</strong> contact@pawbloom.com
                    </p>
                    <p className="text-slate-600">
                        Chúng tôi sẵn sàng hỗ trợ bạn từ 9:00 sáng đến 6:00 chiều các ngày trong tuần.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;