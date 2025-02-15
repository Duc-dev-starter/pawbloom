import { Label } from '@/components/ui/label';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

const ProductInputImages = () => {
    const { setValue, watch } = useFormContext();
    const images = watch('images', []);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newImages = [...images, ...acceptedFiles];
        setValue('images', newImages, { shouldValidate: true });
    }, [images, setValue]);

    const { getRootProps, getInputProps } = useDropzone({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        accept: 'image/*',
        onDrop,
        multiple: true,
    });


    return (
        <div className="flex flex-col">
            <Label htmlFor="images" className="text-slate-600">Hình ảnh sản phẩm</Label>
            <div
                {...getRootProps()}
                className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-5 text-center hover:border-blue-500"
            >
                <input {...getInputProps()} />
                <p className="text-sm text-gray-500">Kéo thả hình ảnh vào đây hoặc nhấp để chọn</p>
            </div>

            {/* Hiển thị hình ảnh đã chọn */}
            <div className="mt-3 grid grid-cols-3 gap-3">
                {images.map((file: File, index: number) => (
                    <div key={index} className="relative">
                        <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            className="h-24 w-full rounded-md object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductInputImages;
