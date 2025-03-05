"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FailedPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const transactionId = searchParams.get("transactionId"); // Giả sử thanh toán trả về mã giao dịch

    useEffect(() => {
        if (!transactionId) {
            router.replace("/not-found"); // Nếu không có mã giao dịch -> Điều hướng ngay
        }
    }, [transactionId, router]);

    if (!transactionId) return null; // Tránh hiển thị UI trong khoảnh khắc trước khi redirect

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
            <CheckCircle className="text-red-500 w-24 h-24 mb-4" />
            <h1 className="text-2xl font-semibold text-red-700">Chuyển khoản thất bại!</h1>

            <div className="mt-6 space-x-4">
                <Button onClick={() => router.push("/history")}>Xem lịch sử</Button>
                <Button variant="outline" onClick={() => router.push("/")}>Quay lại trang chủ</Button>
            </div>
        </div>
    );
}
