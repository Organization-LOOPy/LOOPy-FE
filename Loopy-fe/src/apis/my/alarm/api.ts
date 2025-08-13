import axiosInstance from "../../axios";
import type { GetNotificationDetailResponse, NotificationDetail } from "./type";
import { getMockNotificationDetail } from "./mock";

export async function getNotificationDetail(notificationId: number): Promise<NotificationDetail> {
  try {
    const { data } =
      await axiosInstance.get<GetNotificationDetailResponse>(`/api/v1/notification/${notificationId}`);
    return { ...data.data, isRead: true };
  } catch {
    return getMockNotificationDetail(notificationId);
  }
}
