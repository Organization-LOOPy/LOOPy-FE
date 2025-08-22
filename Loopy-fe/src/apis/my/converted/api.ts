import axiosInstance from "../../axios";
import type {
  ConvertedStampBookGroup,
  GetConvertedStampbooksResponse,
  GetConvertedStampbooksSuccess,
} from "./type";

export async function getConvertedStampbooks(): Promise<ConvertedStampBookGroup[]> {
  const url = "/api/v1/users/me/stampbooks/converted";

  try {
    const res = await axiosInstance.get<GetConvertedStampbooksResponse>(url);

    if ("status" in res.data && res.data.status === "SUCCESS") {
      const payload = (res.data as GetConvertedStampbooksSuccess).data ?? [];

      return payload.map((group) => ({
        ...group,
        items: [...group.items].sort((a, b) => {
          const dateA = new Date(a.convertedAt ?? a.completedAt ?? "").getTime();
          const dateB = new Date(b.convertedAt ?? b.completedAt ?? "").getTime();
          return dateB - dateA;
        }),
      }));
    }

    throw new Error((res as any)?.data?.reason ?? "UNEXPECTED_RESPONSE");
  } catch (err) {
    console.warn("[getConvertedStampbooks] falling back to mock due to error:", err);
    return [];
  }
}
