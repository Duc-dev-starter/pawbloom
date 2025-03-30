"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/use-favorite"

export default function FavoritesButton() {
    const { favorites } = useFavorites()
    const [isClient, setIsClient] = useState(false)

    // Đảm bảo chỉ render khi ở client-side để tránh lỗi hydration
    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) return null

    return (
        <Link href="/adopt/favorites">
            <Button variant="outline" className="relative gap-2 border-brand text-brand hover:bg-brand/10">
                <Heart className="h-5 w-5" />
                <span>Yêu thích</span>
                {favorites.length > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs text-white">
                        {favorites.length}
                    </span>
                )}
            </Button>
        </Link>
    )
}

