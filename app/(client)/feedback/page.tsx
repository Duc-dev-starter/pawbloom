import FeedbackForm from "@/components/feedback/FeedbackForm"

export const metadata = {
    title: "Gửi Phản Hồi | Pawbloom",
    description: "Gửi phản hồi, góp ý hoặc câu hỏi của bạn cho chúng tôi",
}

export default function FeedbackPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold md:text-4xl">Gửi Phản Hồi</h1>
                    <p className="text-lg text-gray-600">
                        Chúng tôi luôn mong muốn lắng nghe ý kiến của bạn để cải thiện dịch vụ
                    </p>
                </div>

                <FeedbackForm />
            </div>
        </div>
    )
}
