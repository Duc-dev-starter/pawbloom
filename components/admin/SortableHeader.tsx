import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IoMdArrowUp, IoMdArrowDown } from "react-icons/io";
import { ArrowUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table";

type SortableHeaderProps<T> = {
    column: Column<T>;
    label: string;
}

const SortableHeader = <T,>({ column, label }: SortableHeaderProps<T>) => {
    const isSorted = column.getIsSorted();
    const SortingIcon = isSorted === 'asc'
        ? IoMdArrowDown
        : isSorted === 'desc'
            ? IoMdArrowUp
            : ArrowUpDown;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" aria-label={`Sắp xếp theo ${label}`}>
                    {label}
                    <SortingIcon className="ml-2 size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="bottom">
                <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                    <IoMdArrowUp className="mr-2 size-4" /> Tăng dần
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                    <IoMdArrowDown className="mr-2 size-4" /> Giảm dần
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SortableHeader;
