import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { PaginationType } from '@/interfaces/data-table';
import React from 'react';

const PaginationSelection = ({
    pagination,
    setPagination,
}: {
    pagination: PaginationType;
    setPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
}) => {
    // Hàm xử lý thay đổi số lượng hàng mỗi trang
    const handlePaginationChange = (value: string) => {
        setPagination((prev) => ({
            ...prev,
            pageSize: Number(value),
        }));
    };

    return (
        <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">Hàng mỗi trang</div>
            <Select value={pagination.pageSize.toString()} onValueChange={handlePaginationChange}>
                <SelectTrigger className="w-14 rounded-md border px-2">
                    <SelectValue placeholder={pagination.pageSize.toString()} />
                </SelectTrigger>
                <SelectContent>
                    {[5, 10, 20, 50, 100].map((size) => (
                        <SelectItem value={size.toString()} key={size}>
                            {size}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default PaginationSelection;
