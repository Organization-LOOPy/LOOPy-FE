import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../apis/axios';
import type { GetOwnerMenusResponse } from '../../../../apis/admin/menu/type';

export function useOwnerMenus(token?: string) {
  return useQuery({
    queryKey: ['ownerMenus', token],
    queryFn: async () => {
      const res = await axiosInstance.get<GetOwnerMenusResponse>(
        '/api/v1/owner/cafes/myCafe/menus',
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );

      return res.data.data as { id: number; name: string }[];
    },
    enabled: !!token,
  });
}
