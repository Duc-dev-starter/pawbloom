"use client";

import { Footer, Header, ScrollToTopButton } from "@/components/common";
import { store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
