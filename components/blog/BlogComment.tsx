import Images from '@/constants/image'
import Image from 'next/image'
import React from 'react'

const BlogComment = () => {
    return (
        <div className='mb-8 rounded-xl bg-slate-50 p-4'>
            <div>
                <Image src={Images.LOGO} alt='test' width={12} height={12} className='size-10 rounded-full object-cover' />
                <span className='font-medium'>John Doe</span>
                <span className='text-sm text-gray-500'>2 ngày trước</span>
            </div>
            <div className='mt-4'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe qui quod unde doloremque numquam ducimus totam, id dicta soluta, quam nobis expedita sequi at, labore quae architecto aspernatur non repellendus?</p>
            </div>
        </div>
    )
}

export default BlogComment