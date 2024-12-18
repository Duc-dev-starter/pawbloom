import { API } from '@/constants/api'
import Images from '@/constants/image'
import BlogComments from '@/sections/blog/BlogComments'
import { BaseService } from '@/services/baseService'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface BlogPostPageProps {
    params: { slug: string }
}

export async function generateMetadata({
    params: { slug },
}: BlogPostPageProps): Promise<Metadata> {
    const response = await BaseService.getById({ url: API.GET_UPDATE_DELETE_BLOG, id: slug });
    return {
        title: response.data.title,
        description: response.data.description,
        openGraph: {
            images: [
                {
                    url: response.data.images[0]
                }
            ]
        }
    }
}

export async function generateStaticParams() {
    const blogPosts = 
}



const BlogDetail = () => {
    return (
        <div className='flex flex-col gap-8 p-16'>
            <div className='flex gap-8'>
                <div className='flex flex-col gap-8 lg:w-3/5'>
                    <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis nulla nisi ducimus velit quas ratione. Nobis minima repellat maiores nisi reprehenderit deserunt, ex perspiciatis. Illum, neque ipsa! Vero, ullam ex.</h1>
                    <div className='flex items-center gap-2 text-sm text-gray-400'>
                        <span>Viết bởi</span>
                        <a href="" className='text-blue-800'>John Doe</a>
                        <span>ở</span>
                        <a href="" className='text-blue-800'>Web Design</a>
                        <span>vào 2 ngày trước</span>
                    </div>
                    <p className='font-medium text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quo aperiam molestiae cumque assumenda. Maxime in delectus dicta voluptatum id, aperiam eaque et. Nisi expedita et impedit voluptate rerum distinctio!</p>
                </div>
                <div className='hidden w-2/5 lg:block'>
                    <Image src={Images.LOGO} alt='test' width={120} height={120} className='rounded-2xl' />
                </div>
            </div>
            <div className='flex flex-col gap-8 md:flex-row'>
                <div className='flex flex-col gap-6 text-justify lg:text-lg'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, corrupti numquam neque pariatur suscipit esse quaerat in et id tempora explicabo veniam dolorum, illum similique est molestias expedita magni quae.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, corrupti numquam neque pariatur suscipit esse quaerat in et id tempora explicabo veniam dolorum, illum similique est molestias expedita magni quae.</p>
                </div>
                <div className='sticky top-8 h-max px-4'>
                    <h1>Author</h1>
                    <Image src="/assets/images/homepage.png" width={12} height={12} alt='test' className='size-12 rounded-full object-cover' />
                    <a href="">John Doe</a>
                    <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className='flex gap-2'>
                        <Link href="#">
                            <Image src="/assets/icons/facebook.svg" alt='facebook' width={12} height={12} />
                        </Link>
                        <Link href="#">
                            <Image src="/assets/icons/facebook.svg" alt='facebook' width={12} height={12} />
                        </Link>
                    </div>
                </div>
            </div>
            <BlogComments />
        </div>
    )
}

export default BlogDetail