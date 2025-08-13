export type Coupon = {
  id: number;
  store: string;
  description: string;
  period: string;
  status: "valid" | "used" | "expired";
};

export const validCoupons: Coupon[] = [
  {
    id: 1,
    store: "커피빈 종로점",
    description: "아이스 아메리카노 500원 할인",
    period: "기한: 07.01 ~ 07.15",
    status: "valid",
  },
  {
    id: 2,
    store: "스타벅스 강남점",
    description: "프라푸치노 1000원 할인",
    period: "기한: 07.03 ~ 07.20",
    status: "valid",
  },
  {
    id: 3,
    store: "이디야 신촌점",
    description: "아메리카노 무료 사이즈업",
    period: "기한: 07.01 ~ 07.18",
    status: "valid",
  },
  {
    id: 4,
    store: "할리스 홍대점",
    description: "디카페인 무료 변경",
    period: "기한: 07.05 ~ 07.25",
    status: "valid",
  },
  {
    id: 5,
    store: "메가커피 건대점",
    description: "카페라떼 300원 할인",
    period: "기한: 07.02 ~ 07.22",
    status: "valid",
  },
  {
    id: 6,
    store: "투썸 신림점",
    description: "에이드류 700원 할인",
    period: "기한: 07.03 ~ 07.19",
    status: "valid",
  },
  {
    id: 7,
    store: "빽다방 여의도점",
    description: "아메리카노 100원 할인",
    period: "기한: 07.01 ~ 07.21",
    status: "valid",
  },
  {
    id: 8,
    store: "엔제리너스 신도림점",
    description: "디저트 500원 할인",
    period: "기한: 07.01 ~ 07.16",
    status: "valid",
  },
  {
    id: 9,
    store: "카페베네 삼성점",
    description: "전 음료 10% 할인",
    period: "기한: 07.04 ~ 07.18",
    status: "valid",
  },
  {
    id: 10,
    store: "커피나무 강동점",
    description: "시그니처 음료 1000원 할인",
    period: "기한: 07.05 ~ 07.25",
    status: "valid",
  },
];

export const pastCoupons: Coupon[] = [
  {
    id: 101,
    store: "스타벅스 광화문점",
    description: "아메리카노 300원 할인",
    period: "기한: 06.01 ~ 06.14",
    status: "used",
  },
  {
    id: 102,
    store: "이디야 노량진점",
    description: "카페모카 400원 할인",
    period: "기한: 06.10 ~ 06.20",
    status: "expired",
  },
  {
    id: 103,
    store: "할리스 사당점",
    description: "시즌 한정 음료 30% 할인",
    period: "기한: 06.05 ~ 06.19",
    status: "used",
  },
  {
    id: 104,
    store: "커피빈 대학로점",
    description: "콜드브루 무료 업그레이드",
    period: "기한: 06.01 ~ 06.15",
    status: "expired",
  },
  {
    id: 105,
    store: "메가커피 압구정점",
    description: "베이커리 1000원 할인",
    period: "기한: 06.11 ~ 06.24",
    status: "used",
  },
];
