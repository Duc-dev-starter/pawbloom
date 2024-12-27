import React from 'react'

import { Metadata } from 'next';
import { ChevronRight, ImageIcon, Package2, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedGradientText from '@/components/ui/animated-gradient-text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaStar } from 'react-icons/fa6';
import Marquee from '@/components/ui/marquee';
import Image from 'next/image';
import { avatar, heroImages } from '@/constants/about';
import { Faqs, Testimonials } from '@/sections/about';

export const generateMetadata = (): Metadata => ({
    title: 'Về chúng tôi',
    description: 'Tìm hiểu thêm về chúng tôi và sứ mệnh của chúng tôi.',
    keywords: ['về chúng tôi', 'sứ mệnh', 'nhiệm vụ'],
    openGraph: {
        title: 'Về chúng tôi',
        description: 'Tìm hiểu thêm về chúng tôi.',
        images: '/images/about.jpg',
    },
});




const featureList = [
    {
        title: "Lý do thành lập",
        description: "PawBloom ra đời nhằm giải quyết vấn đề ngày càng tăng về thú cưng bị bỏ rơi dẫn đến những ảnh hưởng đến tính mạng của các bé và khó khăn trong việc kết nối những người nhận nuôi với các trung tâm cứu hộ. Cách tạo ra một nền tảng tập trung, giúp quá trình nhận nuôi nên dễ dàng và nhanh chóng hơn.",
        icon: <ImageIcon className='size-6' strokeWidth={1.5} />
    },
    {
        title: "Vì tương lai tốt đẹp cho những người bạn bốn chân",
        description: "PawBloom được thành lập với mục tiêu kết nối những trạm cứu trợ động vật với những người có lòng yêu thương, sẵn sàng trao cho các bé một mái ấm mới Chúng tôi tin rằng mỗi chú chó, chú mèo đều xứng đáng có một cuộc sống tốt đẹp hơn và nhiệm vụ của chúng tôi là trở thành cầu nối giúp hiện thực hóa ước mơ đó.",
        icon: <Package2 className='size-6' strokeWidth={1.5} />
    },
    {
        title: "Sứ mệnh",
        description: "Sứ mệnh của Pawbloom là tạo ra một nền tàng đơn giản và nhân văn, kết nối thú cưng cần nhà với những người yêu thương chúng. Bằng cách cung cấp dịch vụ toàn diện để sử dụng. Pawbloom mong muốn giảm thiểu số lượng thú cưng vô gia cư và thúc đẩy việc nuôi dưỡng thú cưng có trách nhiệm",
        icon: <PanelLeft className='size-6' strokeWidth={1.5} />
    },
]


const MarqueeColumn = ({
    reverse, duration, className
}: {
    reverse: boolean,
    duration: string,
    className?: string
}) => {
    return <Marquee reverse={reverse} pauseOnHover vertical className={cn("w-full relative h-full flex flex-col justify-center items-center", className)}
        style={{
            "--duration": duration
        }}
    >
        {
            heroImages.sort(() => Math.random() - 0.5).map((image, index) => (
                <Image key={index} src={image.src} alt={image.alt} height={200} width={200} priority className='size-full
                  rounded object-cover opacity-[.25] transition-opacity duration-300 
                  ease-in-out hover:opacity-100'/>
            ))
        }
    </Marquee>
}


const AboutPage = () => {
    return (
        // <div className='p-10 flex flex-col'>
        //     <div>
        //         <h2 className='h2 text-center text-brand-200'>Về chúng tôi</h2>
        //         <p className='text-center text-brand-100'>Những con người đã tạo nên Pawbloom</p>



        //     </div>
        //     <div></div>
        // </div>

        <main className='flex min-h-screen flex-col items-center justify-center'>
            <section className='relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden'>
                <div className='relative z-40 mx-auto flex w-fit flex-col items-center justify-center space-y-4 px-6 text-center backdrop-blur-[2px] sm:px-0'>
                    <AnimatedGradientText>
                        🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                        <span
                            className={cn(
                                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                            )}
                        >
                            Cùng khám phá về chúng tôi
                        </span>
                        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </AnimatedGradientText>
                    <h1 className='text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>Cùng khám phá về chúng tôi</h1>
                    <p className='mx-auto mb-8 max-w-3xl text-gray-600 text-sm xs:text-base sm:text-lg md:text-xl'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, eaque, blanditiis atque sed ut ipsum quae nulla totam, magni obcaecati aperiam voluptatum quod deserunt inventore? Asperiores impedit sunt adipisci perspiciatis?</p>
                    <div className='mb-4 flex items-center space-x-2'>
                        <div className='mb-4 flex items-center -space-x-5 overflow-hidden sm:-space-x-4'>
                            {
                                avatar.map((avatar, index) => (
                                    <Avatar key={index} className='inline-block border-2 border-background'>
                                        <AvatarImage src={avatar.src} className='h-full object-cover' />
                                        <AvatarFallback>{avatar.fallback}</AvatarFallback>
                                    </Avatar>
                                ))
                            }
                        </div>
                        <span className='text-sm font-medium'>Được yêu thích bởi hơn 100 khách hàng</span>
                    </div>
                    <Link href="#">
                        <Button className='h-12 rounded-md text-base'>
                            <span><FaStar className='text-yellow-400' /></span>Nhận nuôi thú cưng đầu tiên ngay <span><FaStar className='text-yellow-400' /></span>
                        </Button>
                    </Link>
                </div>
                <div className='absolute top-0 z-10 grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                    <MarqueeColumn reverse={false} duration='120s' />
                    <MarqueeColumn reverse={true} duration='120s' />
                    <MarqueeColumn reverse={false} duration='120s' />
                    <MarqueeColumn reverse={true} duration='120s' className='hidden md:flex' />
                    <MarqueeColumn reverse={false} duration='120s' className='hidden lg:flex' />
                    <MarqueeColumn reverse={true} duration='120s' className='hidden lg:flex' />
                </div>
            </section>

            <section id='features' className='w-full py-32 flex flex-col items-center justify-center'>
                <div className='container px-6 xs:px-8 sm:px-0 sm:mx-8 lg:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative bg-muted'>
                    <div className='col-span-full space-y-4'>
                        <AnimatedGradientText className='ml-0 bg-background backdrop-blur-0'>
                            <span
                                className={cn(
                                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                                )}
                            >
                                Introducing Magic UI
                            </span>
                            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                        </AnimatedGradientText>
                        <h2 className='text-2xl font-bold xs:text-3xl sm:text-4xl'>Unlock unlimited possibilities</h2>
                        <p className='text-sm text-muted-foreground xs:text-base lg:max-w-[75%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, iure ipsum corrupti ad deserunt voluptates sequi architecto, harum eligendi porro nulla pariatur cupiditate rem quos aliquid, facilis nemo maxime autem.</p>
                    </div>

                    <div className='order-2 flex flex-col items-start justify-start lg:order-1'>
                        {
                            featureList.map(feature => (
                                <div key={feature.title} className='flex items-start gap-2 rounded-lg py-8 sm:gap-4 lg:p-12'>
                                    <span className='rounded-md bg-muted p-0 text-foreground sm:bg-foreground sm:p-2 sm:text-background'>{feature.icon}</span>
                                    <div>
                                        <h3 className='text-xl font-medium sm:text-2xl'>{feature.title}</h3>
                                        <p className='text-sm text-muted-foreground xs:text-base'>{feature.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className={cn("h-fit lg:sticky top-32 pl-16 pt-16 rounded-lg border border-r-gray-300 border-b-gray-300 animate-gradient bg-gradient-to-r from-[#627fab] via-[#b95480] to-[#627fab] bg-[length:var(--bg-size)_100%] [--bg-size:400%] order-1 lg:order-2")}>
                        <Image src="/assets/images/homepage.png" alt='test' width={120} height={120} className='w-full h-auto rounded-tl-lg' />
                    </div>
                </div>
            </section>
            <Testimonials />
            <Faqs />
        </main>
    )
}
export default AboutPage