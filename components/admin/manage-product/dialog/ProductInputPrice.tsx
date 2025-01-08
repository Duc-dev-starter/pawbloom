import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MdError } from 'react-icons/md'

const ProductInputPrice = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className='mt-5 flex flex-col gap-2 pt-[6px]'>
            <Label htmlFor='price' className='text-slate-600'>Giá sản phẩm</Label>
            <Input
                {...register("price", { valueAsNumber: true })}
                type='number'
                id='price'
                className='h-11 shadow-none'
                placeholder='nhập giá sản phẩm'
            />

            {errors.price && (
                <div className='flex items-center gap-1 text-sm text-red-500'>
                    <MdError />
                    <p>{errors.price?.message as string}</p>
                </div>
            )}
        </div>
    )
}


export default ProductInputPrice