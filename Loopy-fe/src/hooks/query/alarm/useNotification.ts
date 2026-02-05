import { useQuery } from '@tanstack/react-query';
import { getMyNotifications } from '../../../apis/alarm/api';
import type { Notification } from '../../../apis/alarm/type';

export const useNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: getMyNotifications,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};