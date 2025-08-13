import React from "react";
import KeywordTags from "../etc/KeywordTags";
import BookmarkButton from "../button/BookmarkButton";

interface Props {
    name: string;
    distanceText: string;
    address: string;
    images: string[];
    keywords: string[];
    onClick?: () => void;
}

const CafeDetailCard = ({ name, distanceText, address, images, keywords, onClick }: Props) => {
    const imagesToShow = images.slice(0, 3);
    const stop = (e: React.SyntheticEvent) => {
        e.stopPropagation(); // 카드로 이벤트 안 올라가게
    };

    return (
        <div 
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onClick?.(); }}      
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); }
            }}
            className="w-full h-[16.25rem] px-[1.5rem] pt-[1.625rem] pb-[1.5rem] bg-white rounded-t-[1rem] box-border relative"
            style={{ boxShadow: '0 -4px 10px 0 rgba(0,0,0,0.05)' }}
        >
            <div className="flex justify-between">
                <div className="flex items-center gap-[0.5rem]">
                    <span className="text-[1.25rem] font-bold">{name}</span>
                    <span className="text-[0.875rem] font-normal text-[#A8A8A8]">
                        {distanceText}
                    </span>
                </div>
                <div onClick={stop} onMouseDown={stop} onKeyDown={stop} className="shrink-0">
                    <BookmarkButton size="sm" />
                </div>
            </div>

            <div className="text-[0.875rem] font-normal text-[#7F7F7F] mt-[0.25rem]">
                {address}
            </div>

            {imagesToShow.length > 0 ? (
                <div className="flex gap-[0.5rem] mt-[0.5rem]">
                    {imagesToShow.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`카페 이미지 ${i + 1}`}
                            className="w-[6.875rem] h-[6.875rem] object-cover rounded-[0.5rem]"
                        />
                    ))}
                </div>
            ) : (
                <div className="h-[6.875rem] mt-[0.75rem]" />
            )}

            <div className="mt-[0.75rem]">
                <KeywordTags keywords={keywords} />
            </div>
        </div>
    );
};

export default CafeDetailCard;
