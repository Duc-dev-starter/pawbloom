"use client"
import Images from '@/constants/image'
import Image from 'next/image'
import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname } from 'next/navigation'
import { Separator } from './ui/separator'
import { navItems } from '@/constants/nav'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'


const MobileNavigation = () => {
    const [open, setOpen] = useState(false);
    const pathName = usePathname();
    return (
        <header className='mobile-header'>
            {/* <Image src={Images.LOGO} alt='logo' width={120} height={52} className='h-auto' /> */}

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Image src="/assets/icons/menu.svg" alt='search' width={30} height={30} />
                </SheetTrigger>
                <SheetContent className='shad-sheet h-screen px-3'>
                    <SheetTitle>
                        <div className='header-user'>
                            {/* <Image src={avatar} alt='avatar' width={44} height={44} className='header-user-avatar'/> */}
                            <div className='sm:hidden lg:block'>
                                <p className='subtitle-2 capitalize'>test user</p>
                                <p className='caption'>user@gmail.com</p>
                            </div>
                        </div>
                        <Separator className='mb-4 bg-light-200/20' />
                    </SheetTitle>
                    <nav className='mobile-nav'>
                        <ul className='mobile-nav-list'>
                            {navItems.map(({ url, name, icon }) => (
                                <Link key={name} href={url} className='lg:w-full'>
                                    <li className={cn('mobile-nav-item', pathName === url && 'shad-active')}>
                                        <Image src={icon} alt={name} width={24} height={24} className={cn('nav-icon', pathName === url && 'nav-icon-active')} />
                                        <p>{name}</p>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </nav>

                    <div className='flex flex-col justify-between gap-5'>
                        <Button type='submit' className='mobile-sign-out-button'>
                            <Image src="/assets/icons/logout.svg" alt='logo' width={24} height={24} className='w-6' />
                            <p>Logout</p>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    )
}

export default MobileNavigation