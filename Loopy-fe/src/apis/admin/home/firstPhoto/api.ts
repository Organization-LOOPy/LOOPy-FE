import axiosInstance from '../../../axios';
import type { FirstCafePhotoResponse } from './type';

export const getFirstCafePhoto = async (): Promise<FirstCafePhotoResponse> => {
  const response = await axiosInstance.get<FirstCafePhotoResponse>(
    '/api/v1/owner/cafes/photos/first',
  );
  return response.data;
};
