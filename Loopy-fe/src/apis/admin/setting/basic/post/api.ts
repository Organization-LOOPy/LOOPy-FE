import axiosInstance from '../../../../axios';
import type {
  PostOwnerCafeBasicInfoRequest,
  PostOwnerCafeBasicInfoResponse,
} from '../type';

export const postOwnerCafeBasicInfo = async (
  payload: PostOwnerCafeBasicInfoRequest
): Promise<PostOwnerCafeBasicInfoResponse> => {
  const { data } = await axiosInstance.post<PostOwnerCafeBasicInfoResponse>(
    '/api/v1/owner/cafes/basic-info',
    payload
  );
  return data; 
};
