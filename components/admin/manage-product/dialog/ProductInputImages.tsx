import { Label } from '@/components/ui/label';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const ProductInputImages = () => {
    const { register } = useFormContext();

    return (
        <div className="flex flex-col">
            <Label htmlFor='images' className='text-slate-600'>Hình ảnh sản phẩm</Label>
            <input
                id="images"
                type="file"
                accept="image/*"
                multiple
                {...register('images')} // Đảm bảo trường này được đăng ký với React Hook Form
                className="rounded-md border p-2"
            />
        </div>
    );
};

export default ProductInputImages;
