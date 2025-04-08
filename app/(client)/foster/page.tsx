import FosterClient from "@/components/foster/FosterClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Trạm Cứu Trợ",
    description: "Danh sách các trạm cứu trợ động vật đối tác với Pawbloom.",
}

export default function FosterPage() {
    return <FosterClient />
}

