import KeywordTags from "../etc/KeywordTags";

interface Props {
    id: number,
    name: string;
    distanceText: string;
    address: string;
    images: string[]; // 첫 번째 이미지만 사용
    keywords: string[];
    isBookmarked: boolean;
    onToggleBookmark: (id: number) => void;
}

const CafeListCard = ({ id, name, distanceText, address, images, keywords, isBookmarked, onToggleBookmark, }: Props) => {
    const handleBookmarkClick = () => {
        onToggleBookmark(id); 
    };

    return (
        <div className="flex w-full bg-transparent rounded-lg relative">
            <img
                src={images[0]}
                alt={name}
                className="w-[6.125rem] h-[6.125rem] rounded-[0.5rem] object-cover mr-[1rem]"
            />

            <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-[1.125rem] font-bold text-[#000]">{name}</span>
                        <span className="ml-2 text-[0.75rem] font-medium text-[#7F7F7F]">{distanceText}</span>
                    </div>
                    <button
                        onClick={handleBookmarkClick}
                        className="w-[1.25rem] h-[1.25rem] flex items-center justify-center"
                    >
                        <img
                        src={
                            isBookmarked
                            ? "src/assets/images/Bookmark-save.svg"
                            : "src/assets/images/Bookmark.svg"
                        }
                        alt="북마크"
                        className="w-full h-full"
                        />
                    </button>
                </div>

                <div className="text-[0.875rem] font-normal text-[#7F7F7F]">
                    {address}
                </div>

                <div className="mt-[0.75rem]">
                    <KeywordTags keywords={keywords} />
                </div>
            </div>
        </div>
    );
};

export default CafeListCard;