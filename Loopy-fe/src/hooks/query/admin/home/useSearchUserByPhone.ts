import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { searchUserByPhone } from '../../../../apis/admin/home/search/api';
import type {
  ApiResponse,
  UserSearchResponseData,
} from '../../../../apis/admin/home/search/type';

export const useSearchUserByPhone = (
  phone: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<UserSearchResponseData>, Error>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<ApiResponse<UserSearchResponseData>, Error>({
    queryKey: ['searchUserByPhone', phone],
    queryFn: () => searchUserByPhone(phone),
    enabled: !!phone,
    ...options,
  });
};
