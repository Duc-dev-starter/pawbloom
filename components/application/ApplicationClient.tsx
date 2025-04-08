/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import {
    Calendar,
    Clock,
    PawPrint,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Clock3,
    CreditCard,
    Filter,
    ChevronDown,
    X,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { Pet } from "@/types/pet"
import { getApplications } from "@/services/application"
import { createOrder } from "@/services/order"



interface Application {
    applicationId: string
    status: string
    applicationDate: string
    pet: Pet
}


// Enum cho trạng thái đơn (case insensitive)
enum ApplicationStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    CANCELLED = "cancelled",
}

export default function ApplicationsClient() {
    const [applications, setApplications] = useState<Application[]>([])
    const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
    const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

    // Fetch dữ liệu đơn đăng ký
    useEffect(() => {
        const fetchApplications = async () => {
            setIsLoading(true)
            try {
                const response = await getApplications();

                setApplications(response.data.applications)
                setFilteredApplications(response.data.applications)
            } catch (err) {
                console.error("Error fetching applications:", err)
                setError("Không thể tải danh sách đơn đăng ký. Vui lòng thử lại sau.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchApplications()
    }, [])

    // Lọc đơn theo trạng thái
    useEffect(() => {
        if (selectedStatus) {
            const filtered = applications.filter((app) => app.status.toLowerCase() === selectedStatus.toLowerCase())
            setFilteredApplications(filtered)
        } else {
            setFilteredApplications(applications)
        }
    }, [selectedStatus, applications])

    // Xử lý thanh toán
    const handlePayment = (application: Application) => {
        setSelectedApplication(application)
        setPaymentDialogOpen(true)
    }

    const processPayment = async (applicationId: string) => {
        try {
            const payload = {
                applicationId,
                description: `Thanh toán phí nhận nuôi`,
                returnUrl: "https://pawbloom.vercel.app/success",
                cancelUrl: "https://pawbloom.vercel.app/failed",
            };
            console.log(payload);
            const response = await createOrder(payload);
            console.log("Order created:", response);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            window.location.href = response.checkoutUrl;
        } catch (err) {
            console.error(err);
            toast({
                title: "Lỗi",
                description: "Không tạo được đơn thanh toán",
                variant: "destructive",
            });
        }
    }

    // Hàm lấy icon và màu sắc dựa trên trạng thái
    const getStatusInfo = (status: string) => {
        const statusLower = status.toLowerCase()

        switch (statusLower) {
            case ApplicationStatus.APPROVED:
                return {
                    icon: <CheckCircle2 className="h-5 w-5" />,
                    color: "text-green-500 bg-green-50",
                    text: "Đã duyệt",
                }
            case ApplicationStatus.REJECTED:
                return {
                    icon: <XCircle className="h-5 w-5" />,
                    color: "text-red-500 bg-red-50",
                    text: "Từ chối",
                }
            case ApplicationStatus.CANCELLED:
                return {
                    icon: <AlertCircle className="h-5 w-5" />,
                    color: "text-orange-500 bg-orange-50",
                    text: "Đã hủy",
                }
            case ApplicationStatus.PENDING:
            default:
                return {
                    icon: <Clock3 className="h-5 w-5" />,
                    color: "text-blue-500 bg-blue-50",
                    text: "Đang xử lý",
                }
        }
    }

    // Format ngày giờ
    const formatDateTime = (dateString: string) => {
        try {
            const date = new Date(dateString)
            return {
                date: format(date, "dd/MM/yyyy", { locale: vi }),
                time: format(date, "HH:mm", { locale: vi }),
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return { date: "N/A", time: "N/A" }
        }
    }

    // Hiển thị skeleton khi đang loading
    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="mb-8">
                    <Skeleton className="h-12 w-64 mb-4" />
                    <Skeleton className="h-5 w-full max-w-md mb-6" />
                    <Skeleton className="h-10 w-40 mb-6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-64 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        )
    }

    // Hiển thị lỗi
    if (error) {
        return (
            <div className="container mx-auto py-16 px-4 text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
                <Button onClick={() => window.location.reload()}>Tải lại trang</Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Đơn đăng ký nhận nuôi</h1>
                <p className="text-gray-600 mb-6">Quản lý và theo dõi trạng thái các đơn đăng ký nhận nuôi thú cưng của bạn.</p>

                {/* Filter by status */}
                <div className="flex items-center gap-4 mb-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Filter className="h-4 w-4" />
                                {selectedStatus ? `Trạng thái: ${getStatusInfo(selectedStatus).text}` : "Lọc theo trạng thái"}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => setSelectedStatus(null)}>Tất cả</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedStatus(ApplicationStatus.PENDING)}>
                                Đang xử lý
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedStatus(ApplicationStatus.APPROVED)}>
                                Đã duyệt
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedStatus(ApplicationStatus.REJECTED)}>Từ chối</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedStatus(ApplicationStatus.CANCELLED)}>Đã hủy</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {selectedStatus && (
                        <Button variant="ghost" size="sm" className="h-9 px-2" onClick={() => setSelectedStatus(null)}>
                            <X className="h-4 w-4 mr-1" />
                            Xóa bộ lọc
                        </Button>
                    )}
                </div>

                {/* Results count */}
                <p className="text-sm text-gray-500">
                    Hiển thị {filteredApplications.length} trên tổng số {applications.length} đơn
                </p>
            </div>

            {/* Applications list */}
            {filteredApplications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredApplications.map((application) => {
                        const { date, time } = formatDateTime(application.applicationDate)
                        const statusInfo = getStatusInfo(application.status)
                        const isApproved = application.status.toLowerCase() === ApplicationStatus.APPROVED

                        return (
                            <Card key={application.applicationId} className="overflow-hidden">
                                <div className="flex h-full flex-col">
                                    <CardHeader className="pb-4">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-xl">{application.pet.name}</CardTitle>
                                            <Badge className={cn("flex items-center gap-1 px-2 py-1", statusInfo.color)}>
                                                {statusInfo.icon}
                                                <span>{statusInfo.text}</span>
                                            </Badge>
                                        </div>
                                        <CardDescription className="flex flex-col gap-1 mt-1">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span>{date}</span>
                                                <Clock className="h-4 w-4 text-gray-400 ml-2" />
                                                <span>{time}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <PawPrint className="h-4 w-4 text-gray-400" />
                                                <span>{application.pet.breed}</span>
                                            </div>
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="pb-4 flex-grow">
                                        <div className="flex gap-4">
                                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                                <Image
                                                    src={application.pet.photoURL || "/placeholder.svg?height=96&width=96"}
                                                    alt={application.pet.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="96px"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-1">Thông tin thú cưng</h4>
                                                <ul className="text-sm space-y-1 text-gray-600">
                                                    <li>Tuổi: {application.pet.age} tuổi</li>
                                                    <li>Giới tính: {application.pet.gender === "Male" ? "Đực" : "Cái"}</li>
                                                    <li>Kích thước: {application.pet.size}</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <Separator className="my-4" />

                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="text-sm text-gray-500">Phí nhận nuôi:</span>
                                                <p className="text-lg font-semibold">{application.pet.price.toLocaleString("vi-VN")} VNĐ</p>
                                            </div>

                                            {isApproved && (
                                                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                                                    Chờ thanh toán
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>

                                    <CardFooter className="pt-0 flex gap-3">
                                        <Button variant="outline" className="flex-1" asChild>
                                            <Link href={`/adopt/${application.pet.id}`}>Xem chi tiết</Link>
                                        </Button>

                                        {isApproved && (
                                            <Button
                                                className="flex-1 gap-2 bg-brand hover:bg-brand/90"
                                                onClick={() => handlePayment(application)}
                                            >
                                                <CreditCard className="h-4 w-4" />
                                                Thanh toán
                                            </Button>
                                        )}
                                    </CardFooter>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">Không có đơn đăng ký nào</h3>
                    {selectedStatus ? (
                        <>
                            <p className="text-gray-500 mb-4">Không tìm thấy đơn đăng ký nào với trạng thái đã chọn.</p>
                            <Button onClick={() => setSelectedStatus(null)}>Xem tất cả đơn</Button>
                        </>
                    ) : (
                        <>
                            <p className="text-gray-500 mb-4">
                                Bạn chưa có đơn đăng ký nhận nuôi nào. Hãy khám phá các thú cưng đang chờ được nhận nuôi.
                            </p>
                            <Button asChild>
                                <Link href="/adopt">Tìm thú cưng</Link>
                            </Button>
                        </>
                    )}
                </div>
            )}

            {/* Payment Dialog */}
            <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thanh toán phí nhận nuôi</DialogTitle>
                        <DialogDescription>Hoàn tất thanh toán để tiến hành nhận nuôi thú cưng.</DialogDescription>
                    </DialogHeader>

                    {selectedApplication && (
                        <div className="space-y-4 py-2">
                            <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                                    <Image
                                        src={selectedApplication.pet.photoURL || "/placeholder.svg?height=64&width=64"}
                                        alt={selectedApplication.pet.name}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium">{selectedApplication.pet.name}</h3>
                                    <p className="text-sm text-gray-500">{selectedApplication.pet.breed}</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Phí nhận nuôi</span>
                                    <span>{selectedApplication.pet.price.toLocaleString("vi-VN")} VNĐ</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Tổng cộng</span>
                                    <span>{(selectedApplication.pet.price).toLocaleString("vi-VN")} VNĐ</span>
                                </div>
                            </div>

                            <div className="bg-amber-50 p-3 rounded-md text-sm">
                                <p className="text-amber-800">
                                    Lưu ý: Sau khi thanh toán, bạn sẽ nhận được hướng dẫn chi tiết về quy trình nhận nuôi qua email.
                                </p>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                            Hủy
                        </Button>
                        <Button
                            onClick={() => selectedApplication && processPayment(selectedApplication.applicationId)}
                            className="gap-2 bg-brand hover:bg-brand/90"
                        >
                            <CreditCard className="h-4 w-4" />
                            Thanh toán ngay
                        </Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
