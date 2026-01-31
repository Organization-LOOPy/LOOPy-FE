import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMyNotifications,
  MY_NOTIFICATIONS_QK,
} from "../../../apis/my/notice/api";
import type { NotificationListItem } from "../../../apis/my/notice/type";

export function useMyPageNotifications() {
  return useQuery<NotificationListItem[]>({
    queryKey: MY_NOTIFICATIONS_QK,
    queryFn: getMyNotifications,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 0,
  });
}

export function useInvalidateMyNotifications() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: MY_NOTIFICATIONS_QK });
}
