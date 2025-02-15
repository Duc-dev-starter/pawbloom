import React from "react";

const CustomCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <div
            className={`overflow-hidden rounded-lg bg-white p-6 ${className}`}
        >
            {children}
        </div>
    );
};


export default CustomCard;