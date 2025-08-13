import type { ReactNode } from "react";

interface CommonCardProps {
    children: ReactNode;
    onClick?: () => void;
    isSelected?: boolean;
    padding?: "p-0" | "p-4" | "p-[1.5rem]" | "px-4 py-6";
    className?: string;
}

const CommonCard = ({
    children,
    onClick,
    padding = "p-4",
    className = "",
}: CommonCardProps) => {
    return (
        <div
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            className={`
                w-full rounded-[0.5rem] text-left
                ${padding} 
                ${className}
        `}
        >
            {children}
        </div>
    );
};

export default CommonCard;