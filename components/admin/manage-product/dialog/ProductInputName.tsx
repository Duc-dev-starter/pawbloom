import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MdError } from 'react-icons/md'

const ProductInputName = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className='mt-5 flex flex-col gap-2'>
            <Label htmlFor='name' className='text-slate-600'>Tên sản phẩm</Label>
            <div className='flex items-center gap-2'>
                <Input
                    {...register('name')}
                    type='text'
                    id="name"
                    className='h-11 shadow-none'
                    placeholder='tên sản phẩm...'
                />
            </div>

            {errors.name && (
                <div className='flex items-center gap-1 text-sm text-red-500'>
                    <MdError />
                    <p>{errors.name?.message as string}</p>
                </div>
            )}
        </div>
    )
}

export default ProductInputName