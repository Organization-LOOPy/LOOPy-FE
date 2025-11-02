import { useQuery } from '@tanstack/react-query';
import { getOwnerMyCafeInfo } from '../../../../apis/admin/setting/basic/api';
import type { OwnerMyCafeInfoResponse } from '../../../../apis/admin/setting/basic/type';

export const OWNER_MY_CAFE_INFO_KEY = 'ownerMyCafeInfo';

export const useOwnerMyCafeInfo = () => {
  return useQuery<OwnerMyCafeInfoResponse>({
    queryKey: [OWNER_MY_CAFE_INFO_KEY],
    queryFn: getOwnerMyCafeInfo,
  });
};