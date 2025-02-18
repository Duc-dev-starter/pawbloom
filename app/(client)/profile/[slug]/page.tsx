import { Bell, Home, User } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar"
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiMoney, BiSupport } from "react-icons/bi";
interface ProfileProps {
    params: { slug: string };
}

// Menu items.
const commonItems = [
    {
        title: "Thông tin tài khoản",
        url: "#",
        icon: User,
    },
    {
        title: "Thông báo",
        url: "#",
        icon: Bell,
    },
    {
        title: "Chi phí",
        url: "#",
        icon: BiMoney,
    },
]

const otherItems = [
    {
        title: "Mời bạn bè",
        url: "#",
        icon: Home,
    },
    {
        title: "Hỗ trợ",
        url: "#",
        icon: BiSupport,
    },
]


export default async function Profile({ params }: ProfileProps) {
    const { slug } = await params;
    console.log(slug)
    // // Fetch dữ liệu phía server
    // const res = await axios.get(`https://api.example.com/profiles/${slug}`)



    return (
        <SidebarProvider>
            <div className="relative flex">
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
                            <h2 className="h2">Tài khoản</h2>
                            <p className="mb-4 text-base text-gray-400">Quản lí tài khoản của bạn</p>
                        </div>
                        {/* Avatar */}

                        <div className="flex items-center justify-between">
                            <div className="mt-3 flex gap-3">
                                <div>
                                    <Image src="/assets/images/homepage.png" alt="test" width={150} height={150} className="rounded-full" />
                                </div>
                                <div className="flex flex-col justify-center gap-4">
                                    <h3 className="h3">John Doe</h3>
                                    <p className="text-sm text-gray-400">PNG, JPG lên tới 5MB</p>
                                    <p className="text-xl text-brand">Cập nhật</p>
                                </div>
                            </div>
                            <div>
                                <p>Ngày tạo tài khoản: 27/10/2024</p>
                                <p>Ngày cập nhật tài khoản: 27/10/2024</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="h2">Chi tiết</h2>
                            <div className="flex flex-col justify-center gap-8">
                                <div className="grid grid-cols-2 gap-10">
                                    <div>
                                        <Label htmlFor='name' className='text-slate-600'>Tên</Label>
                                        <Input type="text" placeholder="Tên người dùng" />
                                    </div>
                                    <div>
                                        <Label htmlFor='name' className='text-slate-600'>Email</Label>
                                        <Input type="email" placeholder="email@gmail.com" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-10">
                                    <div>
                                        <Label htmlFor='dob' className='text-slate-600'>Ngày tháng năm sinh</Label>
                                        <Input type="date" placeholder="14/05/2003" />
                                    </div>
                                    <div>
                                        <Label htmlFor='name' className='text-slate-600'>Số điện thoại</Label>
                                        <Input type="text" placeholder="0898320059" />
                                    </div>
                                    <Button className=" w-1/4 rounded-3xl bg-brand">Lưu</Button>
                                </div>

                            </div>
                        </div>

                        <div className="mb-3 mt-10">
                            <h2 className="h2">Đổi mật khẩu</h2>
                            <div className="flex flex-col justify-center gap-8">
                                <div className="w-1/3">
                                    <Label htmlFor='oldPassword' className='text-slate-600'>Mật khẩu cũ</Label>
                                    <Input type="password" />
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor='newPassword' className='text-slate-600'>Mật khẩu mới</Label>
                                    <Input type="password" />
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor='confirmPassword' className='text-slate-600'>Xác nhận mật khẩu</Label>
                                    <Input type="password" />
                                </div>
                                <Button className="rounded-3xl bg-brand w-[12%]">Lưu</Button>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
