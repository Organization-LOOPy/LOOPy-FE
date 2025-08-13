import type { ReviewItem } from "../apis/review/get/type";

export const formatReview = (review: ReviewItem) => ({
    id: review.id,
    user: {
        profileImage: '/default-profile.jpg',
        nickname: review.nickname,
        stampStatus: '',
    },
    date: new Date(review.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }),
    content: review.content,
    images: review.images,
});
