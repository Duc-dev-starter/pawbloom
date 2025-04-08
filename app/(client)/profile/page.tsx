"use client" // Đánh dấu đây là Client Component

import { useEffect, useState } from 'react'
import { Bell, Home, User2 } from "lucide-react"
import { BiMoney, BiSupport } from "react-icons/bi"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
} from "@/components/ui/sidebar"
import ProfileTabs from "@/components/profile/ProfileTabs"
import { User } from "@/types/user"

interface ProfileProps {
    params: { slug: string }
}

// Menu items
const commonItems = [
    { title: "Thông tin tài khoản", url: "#profile", icon: User2 },
    { title: "Thông báo", url: "#notifications", icon: Bell },
    { title: "Chi phí", url: "#expenses", icon: BiMoney },
]

const otherItems = [
    { title: "Mời bạn bè", url: "#invite", icon: Home },
    { title: "Hỗ trợ", url: "#support", icon: BiSupport },
]

export default function Profile({ params }: ProfileProps) {
    const [userData, setUserData] = useState<User | null>(null)

    // Lấy key user từ localStorage khi component mount
    useEffect(() => {
        const userKey = localStorage.getItem('user') // Lấy key 'user'
        if (userKey) {
            // Giả sử userKey là dữ liệu JSON, parse nó thành object
            const parsedUser = JSON.parse(userKey)
            setUserData(parsedUser)
        }
    }, [])

    // Nếu chưa có dữ liệu, hiển thị loading
    if (!userData) {
        return <div>Đang tải...</div>
    }

    // Format dates từ dữ liệu user
    const createdAtDate = new Date(userData.createdAt).toLocaleDateString("vi-VN")
    const updatedAtDate = new Date(userData.updatedAt).toLocaleDateString("vi-VN")

    return (
        <SidebarProvider>
            <div className="relative flex min-h-[90vh]">
                {/* Sidebar */}
                <Sidebar className="sidebar-profile-border absolute h-full w-64">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-base">Chung</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {commonItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url} className="flex items-center space-x-2">
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-base">Khác</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {otherItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url} className="flex items-center space-x-2">
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                {/* Main Content */}
                <main className="flex-1 px-10 py-5">
                    <div className="flex flex-col">
                        <div className="flex flex-col justify-center gap-1 border-b-2 border-brand">
                            <h2 className="text-3xl font-semibold">Tài khoản</h2>
                            <p className="mb-4 text-base text-gray-400">Quản lí tài khoản của bạn</p>
                        </div>

                        {/* Tabs cho Profile và Password */}
                        <ProfileTabs userData={userData} createdAtDate={createdAtDate} updatedAtDate={updatedAtDate} />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}