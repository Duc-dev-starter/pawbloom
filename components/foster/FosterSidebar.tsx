"use client"

import * as React from "react"
import {
    BookOpen,
    LayoutDashboard,
    Map,
    PieChart,
    Settings2,
    User,
    Star
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import Path from "@/constants/paths"
import Images from "@/constants/image"
import { NavMain } from "../common/NavMain"
import { NavUser } from "../common/NavUser"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: LayoutDashboard,
            isActive: false,
        },
        {
            title: "Quản lý khách hàng",
            url: "#",
            icon: User,
            isActive: true,
        },
        {
            title: "Quản lý đơn của trạm",
            url: "/foster/manage-applications",
            icon: Star,
            isActive: true,
        },
        {
            title: "Quản lý blog",
            url: "#",
            icon: BookOpen,
            isActive: false,
        },
        {
            title: "Quản lý bài đăng",
            url: "#",
            icon: Map,
            isActive: false,
        },
        {
            title: "Quản lý chi phí",
            url: "#",
            icon: PieChart,
            isActive: false,
        },
        {
            title: "Cài đặt",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],

}

export function FosterSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Link href={Path.HOME}>
                    <Image src={Images.LOGO} alt="logo" width={120} height={120} />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
