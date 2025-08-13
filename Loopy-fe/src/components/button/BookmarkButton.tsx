import { useState } from "react";
import Bookmark from "../../assets/images/Bookmark.svg?react";
import BookmarkFilled from "../../assets/images/Bookmark-save.svg?react";

interface BookmarkButtonProps {
    size?: "sm" | "md";
    className?: string;
}

export default function BookmarkButton({
    size = "md",
    className = "",
}: BookmarkButtonProps) {
    const [bookmarked, setBookmarked] = useState(false);

    const handleClick = () => {
        setBookmarked((prev) => !prev);
        // TODO: 추후 API 연동 
    };

    const Icon = bookmarked ? BookmarkFilled : Bookmark;

    const dimensions = size === "sm" ? "w-[1.25rem] h-[1.25rem]" : "w-[1.5rem] h-[1.5rem]";

    return (
        <button
            onClick={handleClick}
            className={`flex items-center justify-center ${dimensions} ${className}`}
        >
            <Icon className="w-full h-full" />
        </button>
    );
}
