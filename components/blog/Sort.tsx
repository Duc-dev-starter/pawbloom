import React from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"; // Thay bằng thư viện bạn đang dùng

const Sort: React.FC<{ onSortChange?: (value: string) => void }> = ({ onSortChange }) => {
    const handleChange = (value: string) => {
        if (onSortChange) {
            onSortChange(value);
        }
    };

    return (
        <div className="flex items-center">
            <Select onValueChange={handleChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="desc">Mới nhất</SelectItem>
                    <SelectItem value="asc">Cũ nhất</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};


export default Sort;
