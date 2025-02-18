
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import flag from '../../../public/assets/icons/flag.png'
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react'
import CardNews from "@/components/blog/CardNews"
export const generateMetadata = async (): Promise<Metadata> => ({
    title: 'Tin tức',
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

const BlogPage = () => {
    return (
        <>
            <div className='h-[600px] w-screen bg-[url("/assets/images/newspost.png")] bg-cover bg-no-repeat text-white'>
                <div className='mx-6 flex h-full items-end justify-between'>
                    <section className='flex w-1/3 flex-col gap-4'>
                        <button className='w-fit rounded-full border-2 bg-white px-4 py-2 text-sm text-slate-800 duration-300 hover:bg-brand'>Động vật</button>
                        <p>Ngày Hội Nhận Nuôi Thú Cưng Thành Công</p>
                        <p>Sự kiện “Ngày Hội Nhận Nuôi Thú Cưng” đã diễn ra tại Công viên Thống Nhất, TP. HCM.
                            Sự kiện thu hút hơn 300 người tham dự và đã có hơn 50 thú cưng.</p>
                    </section>
                    <section className='flex flex-col items-start gap-2 text-white'>
                        <div className="flex items-center gap-2">
                            <Image src={flag.src} alt="flag" width={20} height={20} />
                            <span className="  ">John Doe</span>
                        </div>
                        <div className="">
                            <span className="">Dec 1, 2023</span>
                            <span className="">•</span>
                            <span className="">5 min read</span>
                        </div>
                    </section>
                </div>
            </div>

            <div>
                <p className='h2'>Tin Tức</p>
                <p className='text-gray-400'>Ở đây, chúng tôi chia sẽ những câu chuyện về những bé thú cưng</p>
                <div className='py-10'>
                    <Tabs defaultValue="account" className="size-fit">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="animal">động vật</TabsTrigger>
                            <TabsTrigger value="cat">Mèo</TabsTrigger>
                            <TabsTrigger value="dog">Chó</TabsTrigger>
                            <TabsTrigger value="rescue">Trạm cứu trợ</TabsTrigger>
                            <TabsTrigger value="adoption">Người nhận nuôi</TabsTrigger>
                        </TabsList>
                        <TabsContent value="animal" className="flex flex-wrap justify-center gap-4">
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                        </TabsContent>
                        <TabsContent value="cat" className="flex flex-wrap justify-center gap-4 ">
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                        </TabsContent>
                        <TabsContent value="dog" className="flex flex-wrap justify-center gap-4">
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                        </TabsContent>
                        <TabsContent value="rescue" className="flex flex-wrap justify-center gap-4">
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                        </TabsContent>
                        <TabsContent value="adoption" className="flex flex-wrap justify-center gap-4">
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                            <CardNews />
                        </TabsContent>
                    </Tabs>
                </div>

            </div>
        </>
    )
}

export default BlogPage