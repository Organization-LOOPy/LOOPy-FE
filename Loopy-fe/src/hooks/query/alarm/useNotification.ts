import { useQuery } from '@tanstack/react-query';
import { getMyNotifications } from '../../../apis/alarm/api';

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => getMyNotifications(),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
