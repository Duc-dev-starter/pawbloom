import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import React from "react";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: "Pawbloom",
  description: "Pawbloom - Cơ hội thứ hai, mái ấm mãi mãi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} remove-scrollbar font-poppins antialiased`}
      >
        {children}
        <ToastContainer />

      </body>
    </html>
  );
}
