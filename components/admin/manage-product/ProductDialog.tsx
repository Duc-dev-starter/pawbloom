import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import React, { useRef, useState } from 'react'
import ProductInputName from './dialog/ProductInputName'
import ProductInputSupplier from './dialog/ProductInputSupplier'
import ProductSelectCategory from './dialog/ProductSelectCategory'
import ProductTabStatus from './dialog/ProductTabStatus'
import ProductInputQuantity from './dialog/ProductInputQuantity'
import ProductInputPrice from './dialog/ProductInputPrice'
import ProductInputImages from './dialog/ProductInputImages'
import ProductTextareaDescription from './dialog/ProductTextareaDescription'
import { Product } from '@/types/product'
import { FormProvider, useForm } from 'react-hook-form'
import { ProductFormData, ProductSchema } from '@/schema/product'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseService } from '@/services/baseService'
import { useToast } from '@/hooks/use-toast'

const ProductDialog = () => {
    const { toast } = useToast();
    const dialogCloseRef = useRef<HTMLButtonElement | null>(null)
    const methods = useForm<ProductFormData>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            supplier: '',
            name: '',
            price: 1000,
            quantity: 1,
            description: '',
        },
    })

    const { reset } = methods;

    const [selectedTab, setSelectedTab] = useState<Product["status"]>('published');

    const [selectedCategory, setSelectedCategory] = useState<Product["category"]>('cat-food')


    function randomId(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }
        return result;
    }
    const onSubmit = async (data: ProductFormData) => {
        console.log('Form Data:', data);
        const newProduct: Product = {
            id: randomId(12),
            supplier: data.supplier,
            name: data.name,
            price: data.price,
            images: [],
            quantity: data.quantity,
            description: data.description,
            status: selectedTab,
            category: selectedCategory,
            createdAt: new Date().toISOString()
        }
        console.log('New product:', newProduct)
        const response = await BaseService.post({ url: '/api/produts', payload: newProduct });
        if (response) {
            toast({
                title: 'Thành công',
                description: 'Sản phẩm đã được thêm thành công',
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
                <Button className='h-10'>Thêm sản phẩm</Button>
            </DialogTrigger>
            <DialogContent className='max-w-5xl p-7 px-8'>
                <DialogHeader>
                    <DialogTitle className='text-[22px]'>Thêm sản phẩm</DialogTitle>
                    <DialogDescription>
                        Điền tất cả thông tin vào form để thêm sản phẩm mới
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
                                <ProductInputName />
                                <ProductInputImages />
                            </div>

                            <div className='grid grid-cols-2 items-center gap-5'>
                                <ProductInputSupplier />
                                <ProductSelectCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                            </div>

                            <div className='grid grid-cols-2 items-center gap-5'>
                                <ProductTabStatus selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                                <ProductTextareaDescription />
                            </div>

                            <div className='grid grid-cols-2 items-center gap-5'>
                                <ProductInputQuantity />
                                <ProductInputPrice />
                            </div>
                        </div>
                        <DialogFooter className='mb-2 mt-3 flex items-center'>
                            <DialogClose onClick={handleReset} asChild>
                                {/* <Button type="button" variant="secondary">
                                    Đóng
                                </Button> */}
                            </DialogClose>
                            <Button type='submit' className='h-11 px-11'>Thêm sản phẩm</Button>
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDialog