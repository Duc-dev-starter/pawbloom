"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import MobileNavigation from '../MobileNavigation';
import { userNavItems } from '@/constants/nav';
import { CircleHelp, DoorClosed, History, MessageSquareWarning, Settings } from 'lucide-react';
import Images from '@/constants/image';
import Path from '@/constants/paths';
import { User } from '@/types/user';

const Header = () => {
    const [user, setUser] = useState<User | null>(null);

    const updateUserFromStorage = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        updateUserFromStorage();

        window.addEventListener('storage', updateUserFromStorage);

        return () => {
            window.removeEventListener('storage', updateUserFromStorage);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        window.location.href = "/";
    };

    return (
        <TooltipProvider>
            <header className="bg-brand">
                <div className="mx-auto flex max-w-[1440px] items-center px-6">
                    <Link href={Path.HOME}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Image priority src={Images.LOGO} alt="logo" width={160} height={160} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Trang Chủ Pawbloom</p>
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                    <MobileNavigation />
                    <nav className='hidden lg:block'>
                        <ul className="flex gap-6 pl-5">
                            {userNavItems.map((item) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.link}
                                        className="flex items-center gap-1 transition hover:text-brand-100"
                                    >
                                        <Image src={item.icon} alt={item.title} width={24} height={24} />
                                        <span className="text-[16px] font-medium">{item.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {!user && (
                        <div className='ml-auto flex gap-4'>
                            <Link href={Path.LOGIN}>
                                <Button variant="outline">Đăng nhập</Button>
                            </Link>
                            <Link href={Path.REGISTER}>
                                <Button variant="outline" className="bg-white hover:text-brand">
                                    Đăng ký
                                </Button>
                            </Link>
                        </div>
                    )}

                    {user && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className='ml-auto cursor-pointer'>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-5 w-56">
                                <Link href="/profile">
                                    <DropdownMenuLabel className='flex cursor-pointer items-center hover:bg-gray-100'>
                                        <p>{user.fullName || "Username"}</p>
                                        <Avatar className='ml-auto'>
                                            <AvatarImage src={user.profilePictureUrl || "https://github.com/shadcn.png"} />
                                            <AvatarFallback>{user.fullName ? user.fullName.charAt(0) : "CN"}</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuLabel>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link href="/application">
                                        <div className='flex items-center py-[6px] header-menu-item'>
                                            <History className='ml-2 mr-1' size={20} />
                                            <DropdownMenuItem className='cursor-pointer'>Lịch sử</DropdownMenuItem>
                                        </div>
                                    </Link>
                                    <Link href={'https://www.facebook.com/kpm.529'}>
                                        <div className='flex items-center py-[6px] header-menu-item'>
                                            <CircleHelp className='ml-2 mr-1' size={20} />
                                            <DropdownMenuItem className='cursor-pointer'>Trợ giúp</DropdownMenuItem>
                                        </div>
                                    </Link>
                                    <Link href={'/feedback'}>
                                        <div className='flex items-center py-[6px] header-menu-item'>
                                            <MessageSquareWarning className='ml-2 mr-1' size={20} />
                                            <DropdownMenuItem className='cursor-pointer'>Feedback</DropdownMenuItem>
                                        </div>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <div className='flex items-center py-[6px] header-menu-item'>
                                    <Settings className='ml-2 mr-1' size={20} />
                                    <DropdownMenuItem className='cursor-pointer'>Cài đặt</DropdownMenuItem>
                                </div>
                                <DropdownMenuSeparator />
                                <div onClick={handleLogout} className='flex items-center py-[6px] header-menu-item'>
                                    <DoorClosed className='ml-2 mr-1' size={20} />
                                    <DropdownMenuItem className='cursor-pointer'>Đăng xuất</DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </header>
        </TooltipProvider>
    );
};

export default Header;