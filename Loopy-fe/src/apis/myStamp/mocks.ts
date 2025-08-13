import type { ExpiringStampBookResponse } from "./type";

export const expiringStampBookMock: ExpiringStampBookResponse[] = [
  {
    id: 1,
    cafe: {
      id: 101,
      name: "카페 위니",
      address: "서울 서대문구 이화여대길 52",
    },
    expiresAt: "2025-08-15T00:00:00Z",
    status: "ACTIVE",
  },
  {
    id: 2,
    cafe: {
      id: 102,
      name: "루프탑 카페 블룸",
      address: "서울 마포구 월드컵북로 10길 13",
    },
    expiresAt: "2025-07-30T00:00:00Z",
    status: "INACTIVE",
  },
  {
    id: 3,
    cafe: {
      id: 103,
      name: "빈브라더스 합정점",
      address: "서울 마포구 양화로 45",
    },
    expiresAt: "2025-09-01T00:00:00Z",
    status: "ACTIVE",
  },
  {
    id: 4,
    cafe: {
      id: 104,
      name: "테라로사 강릉점",
      address: "강원 강릉시 창해로14번길 20",
    },
    expiresAt: "2025-08-01T00:00:00Z",
    status: "INACTIVE",
  },
  {
    id: 5,
    cafe: {
      id: 105,
      name: "커피리브레 신촌점",
      address: "서울 서대문구 연세로 5다길 24",
    },
    expiresAt: "2025-07-28T00:00:00Z",
    status: "INACTIVE",
  },
  {
    id: 6,
    cafe: {
      id: 106,
      name: "슬로우포스트",
      address: "서울 마포구 연남로 35",
    },
    expiresAt: "2025-10-01T00:00:00Z",
    status: "ACTIVE",
  },
  {
    id: 7,
    cafe: {
      id: 107,
      name: "카페온리",
      address: "서울 강남구 도산대로 8길 16",
    },
    expiresAt: "2025-09-10T00:00:00Z",
    status: "ACTIVE",
  },
  {
    id: 8,
    cafe: {
      id: 108,
      name: "스페셜티 바나나",
      address: "부산 해운대구 좌동로 12",
    },
    expiresAt: "2025-08-05T00:00:00Z",
    status: "ACTIVE",
  },
  {
    id: 9,
    cafe: {
      id: 109,
      name: "커피몽타주",
      address: "서울 성동구 연무장길 33",
    },
    expiresAt: "2025-08-20T00:00:00Z",
    status: "ACTIVE",
  },
  {
    id: 10,
    cafe: {
      id: 110,
      name: "하루일과",
      address: "대전 유성구 대학로 121",
    },
    expiresAt: "2025-09-05T00:00:00Z",
    status: "INACTIVE",
  },
];
