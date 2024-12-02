import MultiImages from '@/components/MultiImages';
import React from 'react'

const images = [
    {
        id: 1,
        image: {
            url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        },
    },
    {
        id: 2,
        image: {
            url: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        },
    },
    {
        id: 3,
        image: {
            url: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        },
    },
    {
        id: 4,
        image: {
            url: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        },
    },
];


const ProductDetail = () => {
    return (
        <div className='relative flex flex-col gap-16 px-4 py-10 md:px-8 lg:flex-row lg:px-16 xl:px-32 2xl:px-64'>
            <div className='top-20 h-max w-full lg:sticky lg:w-1/2'>
                <MultiImages items={images} />
            </div>
            <div className='flex w-full flex-col gap-6 lg:w-1/2'>
                <h1 className='text-4xl font-medium'>Product name</h1>
                <p className='text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus nihil, repudiandae sint maiores, illum, corrupti reprehenderit facere animi accusamus eligendi modi rerum expedita molestias odit? Eum nihil voluptate distinctio earum!</p>
                <div className='h-[2px] bg-gray-100'></div>
                <div className='flex items-center gap-4'>
                    <h3 className='text-xl text-gray-500 line-through'>$59</h3>
                    <h2 className='text-2xl font-medium'>$49</h2>
                </div>
                <div className='h-[2px] bg-gray-100'></div>
                <div className='text-sm'>
                    <h4 className='mb-4 font-medium'>Title</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda odit eius omnis, distinctio laudantium facere praesentium corrupti ullam asperiores cumque vel, officiis eveniet voluptas veniam soluta itaque illum quibusdam ducimus?</p>

                </div>
            </div>
        </div>
    )
}

export default ProductDetail