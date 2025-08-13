import axiosInstance from "../../../axios";
import type { OwnerCafeOperationInfo } from "./type";

export const MOCK_OWNER_CAFE_OPERATION: OwnerCafeOperationInfo = {
  businessHourType: "WEEKDAY_WEEKEND",
  businessHours: [
    { day: "MONDAY",    isClosed: false, openTime: "09:00", closeTime: "21:00", breakStart: "14:00", breakEnd: "15:00" },
    { day: "TUESDAY",   isClosed: false, openTime: "09:00", closeTime: "21:00", breakStart: "14:00", breakEnd: "15:00" },
    { day: "WEDNESDAY", isClosed: false, openTime: "09:00", closeTime: "21:00", breakStart: "14:00", breakEnd: "15:00" },
    { day: "THURSDAY",  isClosed: false, openTime: "09:00", closeTime: "21:00", breakStart: "14:00", breakEnd: "15:00" },
    { day: "FRIDAY",    isClosed: false, openTime: "09:00", closeTime: "22:00", breakStart: "14:30", breakEnd: "15:00" },
    { day: "SATURDAY",  isClosed: false, openTime: "10:00", closeTime: "22:00", breakStart: null,     breakEnd: null },
    { day: "SUNDAY",    isClosed: true,  openTime: "00:00", closeTime: "00:00", breakStart: null,     breakEnd: null },
  ],
  hasNoHoliday: false,
  keywords: ["루프탑", "감성카페"],
  selectedKeywords: {
    storeFilters: ["노트북", "콘센트 많음"],
    takeOutFilters: ["텀블러 할인"],
    menuFilters: ["디카페인", "저당 시럽"],
  },
};

export async function getOwnerMyCafeOperation(): Promise<OwnerCafeOperationInfo> {
  const url = "/api/v1/owner/cafes/myCafe/operation";
  try {
    const { data } = await axiosInstance.get<OwnerCafeOperationInfo>(url);
    return data;
  } catch (err) {
    console.log("운영 정보 조회 실패. 목데이터로 대체합니다.", err);
    return MOCK_OWNER_CAFE_OPERATION;
  }
}
