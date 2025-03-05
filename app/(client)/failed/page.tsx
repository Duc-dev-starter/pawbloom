"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FailedPage() {
    const router = useRouter();
    const [transactionId, setTransactionId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get("transactionId");
            setTransactionId(id);

            if (!id) {
                router.replace("/not-found");
            }
        }
    }, [router]);

    if (!transactionId) return null; // Không hiển thị UI trước khi redirect

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
            <CheckCircle className="text-red-500 w-24 h-24 mb-4" />
            <h1 className="text-2xl font-semibold text-red-700">Chuyển khoản thất bại!</h1>
            <p className="text-gray-600">Mã giao dịch: {transactionId}</p>

            <div className="mt-6 space-x-4">
                <Button onClick={() => router.push("/history")}>Xem lịch sử</Button>
                <Button variant="outline" onClick={() => router.push("/")}>Quay lại trang chủ</Button>
            </div>
        </div>
    );
}
