import { useState, useEffect } from "react";
import CommonHeader from "../../../../components/header/CommonHeader";
import ReviewItem from "./_components/ReviewItem";
import CommonBottomPopup from "../../../../components/popup/CommonBottomPopup";
import EditReviewPage from "./_components/EditReviewPage";
import ReviewListSkeleton from "./Skeleton/MyReviewSkeleton";
import { useMyReviews } from "../../../../hooks/query/my/userMyReviews";
import { useDeleteReview } from "../../../../hooks/mutation/my/review/useDeleteReview";
import { useInView } from "react-intersection-observer";
import { dummyReviews } from "../../../../mock/dummyReviews";

interface MyReviewPageProps {
  onBack: () => void;
}

const MyReviewPage = ({ onBack }: MyReviewPageProps) => {
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(false);

  const {
    data,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMyReviews();

  const { mutate: deleteReviewMutate } = useDeleteReview();

  const { ref, inView } = useInView();

  const firstPage = data?.pages?.[0]?.data ?? [];
  const otherPages = data?.pages?.slice(1).flatMap((p) => p.data) ?? [];

  const reviews = isSuccess && firstPage.length === 0
    ? dummyReviews
    : [...firstPage, ...otherPages];

  const handleClick = (reviewId: number) => {
    setEditingReviewId(reviewId);
  };

  const handleDelete = (id: number) => {
    deleteReviewMutate(id, {
      onSuccess: () => {
        setShowDeleteSuccess(true);
      },
      onError: () => {
        alert("리뷰 삭제에 실패했습니다.");
      },
    });
  };

  const handleUpdate = () => {
    setEditingReviewId(null); 
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      setIsNextLoading(true);
      fetchNextPage().finally(() => setIsNextLoading(false));
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (editingReviewId !== null) {
    const selectedReview = reviews.find((r) => r.id === editingReviewId);
    if (!selectedReview) return null;

    return (
      <EditReviewPage
        review={selectedReview}
        onBack={() => setEditingReviewId(null)}
        onSubmit={handleUpdate}
      />
    );
  }

  return (
    <div className="flex flex-col -mx-[1.5rem] custom-scrollbar">
      <div className="mx-[1.5rem]">
        <CommonHeader title="내가 작성한 리뷰" onBack={onBack} />
      </div>

      {isLoading ? (
        <ReviewListSkeleton />
      ) : (
        <>
          <div className="mx-[1.5rem]">
            <p className="mt-[1.5rem] text-[1rem] font-semibold">
              내가 쓴 리뷰 총 {reviews.length}개
            </p>
          </div>

          <div className="flex-1 overflow-y-auto mt-[1.5rem] space-y-[2.125rem] mb-[3rem]">
            {reviews.map((review) => (
              <ReviewItem
                key={review.id}
                id={review.id}
                cafeName={review.cafeName}
                date={review.date}
                content={review.content}
                images={review.images}
                onClick={() => handleClick(review.id)}
                onDelete={handleDelete}
              />
            ))}

            {hasNextPage && <div ref={ref} className="h-[1px]" />}

            {isNextLoading && (
              <div className="mt-[2rem] px-[1.5rem]">
                <ReviewListSkeleton />
              </div>
            )}
          </div>
        </>
      )}

      <CommonBottomPopup
        show={showDeleteSuccess}
        titleText="리뷰가 삭제되었습니다"
        onClose={() => setShowDeleteSuccess(false)}
      />
    </div>
  );
};

export default MyReviewPage;
