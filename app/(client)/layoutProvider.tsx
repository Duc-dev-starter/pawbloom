"use client";

import { Footer, Header, ScrollToTopButton } from "@/components/common";
import { useToast } from "@/hooks/use-toast";
import { store } from "@/store/store";
import { registerToast } from "@/utils";
import React, { useEffect } from "react";
import { Provider } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { toast } = useToast();
    useEffect(() => {
        registerToast(toast);
    }, [toast]);
    return (
        <Provider store={store}>
            <main className="flex min-h-screen flex-col">
                <section className="flex h-full flex-1 flex-col">
                    <Header />
                    <div className="flex-1">{children}</div>
                    <Footer />
                    <ScrollToTopButton />
                </section>
            </main>
        </Provider>

    );
};

export default Layout;
