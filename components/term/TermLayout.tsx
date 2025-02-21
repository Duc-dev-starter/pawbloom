"use client"
import { sidebarPolicies } from '@/constants/terms';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import React from 'react';
interface TermsLayoutProps {
    children: ReactNode;
}

const TermsLayout: React.FC<TermsLayoutProps> = ({ children }) => {
    const pathname = usePathname();

    return (
        <div className="flex flex-1">
            <div className="flex-1 min-w-[1px] flex">
                <div className="block border-r border-gray-300 w-80 transition-all duration-300 md:w-[15rem] sm:w-full sm:border-b">
                    <div className="py-6 px-0 sticky top-0">
                        <ul className="py-3 px-0 m-0 max-w-none">
                            {sidebarPolicies.map((policy) => (
                                <li key={policy.id} className="mt-0 pl-0">
                                    <a
                                        href={policy.link}
                                        className={`${pathname === policy.link
                                            ? 'bg-[#2d2f31] text-white'
                                            : 'bg-transparent text-[#6a6f73]'
                                            } py-3 px-6 flex items-start w-full h-auto text-left`}
                                    >
                                        <div className="flex-1 min-w-[1px] min-h-9">
                                            {policy.name}
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default TermsLayout;
