import React, { Suspense } from "react";
import SuccessPageClient from "./SuccessPageClient";

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="text-center p-4">Đang xử lý...</div>}>
            <SuccessPageClient />
        </Suspense>
    );
}
