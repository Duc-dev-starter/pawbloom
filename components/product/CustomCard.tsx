const CustomCard = ({ children, className = "" }) => {
    return (
        <div
            className={`overflow-hidden rounded-lg bg-white p-6 ${className}`}
        >
            {children}
        </div>
    );
};

export default CustomCard;