"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false); // Kiểm soát hiển thị nút
    const [prevScrollY, setPrevScrollY] = useState(0); // Vị trí cuộn trước đó

    useEffect(() => {
        const handleScroll = (): void => {
            const currentScrollY = window.scrollY;

            // Nếu người dùng lướt lên và không ở đầu trang thì hiển thị nút
            if (currentScrollY < prevScrollY && currentScrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Cập nhật vị trí cuộn trước đó
            setPrevScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollY]); // Lắng nghe thay đổi vị trí cuộn trước đó

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="fixed bottom-10 right-10 rounded-full bg-black p-3 text-white shadow-lg transition hover:bg-gray-800"
            >
                <FaArrowUp size={24} />
            </button>
        )
    );
};

export default ScrollToTopButton;
