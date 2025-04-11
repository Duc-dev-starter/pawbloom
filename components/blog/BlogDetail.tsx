"use client"

import { getBlog } from "@/services/blog"
import type { Blog } from "@/types/blog"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { ArrowLeft, Calendar, Clock, User, Tag, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

const BlogDetail = ({ slug }: { slug: string }) => {
    const [blog, setBlog] = useState<Blog | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await getBlog(slug)
                if (response.data) {
                    setBlog(response.data)
                } else {
                    setError("Không thể tải bài viết. Vui lòng thử lại sau.")
                }
            } catch (error) {
                console.error("Error fetching blog:", error)
                setError("Đã xảy ra lỗi khi tải bài viết. Vui lòng thử lại sau.")
            } finally {
                setLoading(false)
            }
        }

        fetchBlog()
    }, [slug])

    // Format date helper
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A"
        try {
            const date = new Date(dateString)
            return format(date, "dd MMMM, yyyy", { locale: vi })
        } catch (e) {
            console.log(e)
            return dateString
        }
    }

    // Format time helper
    const formatTime = (dateString: string | null) => {
        if (!dateString) return ""
        try {
            const date = new Date(dateString)
            return format(date, "HH:mm", { locale: vi })
        } catch (e) {
            console.log(e)
            return ""
        }
    }

    // Get status badge color
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "published":
                return "bg-green-100 text-green-800 border-green-200"
            case "draft":
                return "bg-amber-100 text-amber-800 border-amber-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    // Loading skeleton
    if (loading) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="mb-8">
                    <Skeleton className="h-8 w-32 mb-6" />
                    <Skeleton className="h-12 w-full mb-4" />
                    <div className="flex gap-4 mb-6">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-6" />

                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} className="h-24 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Lỗi</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>

                <Button asChild variant="outline">
                    <Link href="/blog">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Quay lại danh sách bài viết
                    </Link>
                </Button>
            </div>
        )
    }

    // Not found state
    if (!blog) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-8 text-center">
                <div className="mb-8">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h1 className="text-2xl font-bold mb-2">Không tìm thấy bài viết</h1>
                    <p className="text-gray-500 mb-6">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>

                    <Button asChild>
                        <Link href="/blog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Quay lại danh sách bài viết
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <article className="container mx-auto max-w-4xl px-4 py-8">
            {/* Back button */}
            <div className="mb-8">
                <Button asChild variant="outline" size="sm">
                    <Link href="/blog">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Quay lại danh sách bài viết
                    </Link>
                </Button>
            </div>

            {/* Blog header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-4 md:text-4xl">{blog.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                    {blog.publishedAt && (
                        <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
                            {formatTime(blog.publishedAt) && (
                                <>
                                    <Clock className="ml-2 mr-1 h-4 w-4" />
                                    <span>{formatTime(blog.publishedAt)}</span>
                                </>
                            )}
                        </div>
                    )}

                    {blog.authorName && (
                        <div className="flex items-center">
                            <User className="mr-1 h-4 w-4" />
                            <span>{blog.authorName}</span>
                        </div>
                    )}

                    {blog.categoryName && (
                        <div className="flex items-center">
                            <Tag className="mr-1 h-4 w-4" />
                            <span>{blog.categoryName}</span>
                        </div>
                    )}

                    {blog.status && (
                        <Badge variant="outline" className={getStatusColor(blog.status)}>
                            {blog.status}
                        </Badge>
                    )}
                </div>

                {blog.description && (
                    <div className="bg-muted p-4 rounded-md mb-6 italic text-gray-600">{blog.description}</div>
                )}
            </header>

            {/* Blog content */}
            <div className="prose prose-lg max-w-none">
                {/* Hiển thị nội dung blog */}
                {blog.content.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>

            {/* Blog footer */}
            <footer className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap justify-between text-sm text-gray-500">
                    <div>
                        <span className="font-medium">Tạo lúc:</span> {formatDate(blog.createdAt)}
                    </div>
                    {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                        <div>
                            <span className="font-medium">Cập nhật lúc:</span> {formatDate(blog.updatedAt)}
                        </div>
                    )}
                </div>
            </footer>
        </article>
    )
}

export default BlogDetail
