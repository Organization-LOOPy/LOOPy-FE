import axiosInstance from "../../axios";
import type {
  NotificationListItem,
  NotificationDetail,
  ApiSuccess,
} from "./type";

export async function getMyNotifications(): Promise<NotificationListItem[]> {
  const url = `/api/v1/users/me/notification`;

  const res = await axiosInstance.get<ApiSuccess<NotificationListItem[]>>(url);

  const list = res.data.success.data;

  return [...list].sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
  );
}

export async function getNotificationDetail(
  notificationId: number
): Promise<NotificationDetail> {
  const url = `/api/v1/notification/${notificationId}`;

  const res = await axiosInstance.get<ApiSuccess<NotificationDetail>>(url);

  return res.data.success.data;
}

export const MY_NOTIFICATIONS_QK = ["my", "notifications"] as const;

export const NOTIFICATION_DETAIL_QK = (notificationId: number) =>
  ["my", "notification", notificationId] as const;
