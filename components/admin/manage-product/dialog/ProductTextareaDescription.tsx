import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MdError } from 'react-icons/md'

const ProductTextareaDescription = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-5 flex flex-col gap-2'>
            <Label htmlFor='description' className='text-slate-600'>Mô tả sản phẩm</Label>
            <div className='flex items-center gap-2'>
                <Textarea {...register('description')} id='description' className='h-11 shadow-none' placeholder='giới thiệu sản phẩm' />
            </div>

            {errors.description && (
                <div className='flex items-center gap-1 text-sm text-red-500'>
                    <MdError />
                    <p>{errors.description?.message as string}</p>
                </div>
            )}
        </div>
    )
}

export default ProductTextareaDescription