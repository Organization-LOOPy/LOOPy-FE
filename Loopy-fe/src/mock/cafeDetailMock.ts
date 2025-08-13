import type { CafeDetailSuccess } from "../apis/cafeDetail/type";

export const cafeDetailMock: CafeDetailSuccess = {
  cafe: {
    id: 1,
    name: "로스터리 카페",
    address: "서울시 강남구 테헤란로 123",
    businessHourType: "WEEKDAY_WEEKEND",
    businessHours: {
      weekday: { open: "07:00", close: "22:00" },
      weekend: { open: "08:00", close: "23:00" },
    },
    breakTime: null,
    phone: "02-1234-5678",
    websiteUrl: "https://roastery-cafe.com",
    description: "신선한 원두를 직접 로스팅하는 스페셜티 커피 전문점입니다.",
    keywords: ["커피", "로스팅", "스페셜티", "조용한"],
    storeFilters: {
      "1인석": true,
      "단체석": false,
      "노트북석": true,
      "애견 동반": false,
      "예약 가능": false,
      "주차 가능": true,
      "24시간 운영": false,
      "와이파이 제공": true,
    },
    takeOutFilters: { "포장 할인": false, "텀블러 할인": true },
    menuFilters: { "비건": false, "디카페인": true, "글루텐프리": true, "저당/무가당": true },
  },
  photos: [
    {
      id: 1,
      url: "https://example.com/photos/roastery-exterior.jpg",
      displayOrder: 1,
    },
    {
      id: 2,
      url: "https://example.com/photos/roastery-interior.jpg",
      displayOrder: 2,
    },
    {
      id: 3,
      url: "https://example.com/photos/roastery-counter.jpg",
      displayOrder: 3,
    },
    {
      id: 4,
      url: "https://example.com/photos/roastery-beans.jpg",
      displayOrder: 4,
    },
    {
      id: 5,
      url: "https://example.com/photos/roastery-seating.jpg",
      displayOrder: 5,
    },
  ],
  menu: [
      {
        id: 1,
        name: "아메리카노",
        price: 4500,
        description: "진한 에스프레소와 뜨거운 물을 더한 커피",
        imgUrl: "https://image.starbucks.co.kr/upload/store/skuimg/2021/04/menu1.jpg",
        isSoldOut: false,
        isRepresentative: true
      },
      {
        id: 2,
        name: "카페라떼",
        price: 5000,
        description: "부드러운 우유와 에스프레소의 조화",
        imgUrl: "https://image.starbucks.co.kr/upload/store/skuimg/2021/04/menu2.jpg",
        isSoldOut: false,
        isRepresentative: true
      },
      {
        id: 4,
        name: "바닐라 스콘",
        price: 3500,
        description: "촉촉하고 달콤한 바닐라 스콘",
        imgUrl: "https://image.starbucks.co.kr/upload/store/skuimg/2021/04/menu4.jpg",
        isSoldOut: true,
        isRepresentative: false
      },
      {
        id: 5,
        name: "초콜릿 머핀",
        price: 4000,
        description: "진한 초콜릿이 들어간 머핀",
        imgUrl: "https://image.starbucks.co.kr/upload/store/skuimg/2021/04/menu5.jpg",
        isSoldOut: false,
        isRepresentative: false
      },
      {
        id: 3,
        name: "카푸치노",
        price: 5000,
        description: "진한 에스프레소에 부드러운 우유거품",
        imgUrl: "https://image.starbucks.co.kr/upload/store/skuimg/2021/04/menu3.jpg",
        isSoldOut: false,
        isRepresentative: false
      }
  ],
  coupons: [
    {
      id: 1,
      name: "시그니처 아메리카노 무료",
      discountType: "AMOUNT",
      discountValue: 4500,
      applicableMenu: {
        id: 1,
        name: "아메리카노",
        price: 4500,
        description: "진한 에스프레소와 뜨거운 물을 더한 커피",
        imgUrl: "https://image.starbucks.co.kr/upload/store/skuimg/2021/04/menu1.jpg",
        isSoldOut: false,
        isRepresentative: true
      },
      createdAt: "2025-07-01T10:00:00.000Z",
      expiredAt: "2025-12-31T23:59:59.000Z",
    },
    {
      id: 2,
      name: "전 메뉴 15% 할인",
      discountType: "PERCENTAGE",
      discountValue: 15,
      applicableMenu: null,
      createdAt: "2025-07-15T12:00:00.000Z",
      expiredAt: "2025-11-30T23:59:59.000Z",
    },
  ],
  stampBook: {
    id: 1,
    stampBookId: 1,
    currentCount: 3,
    goalCount: 10,
    expiresAt: "2025-12-31T23:59:59.000Z",
  },
  bookmark: {
    isBookmarked: false,
  },
  
  challenge: [],
  stampPolicyMessage: null,
};
