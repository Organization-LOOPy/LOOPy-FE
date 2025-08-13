import axiosInstance from "../../axios";
import { getExpiringStampBooksMock, sortByExpiresAt } from "./mock";
import type {
  ExpiringStampBookItem,
  GetExpiringStampBooksResponse,
  ApiSuccessEnvelope,
  ApiResultEnvelope,
} from "./type";

export async function getExpiringStampBooks(): Promise<ExpiringStampBookItem[]> {
  try {
    const res = await axiosInstance.get<GetExpiringStampBooksResponse>(
      "/api/v1/users/me/stampbooks/expiring"
    );
    const body = res.data;

    let data: ExpiringStampBookItem[] | undefined;

    if ("status" in body && body.status === "SUCCESS") {
      data = (body as ApiSuccessEnvelope).data;
    } else if ("resultType" in body && body.resultType === "SUCCESS") {
      data = (body as ApiResultEnvelope).data;
    }

    if (Array.isArray(data)) {
      return sortByExpiresAt(data);
    }

    throw new Error("UNEXPECTED_RESPONSE_SHAPE");
  } catch (err) {
    console.warn("[getExpiringStampBooks] falling back to mock:", err);
    return sortByExpiresAt(getExpiringStampBooksMock());
  }
}