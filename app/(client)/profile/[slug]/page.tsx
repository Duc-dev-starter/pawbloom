import type { Metadata, ResolvingMetadata } from "next"
import { Bell, Home, User } from "lucide-react"
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
import { BiMoney, BiSupport } from "react-icons/bi"
import ProfileTabs from "@/components/profile/ProfileTabs"

// Định nghĩa kiểu dữ liệu cho user
interface UserType {
    fullName: string
    email: string
    phoneNumber: string | null
    role: string
    profilePictureUrl: string | null
    address: string | null
    bio: string | null
    isActive: boolean
    emailVerified: boolean
    createdAt: string
    updatedAt: string
    lastLoginAt: string | null
}

interface ProfileProps {
    params: { slug: string }
}

// Menu items.
const commonItems = [
    {
        title: "Thông tin tài khoản",
        url: "#profile",
        icon: User,
    },
    {
        title: "Thông báo",
        url: "#notifications",
        icon: Bell,
    },
    {
        title: "Chi phí",
        url: "#expenses",
        icon: BiMoney,
    },
]

const otherItems = [
    {
        title: "Mời bạn bè",
        url: "#invite",
        icon: Home,
    },
    {
        title: "Hỗ trợ",
        url: "#support",
        icon: BiSupport,
    },
]

// Hàm lấy dữ liệu người dùng (giả lập API call)
async function getUserData(userId: string): Promise<UserType> {
    // Trong thực tế, đây sẽ là API call
    // const res = await fetch(`https://api.example.com/users/${userId}`)
    // return res.json()

    // Giả lập dữ liệu từ API
    console.log(userId);
    return {
        fullName: "Khoi",
        email: "khoipham2310@gmail.com",
        phoneNumber: null,
        role: "Adopter",
        profilePictureUrl: null,
        address: null,
        bio: null,
        isActive: true,
        emailVerified: false,
        createdAt: "2/2/2025 7:54:47 AM",
        updatedAt: "2/2/2025 2:54:47 PM",
        lastLoginAt: null,
    }
}

// Tạo metadata động dựa trên slug
export async function generateMetadata({ params }: ProfileProps): Promise<Metadata> {
    const userId = params.slug

    // Lấy dữ liệu người dùng
    const userData = await getUserData(userId)

    return {
        title: `Hồ sơ của ${userData.fullName} | Pawbloom`,
        description: `Quản lý thông tin tài khoản của ${userData.fullName} trên Pawbloom`,
        openGraph: {
            title: `Hồ sơ của ${userData.fullName} | Pawbloom`,
            description: `Quản lý thông tin tài khoản của ${userData.fullName} trên Pawbloom`,
            type: "profile",
        },
    }
}

export default async function Profile({ params }: ProfileProps) {
    const { slug } = params

    // Lấy dữ liệu người dùng từ API
    const userData = await getUserData(slug)

    // Format dates
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

