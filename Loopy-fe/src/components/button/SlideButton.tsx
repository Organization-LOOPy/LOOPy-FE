import clsx from "clsx";
import ArrowRightWhite from "../../assets/images/chevron-right-white.svg";
import ArrowLeftWhite from "../../assets/images/chevron-left-white.svg";
import ArrowRightBlack from "../../assets/images/chevron-right-black.svg";
import ArrowLeftBlack from "../../assets/images/chevron-left-black.svg";

interface SlideNavButtonProps {
    variant: "white" | "transparent";
    direction: "left" | "right";
    onClick?: () => void;
}

export default function SlideNavButton({
    variant,
    direction,
    onClick,
}: SlideNavButtonProps) {
    const baseStyle =
        "flex w-[2.5rem] h-[2.5rem] p-[0.546875rem_0.46875rem] justify-center items-center gap-[0.78125rem] flex-shrink-0 aspect-square rounded-[1.171875rem]";

    const variantStyle =
        variant === "white"
        ? "bg-white shadow-[0_0_5px_rgba(0,0,0,0.15)]"
        : "bg-white/30 backdrop-blur-[5px]";

    const positionStyle =
        direction === "left"
        ? "left-[0.5rem]"
        : "right-[0.5rem]";

    const iconSrc =
        variant === "white"
        ? direction === "left"
            ? ArrowLeftBlack
            : ArrowRightBlack
        : direction === "left"
            ? ArrowLeftWhite
            : ArrowRightWhite;
        
    return (
        <button
            onClick={onClick}
            className={clsx(
                baseStyle,
                variantStyle,
                "absolute top-1/2 -translate-y-1/2 z-10",
                positionStyle
            )}
            >
            <img src={iconSrc} alt={`${direction} arrow`} className="w-[1rem] h-[1rem]" />
        </button>
    );
}
