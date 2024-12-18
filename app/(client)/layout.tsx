import { Footer, Header } from "@/components/common";
import MobileNavigation from "@/components/MobileNavigation";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
    title: {
        default: "Pawbloom",
        template: "%s | Pawbloom",
    },
    description: "Pawbloom - Cơ hội thứ hai, mái ấm mãi mãi",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <main className="flex min-h-screen flex-col">
                <section className="flex h-full flex-1 flex-col">
                    {/* <MobileNavigation /> */}
                    <Header />
                    <div className="flex-1">{children}</div>
                    <Footer />
                </section>
            </main>
        </>
    )
}

export default Layout;
