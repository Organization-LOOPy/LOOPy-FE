import { useQuery } from '@tanstack/react-query';
import { getNotificationDetail } from '../../../apis/my/alarm/api';
import type { NotificationDetail } from '../../../apis/my/alarm/type';

export function useMyNotification(notificationId: number) {
  return useQuery<NotificationDetail>({
    queryKey: ['my-notification', notificationId],
    queryFn: () => getNotificationDetail(notificationId),
    enabled: Number.isFinite(notificationId),
    staleTime: 0,
  });
}
