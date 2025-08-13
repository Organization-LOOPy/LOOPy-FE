import { useQuery } from '@tanstack/react-query';
import { fetchNotificationDetail } from '../../../apis/alarm/api';

export const useNotification = (notificationId: number) => {
  return useQuery({
    queryKey: ['notificationDetail', notificationId],
    queryFn: () => fetchNotificationDetail(notificationId),
    enabled: !!notificationId,
  });
};
