import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import React, { SetStateAction } from 'react'
import { IoClose } from 'react-icons/io5'

const FilterArea = ({ selectedStatuses, setSelectedStatuses, selectedCategories, setSelectedCategories }: {
    selectedStatuses: string[],
    setSelectedStatuses: React.Dispatch<SetStateAction<string[]>>,
    selectedCategories: string[],
    setSelectedCategories: React.Dispatch<SetStateAction<string[]>>,
}) => {

    const resetFilter = () => {
        setSelectedStatuses([]);
        setSelectedCategories([]);
    }

    const changeStatusToVietnamese = (status: string) => {
        switch (status) {
            case 'published':
                return 'Công khai'
            case 'inactive':
                return 'Ngưng bán'
            case 'draft':
                return 'Nháp'
            default:
                return status
        }
    }
    return (
        <div className='flex gap-3'>
            {selectedStatuses.length > 0 && (
                <div className='border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm'>
                    <span className='text-gray-600'>Trạng thái</span>
                    <Separator orientation='vertical' />
                    <div className='flex gap-2 items-center'>
                        {selectedStatuses.length < 3 ? (
                            <>
                                {selectedStatuses.map((status, index) => (
                                    <Badge variant="secondary" key={index}>
                                        {changeStatusToVietnamese(status)}
                                    </Badge>
                                ))}
                            </>
                        ) : (
                            <Badge variant="secondary">Chọn hết</Badge>
                        )}

                    </div>
                </div>
            )}


            {selectedCategories.length > 0 && (
                <div className='border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm'>
                    <span className='text-gray-600'>Danh mục</span>
                    <Separator orientation='vertical' />
                    <div className='flex gap-2 items-center'>
                        {selectedCategories.length < 3 ? (
                            <>
                                {selectedCategories.map((category, index) => (
                                    <Badge variant="secondary" key={index}>
                                        {category}
                                    </Badge>
                                ))}
                            </>
                        ) : (
                            <Badge variant="secondary">Đã chọn 3</Badge>
                        )}

                    </div>
                </div>
            )}
            {selectedCategories.length > 0 || selectedStatuses.length > 0 && (
                <Button variant="ghost" className='p-1 px-2' onClick={resetFilter}>
                    <span>Reset</span>
                    <IoClose />
                </Button>
            )}




        </div>
    )
}

export default FilterArea