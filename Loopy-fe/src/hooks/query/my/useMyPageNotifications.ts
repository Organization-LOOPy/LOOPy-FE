import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMyNotifications,
  getNotificationDetail,
  MY_NOTIFICATIONS_QK,
  NOTIFICATION_DETAIL_QK,
} from "../../../apis/my/alarm/api";
import type {
  NotificationListItem,
  NotificationDetail,
} from "../../../apis/my/alarm/type";

export function useMyPageNotifications() {
  return useQuery<NotificationListItem[]>({
    queryKey: MY_NOTIFICATIONS_QK,
    queryFn: getMyNotifications,
    staleTime: 60_000, 
    gcTime: 5 * 60_000,
    retry: 0, 
  });
}

export function useOpenNotification(notificationId: number) {
  return useQuery<NotificationDetail>({
    queryKey: NOTIFICATION_DETAIL_QK(notificationId),
    queryFn: () => getNotificationDetail(notificationId),
    enabled: Number.isFinite(notificationId) && notificationId > 0,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 0,
  });
}

export function useInvalidateMyNotifications() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: MY_NOTIFICATIONS_QK });
}