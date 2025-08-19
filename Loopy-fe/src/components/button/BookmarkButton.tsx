import Bookmark from "../../assets/images/Bookmark.svg?react";
import BookmarkFilled from "../../assets/images/Bookmark-save.svg?react";

interface BookmarkButtonProps {
  size?: "sm" | "md";
  className?: string;
  isBookmarked: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;  
}

export default function BookmarkButton({
  size = "md",
  className = "",
  isBookmarked,
  onClick
}: BookmarkButtonProps) {
  const BookmarkIcon = isBookmarked ? BookmarkFilled : Bookmark;
  const buttonSize =
    size === "sm" ? "w-[1.25rem] h-[1.25rem]" : "w-[1.5rem] h-[1.5rem]";

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center ${buttonSize} ${className}`}
    >
      <BookmarkIcon className="w-full h-full" />
    </button>
  );
}
