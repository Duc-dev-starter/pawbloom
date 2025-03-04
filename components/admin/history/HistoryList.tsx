"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HistoryCard from "./HistoryCard";
import React, { useState } from "react";

const historyData = [
    {
        id: "1",
        name: "Bé Cún Đốm",
        status: "approved",
        image: "/assets/images/homepage.png",
        vaccinated: true,
        shelter: "Trạm cứu hộ động vật TP.HCM",
        pickupAddress: "123 Đường Lê Văn Sỹ, Quận 3, TP.HCM",
        adopterName: "Nguyễn Văn A",
        date: "2024-02-10",
    },
    {
        id: "2",
        name: "Mèo Mun",
        status: "pending",
        image: "/assets/images/homepage.png",

        vaccinated: false,
        shelter: "Nhà cứu trợ động vật Hà Nội",
        pickupAddress: "45 Đường Hoàng Hoa Thám, Ba Đình, Hà Nội",
        adopterName: "Trần Thị B",
        date: "2024-02-12",
    },
    {
        id: "3",
        name: "Chó Husky",
        status: "denied",
        image: "/assets/images/homepage.png",

        vaccinated: true,
        shelter: "Hội yêu thú cưng Đà Nẵng",
        pickupAddress: "789 Đường Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
        adopterName: "Lê Văn C",
        date: "2024-02-15",
    },
];

interface HistoryItem {
    id: string;
    name: string;
    status: "approved" | "pending" | "denied";
    image: string;
    vaccinated: boolean;
    shelter: string;
    pickupAddress: string;
    adopterName: string;
    date: string;
}

const HistoryList = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'denied'>('all');

    const filteredHistory =
        activeTab === 'all'
            ? historyData
            : historyData.filter((item) => item.status === activeTab);

    return (

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "pending" | "denied" | "approved" | "all")} className="w-full my-5">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="pending">Đang chờ</TabsTrigger>
                <TabsTrigger value="approved">Chấp nhận</TabsTrigger>
                <TabsTrigger value="denied">Bị hủy</TabsTrigger>
            </TabsList>
            {['all', 'pending', 'denied', 'approved'].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-5 w-full">
                    {filteredHistory.length > 0 ? (
                        <div className="">
                            {filteredHistory.map((history) => (
                                <HistoryCard key={history.id} data={history as HistoryItem} />

                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Không có đơn hàng nào</p>
                    )}
                </TabsContent>
            ))}
        </Tabs>
    );
};


export default HistoryList;
