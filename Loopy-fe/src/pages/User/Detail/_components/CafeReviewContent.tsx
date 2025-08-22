import { useState } from "react";

interface Review {
    id: number;
    user: {
        profileImage: string;
        nickname: string;
        stampStatus: string;
    };
    date: string;
    images: string[];
    content: string;
}

interface CafeReviewContentProps {
    reviews: Review[];
    onOpenModal: (images: string[]) => void;
}

export default function CafeReviewContent({ reviews, onOpenModal }: CafeReviewContentProps) {
    const [currentIndexes, setCurrentIndexes] = useState<number[]>(
        reviews.map(() => 0)
    );

    const handleNext = (index: number) => {
        setCurrentIndexes((prev) =>
            prev.map((val, i) =>
                i === index && val < reviews[i].images.length - 1 ? val + 1 : val
            )
        );
    };

    const handlePrev = (index: number) => {
        setCurrentIndexes((prev) =>
            prev.map((val, i) => (i === index && val > 0 ? val - 1 : val))
        );
    };

    if (reviews.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-[8rem]">
                <p className="text-[#6970F3] text-[1.125rem] font-bold leading-[100%]">
                    현재 매장에 작성된 리뷰가 없어요!
                </p>
                <p className="mt-[0.75rem] text-[#7F7F7F] text-[0.875rem] font-normal leading-[100%]">
                    매장의 첫 리뷰 작성자가 되어볼까요?
                </p>
            </div>
        );
    }

    return (
        <>
            {reviews.map((review, i) => {
                console.log("map index 확인:", i);
                console.log("리뷰 총 개수:", reviews.length);
                return (
                    <div key={review.id}>
                        <ReviewItem
                            review={review}
                            currentImageIndex={currentIndexes[i]}
                            onNext={() => handleNext(i)}
                            onPrev={() => handlePrev(i)}
                            onImageClick={() => onOpenModal(review.images)}
                        />
                        {i !== reviews.length - 1 && (
                            <div className="w-full h-[1px] bg-[#F3F3F3] mt-[1.5rem]" />
                        )}
                    </div>
                );
            })}
        </>
    );
}

interface ReviewItemProps {
    review: Review;
    currentImageIndex: number;
    onNext: () => void;
    onPrev: () => void;
    onImageClick: () => void;
}

function ReviewItem({
    review,
    onImageClick,
}: ReviewItemProps) {
    return (
        <div>
            <div className="flex gap-[0.75rem]">
                <img
                    src={review.user.profileImage}
                    alt="profile"
                    className="w-[2.5rem] h-[2.5rem] rounded-full object-cover"
                />
                <div className="flex-1">
                    <div className="text-[0.875rem] font-semibold">
                        {review.user.nickname}
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-[0.75rem] text-[#7F7F7F] font-normal">
                            {review.user.stampStatus}
                        </div>
                        <div className="text-[0.75rem] text-[#7F7F7F] font-normal whitespace-nowrap">
                            {review.date}
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative mt-[0.75rem] w-[calc(100%+1.5rem)] h-[10.5rem] pr-[1.5rem] -mr-[1.5rem] overflow-x-auto overflow-y-hidden whitespace-nowrap custom-scrollbar" onClick={onImageClick}>
                {review.images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`review-${idx}`}
                        className="inline-block w-[10.5rem] h-[10.5rem] object-cover shrink-0 mr-[0.5rem] last:mr-0"
                    />
                ))}
            </div>

            <p className="mt-[0.75rem] text-[0.875rem] font-normal text-[#3B3B3B] leading-[150%]">
                {review.content}
            </p>
        </div>
    );
}
