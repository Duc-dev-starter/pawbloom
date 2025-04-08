"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FailedPage() {
    const router = useRouter();
    const params = useSearchParams();

    // Lấy đúng tên param từ URL
    const transactionId = params.get("id");
    const code = params.get("code");
    const status = params.get("status");
    const orderCode = params.get("orderCode");

    useEffect(() => {
        if (!transactionId) {
            // Nếu không có id thì chuyển về 404 hoặc trang khác
            router.replace("/not-found");
        }
    }, [transactionId, router]);

    if (!transactionId) {
        // Chưa có transactionId thì không render UI
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
            <XCircle className="text-red-500 w-24 h-24 mb-4" />
            <h1 className="text-2xl font-semibold text-red-700">
                Thanh toán thất bại!
            </h1>
            <p className="mt-2">Mã giao dịch: {transactionId}</p>
            {code && <p>Mã trả về: {code}</p>}
            {status && <p>Trạng thái: {status}</p>}
            {orderCode && <p>Mã đơn: {orderCode}</p>}

            <div className="mt-6 space-x-4">
                <Button onClick={() => router.push("/application")}>
                    Xem lịch sử
                </Button>
                <Button variant="outline" onClick={() => router.push("/")}>
                    Quay lại trang chủ
                </Button>
            </div>
        </div>
    );
}
