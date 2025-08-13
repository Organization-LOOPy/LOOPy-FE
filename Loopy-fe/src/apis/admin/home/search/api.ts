import axiosInstance from '../../../axios';
import type { ApiResponse, UserSearchResponseData } from './type';

export const searchUserByPhone = async (
  phone: string,
): Promise<ApiResponse<UserSearchResponseData>> => {
  const response = await axiosInstance.get<ApiResponse<UserSearchResponseData>>(
    '/api/v1/owner/users/search',
    {
      params: { phone },
    },
  );
  return response.data;
};
