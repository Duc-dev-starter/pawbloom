import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@/types/user';
import React, { SetStateAction, useEffect } from 'react'

const BlogSelectAuthor = ({ selectedAuthor, setSelectedAuthor }: { selectedAuthor: string, setSelectedAuthor: React.Dispatch<SetStateAction<User["fullName"]>> }) => {
    const authors = [
        "J97",
        "trinh tran phuong tuan",
    ]

    useEffect(() => {
        setSelectedAuthor("Chọn 1 tác giả");
    }, [])

    const handleValueChange = (value: string) => {
        setSelectedAuthor(value as User["fullName"]);
    }

    return (
        <div className='mt-5 flex flex-col gap-2'>
            <Label className='text-slate-600'>Tác giả tin tức</Label>
            <Select value={selectedAuthor} onValueChange={handleValueChange}>
                <SelectTrigger className='h-[45px] shadow-none'>
                    <SelectValue placeholder="Lựa chọn tác giả" />
                </SelectTrigger>
                <SelectContent>
                    {authors.map((author) => (
                        <SelectItem key={author} value={author}>
                            {author}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default BlogSelectAuthor