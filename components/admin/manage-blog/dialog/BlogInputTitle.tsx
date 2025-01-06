import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MdError } from 'react-icons/md'

const BlogInputTitle = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className='mt-5 flex flex-col gap-2'>
            <Label htmlFor='title' className='text-slate-600'>Tiêu đề tin tức</Label>
            <div className='flex items-center gap-2'>
                <Input
                    {...register('title')}
                    type='text'
                    id="title"
                    className='h-11 shadow-none'
                    placeholder='tiêu đề tin tức...'
                />
            </div>

            {errors.title && (
                <div className='flex items-center gap-1 text-sm text-red-500'>
                    <MdError />
                    <p>{errors.title?.message as string}</p>
                </div>
            )}
        </div>
    )
}

export default BlogInputTitle