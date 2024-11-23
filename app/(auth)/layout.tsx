import React from "react";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen">
            <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
                <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
                    <Link href="/">
                        <Image
                            src="/assets/icons/logo.svg"
                            alt="logo"
                            width={224}
                            height={82}
                            className="h-auto"
                        />
                    </Link>

                    <div className="space-y-5 text-white">
                        <h1 className="h1">Tìm những thú cưng thích hợp với bạn</h1>
                        <p className="body-1">
                            Đây là nơi bạn có thể tìm thấy thú cưng ở trên địa bàn TPHCM.
                        </p>
                    </div>
                    <Image
                        src="/assets/images/files.png"
                        alt="Files"
                        width={342}
                        height={342}
                        className="transition-all hover:rotate-2 hover:scale-105"
                    />
                </div>
            </section>

            <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
                <div className="mb-16 lg:hidden">
                    <Image
                        src="/assets/icons/logo-full-brand.svg"
                        alt="logo"
                        width={224}
                        height={82}
                        className="h-auto w-[200px] lg:w-[250px]"
                    />
                </div>

                {children}
            </section>
        </div>
    );
};

export default Layout;