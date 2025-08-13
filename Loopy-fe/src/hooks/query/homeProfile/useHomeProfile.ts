import { useQuery } from '@tanstack/react-query';
import { fetchHomeInfo } from '../../../apis/homeProfile/api';
import type {
  HomeInfoData,
  HomeInfoSuccessResponse,
} from '../../../apis/homeProfile/type';

export const useHomeProfile = () => {
  return useQuery<HomeInfoData>({
    queryKey: ['homeInfo'],
    queryFn: async () => {
      const res: HomeInfoSuccessResponse = await fetchHomeInfo();
      if (!res || !res.data) throw new Error('홈 정보가 없습니다.');
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
