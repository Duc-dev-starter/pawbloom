import ApplicationsClient from "@/components/application/ApplicationClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Đơn đăng ký nhận nuôi",
    description: "Quản lý đơn đăng ký nhận nuôi thú cưng của bạn",
}

export default function ApplicationsPage() {
    return <ApplicationsClient />
}
