"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPageClient() {
    const router = useRouter();
    const params = useSearchParams();

    const transactionId = params.get("id");
    const orderCode = params.get("orderCode");

    useEffect(() => {
        if (!transactionId) {
            router.replace("/not-found");
        }
    }, [transactionId, router]);

    if (!transactionId) return null;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
            <CheckCircle className="text-green-500 w-24 h-24 mb-4" />
            <h1 className="text-2xl font-semibold text-green-700">
                Chuyển khoản thành công!
            </h1>
            <p className="text-center text-muted-foreground mt-2">
                Mã đơn hàng: <strong>{orderCode}</strong>
                <br />
                Mã giao dịch: <strong>{transactionId}</strong>
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
