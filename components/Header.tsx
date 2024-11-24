import Images from '@/constants/image'
import Path from '@/constants/paths'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const NAV_LINKS = [
    { title: 'Nhận nuôi', icon: '/assets/icons/home.svg', link: '/adopt' },
    { title: 'Trạm cứu trợ', icon: '/assets/icons/tram.svg', link: '/adopt' },
    { title: 'Sản phẩm', icon: '/assets/icons/product.svg', link: '/product' },
    { title: 'Tin tức', icon: '/assets/icons/news.svg', link: '/blog' },
]

const Header = () => {
    const user = true;
    return (
        <TooltipProvider>
            <header className="bg-brand">
                <div className="mx-auto flex max-w-[1440px] items-center px-6">
                    <Link href={Path.HOME}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Image src={Images.LOGO} alt="logo" width={160} height={160} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Trang Chủ Pawbloom</p>
                            </TooltipContent>
                        </Tooltip>

                    </Link>

                    <nav>
                        <ul className="flex gap-6 pl-5">
                            {NAV_LINKS.map((item) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.link}
                                        className="flex items-center gap-1 transition hover:text-brand-100 "
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

                            {/* Register Button */}
                            <Link href={Path.REGISTER}>
                                <Button variant="outline" className="bg-white hover:text-brand">
                                    Đăng ký
                                </Button>
                            </Link>
                        </div>
                    )}

                    {user && (
                        <DropdownMenu>
                            {/* Avatar as trigger */}
                            <DropdownMenuTrigger asChild>
                                <Avatar className='ml-auto cursor-pointer'>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            {/* Dropdown content */}
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Profile
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Billing
                                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Keyboard shortcuts
                                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem>Email</DropdownMenuItem>
                                                <DropdownMenuItem>Message</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>More...</DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuItem>
                                        New Team
                                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>GitHub</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuItem disabled>API</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    Log out
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                </div>
            </header>
        </TooltipProvider>
    )
}

export default Header
