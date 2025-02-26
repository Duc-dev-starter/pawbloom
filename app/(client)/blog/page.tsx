import CardNews from "@/components/blog/CardNews";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Metadata } from 'next';
import Image from 'next/image';
import flag from '../../../public/assets/icons/flag.png';

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
            {/* Hero section with responsive adjustments */}
            <div className='min-h-[300px] w-full bg-[url("/assets/images/newspost.png")] bg-cover bg-center bg-no-repeat text-white md:h-[400px] lg:h-[600px]'>
                <div className='mx-2 flex h-full flex-col items-end justify-between md:mx-6 md:flex-row'>
                    <section className='flex w-full flex-col gap-2 p-4 md:w-3/5 md:gap-4 md:p-6 lg:w-2/5 lg:p-10'>
                        <button className='w-fit rounded-full border-2 bg-white px-4 py-2 text-sm font-semibold text-slate-800 duration-300 hover:bg-brand md:px-8 md:py-3 md:text-base lg:px-12 lg:py-4 lg:text-xl'>Động vật</button>
                        <p className="w-fit text-lg font-semibold md:text-xl lg:text-2xl">Ngày Hội Nhận Nuôi Thú Cưng Thành Công</p>
                        <p className="text-sm font-medium md:text-base">Sự kiện &quot;Ngày Hội Nhận Nuôi Thú Cưng&quot; đã diễn ra tại Công viên Thống Nhất, TP. HCM.
                            Sự kiện thu hút hơn 300 người tham dự và đã có hơn 50 thú cưng.</p>
                    </section>
                    <section className='flex flex-col items-start gap-2 p-4 text-white md:p-6 lg:p-10'>
                        <div className="flex items-center gap-2">
                            <div className="relative size-5 md:size-6">
                                <Image src={flag.src} alt="flag" width={20} height={20} />
                            </div>
                            <span className="text-base font-semibold md:text-lg lg:text-xl">John Doe</span>
                        </div>
                        <div className="text-xs md:text-sm">
                            <span>Dec 1, 2023</span>
                            <span className="mx-1">•</span>
                            <span>5 min read</span>
                        </div>
                    </section>
                </div>
            </div>

            {/* Main content with responsive grid */}
            <div className="mx-auto w-full px-4 md:w-11/12 lg:w-5/6">
                <div className='mt-6 md:mt-8 lg:mt-10'>
                    <div>
                        <p className='text-xl font-bold md:text-2xl lg:text-3xl'>Tin Tức</p>
                        <p className='text-sm text-gray-400 md:text-base'>Ở đây, chúng tôi chia sẽ những câu chuyện về những bé thú cưng</p>
                    </div>
                </div>

                {/* Tabs with responsive layout */}
                <div className='my-4 md:my-6'>
                    <Tabs defaultValue="animal" className="w-full">
                        <div className="flex flex-col justify-between gap-4 md:mb-0 md:flex-row md:items-center md:gap-0">
                            <TabsList className="grid h-fit w-full grid-cols-2 gap-2 md:w-fit md:grid-cols-5">
                                <TabsTrigger value="animal" className="whitespace-nowrap text-xs md:w-full md:text-sm">Động vật</TabsTrigger>
                                <TabsTrigger value="dogs" className="whitespace-nowrap text-xs md:w-full md:text-sm">Chó</TabsTrigger>
                                <TabsTrigger value="cats" className="whitespace-nowrap text-xs md:w-full md:text-sm">Mèo</TabsTrigger>
                                <TabsTrigger value="adopt" className="whitespace-nowrap text-xs md:w-full md:text-sm">Nhận nuôi</TabsTrigger>
                                <TabsTrigger value="stations" className="whitespace-nowrap text-xs md:w-full md:text-sm">Trạm cứu hộ</TabsTrigger>
                            </TabsList>

                            <Select>
                                <SelectTrigger className="w-fit">
                                    <SelectValue placeholder="Sắp xếp theo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Sắp xếp theo</SelectLabel>
                                        <SelectItem value="news_newest">Bài mới nhất</SelectItem>
                                        <SelectItem value="old_news">Bài cũ nhất</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* TabsContent with responsive grid */}
                        <TabsContent value="animal">
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                            </div>
                        </TabsContent>

                        <TabsContent value="dogs">
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                            </div>
                        </TabsContent>

                        <TabsContent value="cats">
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                            </div>
                        </TabsContent>

                        <TabsContent value="adopt">
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                            </div>
                        </TabsContent>

                        <TabsContent value="stations">
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                                <CardNews />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default BlogPage;