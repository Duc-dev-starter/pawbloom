import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import React, { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseService } from '@/services/baseService'
import { useToast } from '@/hooks/use-toast'
import { Category } from '@/types/category'
import { CategoryFormData, CategorySchema } from '@/schema/category'
import { API } from '@/constants/api'
import CategoryInputName from './dialog/CategoryInputName'
import CategoryTextareaDescription from './dialog/CategoryTextareaDescription'

const CategoryDialog = () => {
    const { toast } = useToast();
    const dialogCloseRef = useRef<HTMLButtonElement | null>(null)
    const methods = useForm<CategoryFormData>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: '',
            description: '',
        },
    })

    const { reset } = methods;

    const [selectedTab, setSelectedTab] = useState<Category["status"]>('published');
    const [selectedAuthor, setSelectedAuthor] = useState<Category["author"]>('');


    function randomId(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }
        return result;
    }
    const onSubmit = async (data: CategoryFormData) => {
        console.log('Form Data:', data);
        const newCategory: Category = {
            id: randomId(12),
            name: data.name,
            description: data.description,
            status: selectedTab,
            author: selectedAuthor,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        console.log('New category:', newCategory)
        try {
            const response = await BaseService.post({ url: API.CREATE_CATEGORY, payload: newCategory });
            if (response) {
                toast({
                    title: 'Thành công',
                    description: 'Sản phẩm đã được thêm thành công',
                });
                dialogCloseRef.current?.click();
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Ôi không! Có gì đó không ổn.",
                description: "Đã có vấn đề xảy ra với yêu cầu của bạn.",
            })
        }
    }


    console.log('Form errors:', methods.formState.errors);

    const handleReset = () => {
        reset();
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='h-10'>Thêm danh mục</Button>
            </DialogTrigger>
            <DialogContent className='max-w-5xl p-7 px-8'>
                <DialogHeader>
                    <DialogTitle className='text-[22px]'>Thêm danh mục</DialogTitle>
                    <DialogDescription>
                        Điền tất cả thông tin vào form để thêm danh mục mới
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
                                <CategoryInputName />
                            </div>

                            <div className='grid grid-cols-2 items-center gap-5'>
                                <ProductTabStatus selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                                <CategoryTextareaDescription />
                            </div>

                        </div>
                        <DialogFooter className='mb-2 mt-3 flex items-center'>
                            <DialogClose onClick={handleReset} asChild>
                                {/* <Button type="button" variant="secondary">
                                    Đóng
                                </Button> */}
                            </DialogClose>
                            <Button type='submit' className='h-11 px-11'>Thêm danh mục</Button>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryDialog