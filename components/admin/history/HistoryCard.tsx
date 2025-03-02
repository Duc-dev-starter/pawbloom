import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle, XCircle, Clock, MapPin, Mail, PhoneCall } from "lucide-react";

interface HistoryItem {
    id: string;
    name: string;
    status: "approved" | "pending" | "denied";
    image: string;
    vaccinated: boolean;
    shelter: string;
    pickupAddress: string;
    adopterName: string;
    adopterPhone?: string;
    adopterEmail?: string;
    date: string;
}

const statusColors: Record<HistoryItem["status"], string> = {
    approved: "bg-green-500",
    pending: "bg-yellow-500",
    denied: "bg-red-500",
};

const statusIcons: Record<HistoryItem["status"], React.JSX.Element> = {
    approved: <CheckCircle className="size-5 text-white" />,
    pending: <Clock className="size-5 text-white" />,
    denied: <XCircle className="size-5 text-white" />,
};

const HistoryCard: React.FC<{ data: HistoryItem }> = ({ data }) => {
    const [imgSrc, setImgSrc] = useState(data.image || "/placeholder.jpg");

    return (
        <div className="border rounded-xl overflow-hidden shadow-sm bg-white mb-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 md:px-4 gap-6 lg:gap-4">

                {/* Ảnh & thông tin thú cưng */}
                <div className="flex flex-col lg:flex-row gap-5 w-full lg:w-auto">
                    <Image
                        src={imgSrc}
                        alt={data.name}
                        width={200}
                        height={150}
                        className="rounded-xl object-cover w-full lg:w-[200px] h-[150px]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={() => setImgSrc("/placeholder.jpg")}
                    />
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold my-2">{data.name}</h2>
                            <div className="flex items-center mb-2 w-full">
                                <MapPin className="size-5 mr-1 shrink-0" />
                                <span className="max-w-[15rem] break-words whitespace-normal">
                                    {data.pickupAddress}
                                </span>
                            </div>
                        </div>
                        <div className="text-xl font-semibold">
                            {/* Giá trị chỉ để demo */}
                            500,000 VND{" "}
                            <span className="text-sm font-normal">/ hỗ trợ</span>
                        </div>
                    </div>
                </div>

                {/* Ngăn cách - desktop only */}
                <div className="hidden lg:block border-[0.5px] border-primary-200 h-48" />

                {/* Trạng thái & ngày nhận */}
                <div className="flex flex-col justify-between w-full lg:basis-2/12 lg:h-48 py-2 gap-3 lg:gap-0">
                    <div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">Trạng thái:</span>
                            <span className={`px-2 py-1 flex items-center gap-1 ${statusColors[data.status]} text-white rounded-full text-sm`}>
                                {statusIcons[data.status]} {data.status === "approved" ? "Đã nhận" : data.status === "pending" ? "Chờ duyệt" : "Bị hủy"}
                            </span>
                        </div>
                        <hr className="mt-3" />
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Ngày thanh toán:</span>{" "}
                        {new Date(data.date).toLocaleDateString()}
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Ngày đến nhận:</span>{" "}
                        {new Date(data.date).toLocaleDateString()}
                    </div>

                </div>

                {/* Ngăn cách - desktop only */}
                <div className="hidden lg:block border-[0.5px] border-primary-200 h-48" />

                {/* Thông tin người nhận */}
                <div className="flex flex-col justify-start gap-5 w-full lg:basis-3/12 lg:h-48 py-2">
                    <div>
                        <div className="text-lg font-semibold">Người nhận</div>
                        <hr className="mt-3" />
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <Image
                                src="/user-avatar.png"
                                alt={data.adopterName}
                                width={40}
                                height={40}
                                className="rounded-full mr-2 min-w-[40px] min-h-[40px]"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-semibold">{data.adopterName}</div>
                            {data.adopterPhone && (
                                <div className="text-sm flex items-center text-primary-600">
                                    <PhoneCall className="size-5 mr-2" />
                                    {data.adopterPhone}
                                </div>
                            )}
                            {data.adopterEmail && (
                                <div className="text-sm flex items-center text-primary-600">
                                    <Mail className="size-5 mr-2" />
                                    {data.adopterEmail}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HistoryCard;
