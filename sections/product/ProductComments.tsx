import ProductComment from '@/components/product/ProductComment'
import React from 'react'

const ProductComments = () => {
    return (
        <div className='flex flex-col gap-8 p-10 md:pl-28 lg:w-3/5'>
            <h1 className='text-xl text-gray-500 underline'>Bình luận</h1>
            <div className='flex w-full items-center justify-between gap-8'>
                <textarea name="" id="" placeholder='Viết bình luận...' className='w-full rounded-xl border p-4' />
                <button className='rounded-xl bg-brand-100 px-4 py-3 font-medium text-white'>Gửi</button>
            </div>
            <ProductComment />
        </div>
    )
}

export default ProductComments