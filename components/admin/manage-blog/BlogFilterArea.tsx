import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getVietnameseStatus } from '@/utils'
import React, { SetStateAction } from 'react'
import { IoClose } from 'react-icons/io5'

const BlogFilterArea = ({ selectedStatuses, setSelectedStatuses, selectedCategories, setSelectedCategories, selectedAuthors, setSelectedAuthors }: {
    selectedStatuses: string[],
    setSelectedStatuses: React.Dispatch<SetStateAction<string[]>>,
    selectedCategories: string[],
    setSelectedCategories: React.Dispatch<SetStateAction<string[]>>,
    selectedAuthors: string[],
    setSelectedAuthors: React.Dispatch<SetStateAction<string[]>>,
}) => {

    const resetFilter = () => {
        setSelectedStatuses([]);
        setSelectedCategories([]);
        setSelectedAuthors([]);
    }

    return (
        <div className='flex gap-3'>
            {selectedStatuses.length > 0 && (
                <div className='flex items-center gap-2 rounded-sm border border-dashed p-1 px-2 text-sm'>
                    <span className='text-gray-600'>Trạng thái</span>
                    <Separator orientation='vertical' />
                    <div className='flex items-center gap-2'>
                        {selectedStatuses.length < 3 ? (
                            <>
                                {selectedStatuses.map((status, index) => (
                                    <Badge variant="secondary" key={index}>
                                        {getVietnameseStatus(status, 'product')}
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
                <div className='flex items-center gap-2 rounded-sm border border-dashed p-1 px-2 text-sm'>
                    <span className='text-gray-600'>Danh mục</span>
                    <Separator orientation='vertical' />
                    <div className='flex items-center gap-2'>
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

            {selectedAuthors.length > 0 && (
                <div className='flex items-center gap-2 rounded-sm border border-dashed p-1 px-2 text-sm'>
                    <span className='text-gray-600'>Tác giả</span>
                    <Separator orientation='vertical' />
                    <div className='flex items-center gap-2'>
                        {selectedAuthors.length < 3 ? (
                            <>
                                {selectedAuthors.map((author, index) => (
                                    <Badge variant="secondary" key={index}>
                                        {author}
                                    </Badge>
                                ))}
                            </>
                        ) : (
                            <Badge variant="secondary">Đã chọn 3</Badge>
                        )}

                    </div>
                </div>
            )}
            {selectedCategories.length > 0 || selectedStatuses.length > 0 || selectedAuthors.length > 0 && (
                <Button variant="ghost" className='p-1 px-2' onClick={resetFilter}>
                    <span>Reset</span>
                    <IoClose />
                </Button>
            )}




        </div>
    )
}

export default BlogFilterArea