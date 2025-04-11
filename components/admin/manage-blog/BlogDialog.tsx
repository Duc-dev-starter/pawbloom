import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import React, { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseService } from '@/services/baseService'
import { useToast } from '@/hooks/use-toast'
import BlogTabStatus from './dialog/BlogTabStatus'
import BlogTextareaDescription from './dialog/BlogTextareaDescription'
import BlogInputTitle from './dialog/BlogInputTitle'
import BlogTextareaContent from './dialog/BlogTextareaContent'
import BlogSelectAuthor from './dialog/BlogSelectAuthor'
import BlogSelectCategory from './dialog/BlogSelectCategory'
import { BlogFormData, BlogSchema } from '@/schema/blog'
import { Blog } from '@/types/blog'

const BlogDialog = () => {
    const { toast } = useToast();
    const dialogCloseRef = useRef<HTMLButtonElement | null>(null)
    const methods = useForm<BlogFormData>({
        resolver: zodResolver(BlogSchema),
        defaultValues: {
            title: '',
            content: '',
            description: '',
            authorName: '',
            categoryName: '',
        },
    })

    const { reset } = methods;

    const [selectedTab, setSelectedTab] = useState('published')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedAuthor, setSelectedAuthor] = useState('')


    const onSubmit = async (data: BlogFormData) => {
        console.log('Form Data:', data);
        const newBlog: Blog = {
            title: data.title,
            description: data.description,
            // @ts-expect-error
            authorName: data.authorName,
            content: data.content,
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: selectedTab,
            categoryName: selectedCategory,
            createdAt: new Date().toISOString(),
            id: ''
        }
        console.log('New product:', newBlog)
        const response = await BaseService.post({ url: '/api/blogs', payload: newBlog });
        if (response) {
            toast({
                title: 'Thành công',
                description: 'Blog đã được thêm thành công',
            });
            dialogCloseRef.current?.click();
        }
    }


    console.log('Form errors:', methods.formState.errors);

    const handleReset = () => {
        reset();
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='h-10'>Thêm bài blog</Button>
            </DialogTrigger>
            <DialogContent className='max-w-5xl p-7 px-8'>
                <DialogHeader>
                    <DialogTitle className='text-[22px]'>Thêm bài blog</DialogTitle>
                    <DialogDescription>
                        Điền tất cả thông tin vào form để thêm blog mới
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <FormProvider {...methods}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log('Form submitted!');
                            methods.handleSubmit(onSubmit)(e);
                        }}
                    >
                        <div className='mt-1 flex flex-col gap-2'>
                            <div className='grid grid-cols-2 gap-7'>
                                <BlogInputTitle />
                                <BlogTextareaDescription />

                            </div>

                            <div className='grid grid-cols-2 items-center gap-5'>
                                <BlogSelectAuthor
                                    selectedAuthor={selectedAuthor}
                                    setSelectedAuthor={setSelectedAuthor}
                                />
                                <BlogSelectCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                            </div>

                            <div className='grid grid-cols-2 items-center gap-5'>
                                <BlogTabStatus selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                                <BlogTextareaContent />

                            </div>

                        </div>
                        <DialogFooter className='mb-2 mt-3 flex items-center'>
                            <DialogClose onClick={handleReset} asChild>
                                {/* <Button type="button" variant="secondary">
                                    Đóng
                                </Button> */}
                            </DialogClose>
                            <Button type='submit' className='h-11 px-11'>Thêm blog</Button>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}

export default BlogDialog