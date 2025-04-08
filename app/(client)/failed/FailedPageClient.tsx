"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cancelOrder } from "@/services/order";
import { toast } from "@/hooks/use-toast";

export default function FailedPageClient() {
    const router = useRouter();
    const params = useSearchParams();

    const transactionId = params.get("id");
    const status = params.get("status");
    const orderCode = params.get("orderCode");

    useEffect(() => {
        if (!transactionId) {
            router.replace("/not-found");
        }
    }, [transactionId, router]);

    useEffect(() => {
        if (orderCode && status === "CANCELLED") {
            cancelOrder(orderCode)
                .then(() => {
                    toast({
                        title: "Đã hủy đơn",
                        description: `Đơn ${orderCode} đã được cập nhật trạng thái hủy.`,
                    });
                })
                .catch(() => {
                    toast({
                        title: "Lỗi",
                        description: "Không thể cập nhật trạng thái đơn.",
                        variant: "destructive",
                    });
                });
        }
    }, [orderCode, status]);

    if (!transactionId) return null;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
            <XCircle className="text-red-500 w-24 h-24 mb-4" />
            <h1 className="text-2xl font-semibold text-red-700">
                Thanh toán thất bại
            </h1>
            <p className="text-center text-sm mt-2 text-gray-500">
                Đơn hàng {orderCode} đã bị hủy hoặc gặp sự cố trong quá trình xử lý.
            </p>
            <div className="flex gap-4">
                <Button variant={"secondary"} onClick={() => router.push("/application")} className="mt-6">
                    Xem lại đơn
                </Button>
                <Button onClick={() => router.push("/")} className="mt-6">
                    Quay lại trang chính
                </Button>
            </div>
        </div>
    );
}
