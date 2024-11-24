import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import React from "react";

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
