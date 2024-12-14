import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/types/product';
import React, { SetStateAction } from 'react'
import { FaCheck, FaInbox } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

const TabProductStatus = ({ selectedTab, setSelectedTab }: { selectedTab: string, setSelectedTab: React.Dispatch<SetStateAction<Product["status"]>> }) => {
    const handleValueChange = (value: string) => {
        setSelectedTab(value as Product["status"]);
    }

    return (
        <div>
            <Label className='text-slate-600'>Trạng thái</Label>
            <Tabs value={selectedTab} onValueChange={handleValueChange} className='mt-1'>
                <TabsList className='h-11 px-2'>
                    <TabsTrigger className={`h-8 ${selectedTab === "published" ? "text-red-500" : ""}`} value='published'>
                        <FaCheck className='pr-1' />Công khai
                    </TabsTrigger>
                    <TabsTrigger className={`h-8 ${selectedTab === "inactive" ? "text-red-500" : ""}`} value='inactive'>
                        <IoClose className='pr-1' />Ngưng bán
                    </TabsTrigger>
                    <TabsTrigger className={`h-8 px-3 ${selectedTab === "draft" ? "text-red-500" : ""}`} value='draft'>
                        <FaInbox className='pr-1' />Nháp
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}

export default TabProductStatus