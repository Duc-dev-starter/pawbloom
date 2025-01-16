import "./globals.css";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import React from "react";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import 'swiper/css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
})


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
