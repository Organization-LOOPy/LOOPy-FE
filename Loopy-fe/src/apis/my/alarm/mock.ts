import type { NotificationDetail } from "./type";

const now = new Date();
const iso = (d: Date) => d.toISOString();

export const MOCK_NOTIFICATIONS: NotificationDetail[] = [
  {
    notificationId: 1,
    type: "cafe",
    createdAt: iso(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)), // 1일 전
    isRead: false,
    cafe: { id: 101, name: "루피커피 성북점", address: "서울 성북구 성북로 123" },
  },
  {
    notificationId: 2,
    type: "cafe",
    createdAt: iso(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)),
    isRead: false,
    cafe: { id: 102, name: "루피커피 숭실대점", address: "서울 동작구 상도로 369" },
  },
  {
    notificationId: 3,
    type: "cafe",
    createdAt: iso(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)),
    isRead: true,
    cafe: { id: 103, name: "루피커피 강남점", address: "서울 강남구 테헤란로 100" },
  },
  {
    notificationId: 4,
    type: "cafe",
    createdAt: iso(new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)),
    isRead: false,
    cafe: { id: 104, name: "루피커피 여의도점", address: "서울 영등포구 국제금융로 50" },
  },
  {
    notificationId: 5,
    type: "cafe",
    createdAt: iso(new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000)),
    isRead: true,
    cafe: { id: 105, name: "루피커피 종로점", address: "서울 종로구 종로 1" },
  },
  {
    notificationId: 6,
    type: "cafe",
    createdAt: iso(new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000)), // 8일 전
    isRead: true,
    cafe: { id: 106, name: "루피커피 신촌점", address: "서울 서대문구 연세로 50" },
  },
  {
    notificationId: 7,
    type: "cafe",
    createdAt: iso(new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)),
    isRead: true,
    cafe: { id: 107, name: "루피커피 홍대점", address: "서울 마포구 와우산로 20" },
  },
  {
    notificationId: 8,
    type: "cafe",
    createdAt: iso(new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000)),
    isRead: false,
    cafe: { id: 108, name: "루피커피 잠실점", address: "서울 송파구 올림픽로 300" },
  },
  {
    notificationId: 9,
    type: "cafe",
    createdAt: iso(new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000)),
    isRead: true,
    cafe: { id: 109, name: "루피커피 목동점", address: "서울 양천구 오목로 200" },
  },
  {
    notificationId: 10,
    type: "cafe",
    createdAt: iso(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)),
    isRead: false,
    cafe: { id: 110, name: "루피커피 노원점", address: "서울 노원구 상계로 100" },
  },
];

export function getMockNotificationDetail(id: number): NotificationDetail {
  const hit = MOCK_NOTIFICATIONS.find((n) => n.notificationId === id);
  if (hit) return { ...hit, isRead: true };

  return {
    notificationId: 999, 
    type: "cafe",
    createdAt: iso(now),
    isRead: true,
    cafe: { id: 101, name: "루피커피 성북점", address: "서울 성북구 성북로 123" },
  };
}
