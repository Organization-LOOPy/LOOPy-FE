import { useQuery } from '@tanstack/react-query';
import { getFirstCafePhoto } from '../../../../apis/admin/home/firstPhoto/api';
import type { FirstCafePhotoResponse } from '../../../../apis/admin/home/firstPhoto/type';

export const QUERY_KEY_FIRST_CAFE_PHOTO = ['firstCafePhoto'];

export const useFirstCafePhoto = () => {
  return useQuery<FirstCafePhotoResponse>({
    queryKey: QUERY_KEY_FIRST_CAFE_PHOTO,
    queryFn: getFirstCafePhoto,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
