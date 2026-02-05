import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotificationDetail } from '../../../apis/alarm/api';

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => getNotificationDetail(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
