import Breadcrumbs from "@/components/BreadcrumbDynamic"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import React from 'react'
import { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminSearchbar } from "@/components/admin/dashboard"

export const metadata: Metadata = {
    title: {
        default: "Pawbloom",
        template: "%s | Admin Pawbloom",
    },
    description: "Pawbloom - Cơ hội thứ hai, mái ấm mãi mãi",
};


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumbs />
                    </div>
                    <AdminSearchbar />
                </header>
                {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    </div>
                    <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                    {children}
                </div> */}
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout