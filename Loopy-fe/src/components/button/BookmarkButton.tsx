import Bookmark from "../../assets/images/Bookmark.svg?react";
import BookmarkFilled from "../../assets/images/Bookmark-save.svg?react";

interface BookmarkButtonProps {
  size?: "sm" | "md";
  className?: string;
  isBookmarked: boolean;
}

export default function BookmarkButton({
  size = "md",
  className = "",
  isBookmarked,
}: BookmarkButtonProps) {
  const BookmarkIcon = isBookmarked ? BookmarkFilled : Bookmark;
  const buttonSize =
    size === "sm" ? "w-[1.25rem] h-[1.25rem]" : "w-[1.5rem] h-[1.5rem]";

  return (
    <div
      className={`flex items-center justify-center ${buttonSize} ${className}`}
    >
      <BookmarkIcon className="w-full h-full" />
    </div>
  );
}
