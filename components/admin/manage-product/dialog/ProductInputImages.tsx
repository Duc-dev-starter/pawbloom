// import { Label } from '@/components/ui/label';
import React from 'react';
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';


const ProductInputImages = () => {
    // const { register } = useFormContext();

    return (
        <div className="mt-4 flex flex-col gap-2">
            <Label htmlFor='images' className='text-slate-600'>Hình ảnh sản phẩm</Label>
            {/* <input
                id="images"
                type="file"
                accept="image/*"
                multiple
                {...register('images')}
                className="rounded-md border p-2"
            /> */}
            <Input
                placeholder="Picture"
                type="file"
                accept="image/*, application/pdf"
            />
        </div>
    );
};

export default ProductInputImages;
