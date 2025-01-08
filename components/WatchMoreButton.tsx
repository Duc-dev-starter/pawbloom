import Link from 'next/link';
import React from 'react'

type CustomButton = {
    href: string;
}

const WatchMoreButton: React.FC<CustomButton> = ({ href }) => {
    return (
        <Link href={href}>
            <button className="mt-4 rounded-md bg-brand px-6 py-3 text-white transition-transform duration-300 hover:scale-105">
                Xem Thêm
            </button>
        </Link>
    )
}

export default WatchMoreButton