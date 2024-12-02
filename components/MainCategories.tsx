import Link from 'next/link'
import React from 'react'

const MainCategories = () => {
    return (
        <div className='hidden items-center justify-center gap-8 rounded-3xl bg-white p-4 shadow-lg md:flex xl:rounded-full'>
            <div className='flex flex-1 flex-wrap items-center justify-between'>
                <Link href="/blog" className='rounded-full bg-brand px-4 py-2 text-white'>
                    All Posts
                </Link>

                <Link href="/blog?c=meo" className='rounded-full px-4 py-2 text-black'>
                    Mèo
                </Link>

                <Link href="/blog?c=meo" className='rounded-full px-4 py-2 text-black'>
                    Chó
                </Link>

                <Link href="/blog?c=meo" className='rounded-full px-4 py-2 text-black'>
                    Chó2
                </Link>

                <Link href="/blog?c=meo" className='rounded-full px-4 py-2 text-black'>
                    Chó2
                </Link>

                <Link href="/blog?c=meo" className='rounded-full px-4 py-2 text-black'>
                    Chó2
                </Link>
            </div>
            <span className='text-xl font-medium'>|</span>
            <div className='flex items-center gap-2 rounded-full bg-gray-100 p-2'>
                <svg xmlns='http:www.w3.org/2000/svg' viewBox='0 0 24 24' width="20" height="20" fill='none' stroke='gray'>
                    <circle cx="10.5" cy="10.5" r="7.5" />
                    <line x1="16.5" y1="16.5" x2="22" y2="22" />
                </svg>
                <input type="text" placeholder='tìm kiếm bài viết...' className='bg-transparent' />
            </div>
        </div>
    )
}

export default MainCategories