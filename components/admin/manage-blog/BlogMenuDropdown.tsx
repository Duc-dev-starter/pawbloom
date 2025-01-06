import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import { useToast } from '@/hooks/use-toast';
import AlertDelete from '../AlertDelete';
import { Blog } from '@/types/blog';
import { deleteBlog } from '@/services/blog';

const BlogMenuDropdown = ({ row }: { row: Row<Blog> }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast();
    const dialogCloseRef = useRef<HTMLButtonElement | null>(null)

    const handleDelete = async () => {
        console.log("Xóa danh mục: ", row.original);
        const deleteRow = row.original.id;
        try {
            const response = await deleteBlog(deleteRow);
            if (response) {
                toast({
                    title: 'Thành công',
                    description: 'Tin tức đã được xóa thành công',
                });
                dialogCloseRef.current?.click();
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Ồ không! Có gì đó không ổn.",
                description: "Đã có vấn đề xảy ra với yêu cầu của bạn.",
            })
        } finally {
            setDialogOpen(false);
        }

    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <span className="sr-only">Mở menu</span>
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="flex cursor-pointer items-center gap-1 p-[10px]">
                        <FaRegEdit />
                        <span>Sửa tin tức</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => setDialogOpen(true)}
                        className="flex cursor-pointer items-center gap-1 p-[10px] text-red-600"
                    >
                        <MdOutlineDelete className="text-lg" />
                        <span>Xóa tin tức</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {isDialogOpen && (
                <AlertDelete
                    entityName='tin túc'
                    isOpen={isDialogOpen}
                    onClose={() => setDialogOpen(false)}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
};

export default BlogMenuDropdown;
