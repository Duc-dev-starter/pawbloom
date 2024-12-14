import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { MdError } from 'react-icons/md'

const InputProductImages = () => {
    return (
        <div className='mt-5 flex flex-col gap-2'>
            <Label htmlFor='images' className='text-slate-600'>Hình ảnh sản phẩm</Label>
            <div className='flex items-center gap-2'>
                <Input
                    type='text'
                    id="images"
                    className='h-11 shadow-none'
                    placeholder='hình ảnh sản phẩm...'
                />
            </div>

            {/* <div className='flex items-center gap-1 text-sm text-red-500'>
                <MdError />
                <p>Yêu cầu hình ảnh sản phẩm</p>
            </div> */}
        </div>
    )
}

export default InputProductImages