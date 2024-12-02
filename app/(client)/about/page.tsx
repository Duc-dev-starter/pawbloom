"use cache"
import React from 'react'

import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => ({
    title: 'Về chúng tôi',
    description: 'Tìm hiểu thêm về chúng tôi và sứ mệnh của chúng tôi.',
    keywords: ['về chúng tôi', 'sứ mệnh', 'nhiệm vụ'],
    openGraph: {
        title: 'Về chúng tôi',
        description: 'Tìm hiểu thêm về chúng tôi.',
        images: '/images/about.jpg',
    },
});

const About = async () => {
    return (
        <div>hello</div>
    )
}
export default About;