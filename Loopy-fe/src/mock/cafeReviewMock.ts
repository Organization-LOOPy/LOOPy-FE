import type { ReviewPage } from "../apis/review/get/type";

export const cafeReviewMock: ReviewPage = {
    reviews: [
       {
            "id": 1,
            "title": "로스터리 커피 맛집!",
            "content": "원두를 직접 로스팅해서 향이 정말 좋아요. 전문가가 추천하는 원두도 살 수 있어서 좋습니다.",
            "nickname": "커피러버",
            "createdAt": "2025-07-19T10:30:00.000Z",
            "images": [
                "https://example.com/review1-1.jpg",
                "https://example.com/review1-2.jpg"
            ]
        },
        {
            "id": 2,
            "title": "조용한 작업 공간",
            "content": "노트북 작업하기 좋고 와이파이도 빨라요. 티라미수도 맛있어요!",
            "nickname": "디저트매니아",
            "createdAt": "2025-07-18T15:45:00.000Z",
            "images": [
                "https://example.com/review2-1.jpg"
            ]
        },
        {
            "id": 5,
            "title": "케냐 원두 추천",
            "content": "케냐 AA 핸드드립이 정말 맛있어요. 산미가 적당하고 후맛이 깔끔합니다.",
            "nickname": "원두전문가",
            "createdAt": "2025-07-15T11:00:00.000Z",
            "images": [
                "https://example.com/review5-1.jpg"
            ]
        },
        {
            "id": 9,
            "title": "드디어 찾은 진짜 맛집",
            "content": "시그니처 아메리카노의 깊은 맛에 완전히 반했어요. 매일 와서 마시고 싶은 커피입니다.",
            "nickname": "단골손님",
            "createdAt": "2025-07-11T08:30:00.000Z",
            "images": [
                "https://example.com/new-review1-1.jpg",
                "https://example.com/new-review1-2.jpg"
            ]
        }
    ],
    nextCursor: null,
    hasNextPage: false,
};