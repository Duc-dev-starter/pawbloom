import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MdError } from 'react-icons/md'

const InputProductSupplier = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-5 flex flex-col gap-2'>
            <Label htmlFor='supplier' className='text-slate-600'>Tên nhà phân phối</Label>
            <div className='flex items-center gap-2'>
                <Input
                    {...register('supplier')}
                    type='text'
                    id="supplier"
                    className='h-11 shadow-none'
                    placeholder='nhà phân phối...'
                />
            </div>

            {errors.supplier && (
                <div className='flex items-center gap-1 text-sm text-red-500'>
                    <MdError />
                    <p>{errors.supplier?.message as string}</p>
                </div>
            )}
        </div>
    )
}

export default InputProductSupplier