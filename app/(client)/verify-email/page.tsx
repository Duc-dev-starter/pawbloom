import dynamic from "next/dynamic";

// Dùng dynamic import với ssr: false để đảm bảo chạy ở client
const VerifyEmailClient = dynamic(() => import("./VerifyEmailClient"), {
    ssr: false,
    loading: () => <p className="text-center mt-20">Đang tải...</p>,
});

export default function VerifyEmailPage() {
    return (
        <VerifyEmailClient />
    );
}
