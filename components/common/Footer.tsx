import Path from '@/constants/paths';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const FOOTER_LINKS = [
    {
        title: 'Tìm Hiểu Thêm',
        links: [
            { label: 'Về chúng tôi', href: '/about' },
            { label: 'Cách thức hoạt động', href: '/press-releases' },
            { label: 'Sự đảm bảo chăm sóc', href: '/environment' },
        ],
    },
    {
        title: 'Câu hỏi thường gặp',
        links: [
            { label: 'Làm thế nào để nhận nuôi', href: '/community/climbing' },
            { label: 'Có phí nhận nuôi không', href: '/community/hiking' },
            { label: 'Cần cung cấp thông tin gì khi đăng kí', href: '/community/kinthill' },
            { label: 'Cần chuẩn bị gì trước khi nhận nuôi', href: '/community/kinthill' },
        ],
    },
];

export const FOOTER_CONTACT_INFO = {
    title: 'Liên hệ',
    links: [
        { label: '/assets/icons/phone.svg', value: '+8489 832 0059', href: 'tel:+8489 832 0059' },
        { label: '/assets/icons/mail.svg', value: 'pawbloom@gmail.com', href: 'mailto:pawbloom@gmail.com' },
    ],
};

export const SOCIALS = {
    title: 'Mạng xã hội',
    links: [
        { icon: '/assets/icons/facebook.svg', href: 'https://facebook.com' },
        { icon: '/assets/icons/instagram.svg', href: 'https://instagram.com' },
        { icon: '/assets/icons/spotify.svg', href: 'https://spotify.com' },
        { icon: '/assets/icons/youtube.svg', href: 'https://youtube.com' },
    ],
};
const Footer = () => {
    return (
        <footer className="mb-10 flex-center border-t-2 border-brand p-7 pt-8">
            <div className="3xl:px-0 mx-auto flex w-full max-w-[1440px] flex-col gap-14 px-6 lg:px-20">
                <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
                    <Link href={Path.HOME} className="mb-10">
                        <Image src="/assets/icons/logo.svg" alt="logo" width={160} height={29} />
                        <div className='pl-4'>
                            <p className="subtitle-2 pb-2">
                                &copy; 2024 PawBloom
                            </p>
                            <p className="subtitle-2">
                                Tất cả quyền được bảo lưu
                            </p>
                        </div>
                    </Link>

                    <div className="flex flex-wrap gap-5 sm:justify-around md:flex-1">
                        {/* FOOTER_LINKS */}
                        {FOOTER_LINKS.map((columns, index) => (
                            <FooterColumn key={index} title={columns.title}>
                                <ul className="flex flex-col gap-4 text-[14px] font-[400] text-[#7B7B7B]">
                                    {columns.links.map((link, linkIndex) => (
                                        <Link
                                            href={link.href}
                                            key={linkIndex}
                                            className="relative max-w-[200px] break-words transition-colors hover:text-brand-100"
                                        >
                                            {link.label}
                                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-100 transition-all duration-300 hover:w-full"></span>
                                        </Link>


                                    ))}
                                </ul>

                            </FooterColumn>
                        ))}

                        {/* CONTACT SECTION */}
                        <div className="flex flex-col gap-5">
                            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                                {FOOTER_CONTACT_INFO.links.map((link) => (
                                    <Link
                                        href={link.href}
                                        key={link.label}
                                        className="flex gap-4 md:flex-col lg:flex-row"
                                    >
                                        <Image src={link.label} alt={link.label} width={20} height={20} />
                                        <p className="whitespace-nowrap text-[14px] font-[600] text-[#021639]">
                                            {link.value}
                                        </p>
                                    </Link>
                                ))}
                            </FooterColumn>

                            {/* SOCIALS SECTION */}
                            <div className='mt-5'>
                                <FooterColumn title={SOCIALS.title}>
                                    <ul className="flex gap-4 text-[14px] font-[400] text-[#7B7B7B]">
                                        {SOCIALS.links.map((social) => (
                                            <Link href={social.href} key={social.href} target="_blank" rel="noopener noreferrer">
                                                <Image src={social.icon} alt="social icon" width={24} height={24} className='text-brand hover:scale-110 ' />
                                            </Link>
                                        ))}
                                    </ul>
                                </FooterColumn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};


type FooterColumnProps = {
    title: string;
    children: React.ReactNode;
}

const FooterColumn = ({ title, children }: FooterColumnProps) => {
    return (
        <div className="flex flex-col gap-5">
            <h4 className="whitespace-nowrap text-[18px] font-[700]">{title}</h4>
            {children}
        </div>
    )
}

export default Footer