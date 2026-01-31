import axiosInstance from "../../axios";
import type { NotificationListItem, ApiSuccess } from "./type";

export const MY_NOTIFICATIONS_QK = ["my", "notifications"] as const;

export async function getMyNotifications(): Promise<NotificationListItem[]> {
  const res =
    await axiosInstance.get<ApiSuccess<NotificationListItem[]>>("/api/v1/users/me/notification/with-cafe-info");

  return res.data.success.data; 
}
