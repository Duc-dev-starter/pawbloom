"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useFavorites } from "@/hooks/use-favorite"

export default function FavoritesPage() {
    const { favorites, toggleFavorite } = useFavorites()
    const [isClient, setIsClient] = useState(false)

    // Đảm bảo chỉ render khi ở client-side để tránh lỗi hydration
    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <div className="flex justify-center items-center min-h-[90vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
            </div>
        )
    }

    return (
        <section className="px-4 py-8 min-h-[90vh] md:px-16">
            <div className="mx-auto max-w-7xl">
                {/* Breadcrumb và nút quay lại */}
                <div className="mb-6 flex items-center">
                    <Link href="/adopt">
                        <Button variant="ghost" className="gap-1 p-0 hover:bg-transparent">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="text-sm text-gray-500">Quay lại</span>
                        </Button>
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-sm text-gray-700">Thú cưng yêu thích</span>
                </div>

                <h1 className="text-3xl font-bold mb-8">Thú cưng yêu thích</h1>

                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <Heart className="h-16 w-16 text-gray-300 mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Chưa có thú cưng yêu thích</h2>
                        <p className="text-gray-500 mb-6 text-center">Bạn chưa thêm thú cưng nào vào danh sách yêu thích</p>
                        <Link href="/adopt">
                            <Button className="bg-brand hover:bg-brand/90">Tìm thú cưng ngay</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {favorites.map((pet) => (
                            <Card key={pet.id} className="overflow-hidden transition-all hover:shadow-lg">
                                <Link href={`/adopt/${pet.id}`}>
                                    <div className="relative">
                                        <Image
                                            src={pet.photoURL || "/placeholder.svg"}
                                            alt={pet.name}
                                            width={400}
                                            height={300}
                                            className="h-64 w-full object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="mb-2 flex items-center justify-between">
                                            <h3 className="text-xl font-semibold">{pet.name}</h3>
                                        </div>
                                        <Badge variant="secondary">{pet.breed}</Badge>
                                    </CardContent>
                                </Link>
                                <CardFooter className="border-t p-4">
                                    <Button
                                        variant="outline"
                                        className="w-full gap-2 border-red-500 text-red-500 hover:bg-red-50"
                                        onClick={() => toggleFavorite(pet)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Xóa khỏi yêu thích
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

