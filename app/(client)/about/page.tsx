import React from 'react'

import { Metadata } from 'next';
import { Faqs, Features, HeroSections, Testimonials } from '@/sections/about';

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
            <HeroSections />

            <Features />
            <Testimonials />
            <Faqs />
        </main>
    )
}
export default AboutPage