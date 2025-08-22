import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../apis/axios';
import type { GetOwnerMenusResponse } from '../../../../apis/admin/menu/type'; // 경로 확인 필요

export function useOwnerMenus(token?: string) {
  return useQuery({
    queryKey: ['ownerMenus', token],
    queryFn: async () => {
      const res = await axiosInstance.get<GetOwnerMenusResponse>(
        '/api/v1/owner/cafes/menus',
        { headers: { Authorization: token ? `Bearer ${token}` : '' } }
      );

      return res.data.data.map((m) => ({
        value: String(m.id),
        label: m.name,
      }));
    },
    enabled: !!token, 
  });
}
