import axiosInstance from "../../../../axios";
import type { GetOwnerMenusResponse, OwnerMenuSummary } from "./type";

export const MOCK_OWNER_MENU_SUMMARIES: OwnerMenuSummary[] = [
  {
    id: 999,
    name: "디카페인 아메리카노",
    price: 2000,
    photoUrl: "https://picsum.photos/seed/mock-menu-999/640/640",
    isRepresentative: false,
    description: "언제나 디카페인 아메리카노, 행복한 감자입니다!",
  },
];

export async function getOwnerMyCafeMenus(): Promise<OwnerMenuSummary[]> {
  const url = "/api/v1/owner/cafes/myCafe/menus";
  try {
    const res = await axiosInstance.get<GetOwnerMenusResponse>(url);
    const body = res.data;
    return body?.data ?? [];
  } catch (err) {
    console.error("내 카페 메뉴 요약 조회 목데이터 반환:", err);
    return MOCK_OWNER_MENU_SUMMARIES;
  }
}
