import { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailClient";


export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<p className="text-center mt-20">Đang tải...</p>}>
            <VerifyEmailClient />
        </Suspense>
    );
}
