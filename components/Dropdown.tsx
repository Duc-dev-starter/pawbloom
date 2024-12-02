"use client";
import React, { useState } from "react";
import { Dialog } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Image from "next/image";

interface ActionDropdown {
    label: string; // Nhãn của dropdown item
    icon?: React.ReactNode; // Icon không bắt buộc
    value: string; // Nội dung của dropdown item khi click
}

interface DropdownProps {
    actions: ActionDropdown[]; // Mảng các action
    triggerIcon?: string; // Icon cho nút mở dropdown (mặc định là dấu ba chấm)
}

const Dropdown: React.FC<DropdownProps> = ({ actions, triggerIcon = "/assets/icons/dots.svg" }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger className="shad-no-focus">
                    <Image src={triggerIcon} alt="trigger icon" width={28} height={28} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {actions.map((action, index) => (
                        <React.Fragment key={index}>
                            <DropdownMenuItem onClick={() => setIsModalOpen(true)} className="shad-dropdown-item">
                                {action.icon && <span className="mr-2">{action.icon}</span>}
                                {action.label}
                            </DropdownMenuItem>
                            {index < actions.length - 1 && <DropdownMenuSeparator />}
                        </React.Fragment>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </Dialog>
    );
};

export default Dropdown;
