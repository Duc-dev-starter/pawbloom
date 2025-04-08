import React, { Suspense } from "react";
import FailedPageClient from "./FailedPageClient";

export default function FailedPage() {
    return (
        <Suspense fallback={<div className="text-center p-4">Đang xử lý...</div>}>
            <FailedPageClient />
        </Suspense>
    );
}
