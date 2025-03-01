import { Metadata } from "next";
import React from "react";
import Layout from "./layoutProvider";

export const metadata: Metadata = {
    title: {
        default: "Pawbloom",
        template: "%s | Pawbloom",
    },
    description: "Pawbloom - Cơ hội thứ hai, mái ấm mãi mãi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <Layout>{children}</Layout>;
}
