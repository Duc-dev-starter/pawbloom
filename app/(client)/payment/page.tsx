import React from "react";
import Image from "next/image";

const PaymentPage = () => {
    // Thông tin chuyển khoản
    const bankCode = "TPB"; // TPBank
    const accountNumber = "0898320059"; // Số tài khoản
    const amount = 5000; // Số tiền (VND)
    const note = "DONHANG_12345"; // Nội dung chuyển khoản

    // API tạo QR VietQR (có thể dùng qrcode.react thay thế)
    const qrUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact.png?amount=${amount}&addInfo=${note}`;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4 text-purple-700">
                    Thanh Toán Qua Chuyển Khoản
                </h1>

                {/* Hiển thị QR Code từ VietQR */}
                <Image src={qrUrl} alt="QR Thanh Toán" width={300} height={300} />

                <p className="text-gray-700 mt-4">Quét mã QR bằng ứng dụng ngân hàng để thanh toán.</p>

                {/* Thông tin tài khoản */}
                <div className="mt-6 text-left">
                    <p><strong>Ngân hàng:</strong> TPBank</p>
                    <p><strong>Số tài khoản:</strong> 123456789</p>
                    <p><strong>Số tiền:</strong> 500,000 VND</p>
                    <p><strong>Nội dung:</strong> <span className="text-red-500">{note}</span></p>
                </div>


            </div>
        </div>
    );
};

export default PaymentPage;
