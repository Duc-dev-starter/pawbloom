import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MdError } from 'react-icons/md'

const ProductInputQuantity = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className='mt-5 flex flex-col gap-2 pt-[6px]'>
            <Label htmlFor='quantity' className='text-slate-600'>Số lượng sản phẩm</Label>
            <Input
                {...register("quantity", { valueAsNumber: true })}
                type='number'
                id='quantity'
                className='h-11 shadow-none'
                placeholder='nhập giá sản phẩm'
            />

            {errors.price && (
                <div className='flex items-center gap-1 text-sm text-red-500'>
                    <MdError />
                    <p>{errors.quantity?.message as string}</p>

                </div>
            )}
        </div>
    )
}

export default ProductInputQuantity