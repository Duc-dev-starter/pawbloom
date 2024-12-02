import FeaturePost from '@/components/blog/FeaturePost'
import MainCategories from '@/components/MainCategories'
import React from 'react'

const Blog = () => {
    return (
        <div className='lx:px-32 px-4 md:px-8 lg:px-16 2xl:px-64'>
            <div className='mt-5'>
                <MainCategories />
                <FeaturePost />
            </div>
        </div>
    )
}

export default Blog