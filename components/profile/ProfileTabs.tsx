"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Key } from "lucide-react"
import ProfileForm from "./ProfileForm"
import PasswordForm from "./PasswordForm"
import { User } from "@/types/user"


interface ProfileTabsProps {
    userData: User
    createdAtDate: string
    updatedAtDate: string
}

export default function ProfileTabs({ userData, createdAtDate, updatedAtDate }: ProfileTabsProps) {
    const [activeTab, setActiveTab] = useState("profile")

    return (
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="mb-8 grid w-[400px] grid-cols-2">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Thông tin tài khoản
                </TabsTrigger>
                <TabsTrigger value="password" className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Đổi mật khẩu
                </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
                <ProfileForm userData={userData} createdAtDate={createdAtDate} updatedAtDate={updatedAtDate} />
            </TabsContent>

            <TabsContent value="password">
                <PasswordForm />
            </TabsContent>
        </Tabs>
    )
}

