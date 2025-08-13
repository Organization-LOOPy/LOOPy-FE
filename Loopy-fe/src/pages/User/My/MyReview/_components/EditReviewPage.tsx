import { useEffect, useState } from "react";
import CommonHeader from "../../../../../components/header/CommonHeader";
import EditReviewPageSkeleton from "../Skeleton/EditReviewSkeleton";
import ReviewTextArea from "./ReviewTextArea";
import ReviewImageBox from "./ReviewImageBox";
import ReviewBottomButton from "./ReviewBottomButton";
import { useUpdateReview } from "../../../../../hooks/mutation/my/review/useUpdateReview";

const MAX_IMAGES = 5;

interface EditReviewPageProps {
  onBack: () => void;
  review: {
    id: number;
    cafeName: string;
    content: string;
    images: string[];
  };
  onSubmit: (updatedContent: string) => void;
}

const EditReviewPage = ({ onBack, review, onSubmit }: EditReviewPageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviewText, setReviewText] = useState(review.content);
  const [images, setImages] = useState<(string | File)[]>(review.images ?? []);

  const { mutate: updateReviewMutate } = useUpdateReview();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileList = Array.from(e.target.files);
    const remainingSlots = MAX_IMAGES - images.length;
    const limitedFiles = fileList.slice(0, remainingSlots);
    setImages((prev) => [...prev, ...limitedFiles]);
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => {
      const newList = [...prev];
      newList.splice(index, 1);
      return newList;
    });
  };

  const isContentChanged = reviewText.trim() !== review.content.trim();
  const isImageChanged =
    images.length !== review.images.length ||
    images.some((img) => typeof img !== "string");

  const isValid =
    reviewText.trim().length > 0 && (isContentChanged || isImageChanged);

  const handleSubmit = () => {
    updateReviewMutate(
      { reviewId: review.id, data: { title: "", content: reviewText } },
      {
        onSuccess: () => {
          onSubmit(reviewText);
        },
        onError: () => {
          alert("리뷰 수정에 실패했습니다.");
        },
      }
    );
  };

  return (
    <div>
      <CommonHeader title="리뷰 수정" onBack={onBack} />

      {isLoading ? (
        <EditReviewPageSkeleton />
      ) : (
        <>
          <div className="text-[#252525] mt-[1.5rem] text-[1.125rem] font-bold">
            리뷰 내용
          </div>

          <div className="mt-[0.5rem]">
            <div className="bg-[#F3F3F3] rounded-[0.5rem] h-[3rem] px-[1rem] flex items-center text-[1rem] font-semibold text-[#252525]">
              {review.cafeName}
            </div>
          </div>

          <ReviewTextArea value={reviewText} onChange={setReviewText} />

          <ReviewImageBox
            images={images}
            onAdd={handleImageUpload}
            onRemove={handleImageRemove}
          />

          <ReviewBottomButton isValid={isValid} onClick={handleSubmit} />
        </>
      )}
    </div>
  );
};

export default EditReviewPage;
