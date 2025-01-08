import Image from 'next/image'
import React from 'react'

const ProfileCard = () => {
    return (
        <div className='grid grid-cols-3'>
            <div>
                <Image className='rounded-2xl' />
            </div>
            <div className='flex flex-col gap-2'>

            </div>
        </div>
    )
}

export default ProfileCard