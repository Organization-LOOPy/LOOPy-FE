import axiosInstance from "../../axios";
import type {
  ConvertedStampBookItem,
  GetConvertedStampbooksResponse,
  GetConvertedStampbooksSuccess,
} from "./type";
import { getConvertedStampbooksMock } from "./mock";

export async function getConvertedStampbooks(): Promise<ConvertedStampBookItem[]> {
  const url = "/api/v1/users/me/stampbooks/converted"; 

  try {
    const res = await axiosInstance.get<GetConvertedStampbooksResponse>(url);

    if ("status" in res.data && res.data.status === "SUCCESS") {
      const payload = (res.data as GetConvertedStampbooksSuccess).data ?? [];
      return [...payload].sort(
        (a, b) => new Date(b.convertedAt).getTime() - new Date(a.convertedAt).getTime()
      );
    }

    throw new Error((res as any)?.data?.reason ?? "UNEXPECTED_RESPONSE");
  } catch (err) {
    console.warn("[getConvertedStampbooks] falling back to mock due to error:", err);
    return getConvertedStampbooksMock();
  }
}
