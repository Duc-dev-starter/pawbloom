import "./globals.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import 'swiper/css';
import { Inter } from "next/font/google";


const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} remove-scrollbar font-sans antialiased`}
      >
        <TooltipProvider>
          <Tooltip>
            {children}
          </Tooltip>
        </TooltipProvider>
        <ToastContainer />
        <Toaster />

      </body>
    </html>
  );
}
