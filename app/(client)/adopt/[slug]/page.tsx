import Image from 'next/image';
import React from 'react'

interface PetDetailPageProps {
    params: {
        slug: string;
    }
}

const AdoptPageDetail = ({ params }: PetDetailPageProps) => {
    const { slug } = params;
    return (
        <section className='px-16 py-8 min-h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='flex flex-col justify-center gap-6'>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-6xl font-bold capitalize text-white drop-shadow-sm'>J97</h1>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-2xl font-bold'>Abilities</h2>
                </div>
            </div>
            <div className='relative flex justify-center items-center'>
                <Image src="/assets/images/homepage.png" alt='test' width={700} height={700}
                    className='absolute opacity-15 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' />
                <Image src="/assets/images/homepage.png" alt='test' width={500} height={500}
                    className='relative z-10 filter drop-shadow-lg' />
            </div>
        </section>
    )
}

export default AdoptPageDetail