import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { MdError } from 'react-icons/md'

const BlogTextareaContent = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='mt-5 flex flex-col gap-2'>
            <Label htmlFor='content' className='text-slate-600'>Nội dung tin tức</Label>
            <div className='flex items-center gap-2'>
                <Textarea {...register('content')} id='content' className='h-11 shadow-none' placeholder='nội dung tin tức' />
            </div>

            {errors.content && (
                <div className='flex items-center gap-1 text-sm text-red-500'>
                    <MdError />
                    <p>{errors.content?.message as string}</p>
                </div>
            )}
        </div>
    )
}

export default BlogTextareaContent