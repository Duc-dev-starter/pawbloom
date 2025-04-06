import type { Metadata } from "next"
import PetDetailClient from "./PetDetailClient"

interface AdoptPageDetailProps {
    params: {
        slug: string
    }
}

// Metadata tĩnh cơ bản
export const metadata: Metadata = {
    title: "Chi tiết thú cưng | Pawbloom",
    description: "Tìm hiểu thêm về thú cưng đang cần được nhận nuôi.",
}

export default function AdoptPageDetail({ params }: AdoptPageDetailProps) {
    // Chỉ truyền slug xuống client component
    return <PetDetailClient slug={params.slug} />
}

