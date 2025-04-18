const AdoptionProcess = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8 md:px-16">
            <h1 className="text-3xl font-bold mb-8 border-b pb-2">Nhận Nuôi</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">Quy Trình Nhận Nuôi</h2>
                    <p className="text-gray-700 mb-6">
                        Trước khi quyết định nhận nuôi bé chó hay mèo nào, bạn hãy tự hỏi bản thân rằng mình đã sẵn sàng để chịu trách
                        nhiệm cả đời cho bé chưa, cả về tài chính, nơi ở cũng như tinh thần...
                    </p>

                    <p className="text-gray-700 mb-4">Bạn đã sẵn sàng? Hãy thực hiện các bước sau đây nhé:</p>

                    <div className="space-y-3 mb-8">
                        {[
                            "Tìm hiểu về thú cưng bạn muốn nhận nuôi trên trang web của Pawbloom.",
                            "Liên hệ với Pawbloom(SĐT, Email có ở dưới phần footer).",
                            "Tham gia phỏng vấn nhận nuôi.",
                            "Chuẩn bị cơ sở vật chất, ký giấy tờ nhận nuôi và đóng tiền via để đón bé về.",
                            "Đến nhận nuôi trực tiếp(Địa chỉ ở dưới footer) để biết những điều lưu ý khi nuôi thú cưng.",
                            "Thường xuyên cập nhật về tình hình của bé, đặc biệt là khi có sự cố để được tư vấn kịp thời."
                        ].map((step, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center font-bold">
                                    {index + 1}
                                </div>
                                <p className="text-gray-700">{step}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                            <span className="text-yellow-500">!</span> Lưu ý:
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>- Chỉ inbox 01 Tình nguyện viên phỏng vấn...</li>
                            <li>- Phỏng vấn có thể có nhiều câu hỏi riêng tư...</li>
                            <li>- Tiền via mỗi bé sẽ khác nhau tùy vào tình trạng cứu hộ.</li>
                        </ul>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="bg-gray-50 p-6 rounded-lg h-fit">
                        <h2 className="text-xl font-bold mb-4">Điều Kiện Nhận Nuôi</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-2">
                                <span className="text-brand text-2xl">🐾</span>
                                <span className="text-gray-700">Tài chính tự chủ và ổn định.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-brand text-2xl">🐾</span>
                                <span className="text-gray-700">Chỗ ở cố định, ưu tiên tại TPHCM.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-brand text-2xl">🐾</span>
                                <span className="text-gray-700">Cam kết tiêm phòng và triệt sản.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdoptionProcess;
