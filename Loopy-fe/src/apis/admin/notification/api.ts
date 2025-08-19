import axiosInstance from '../../axios';
import type { SendNotificationRequest, SendNotificationResponse } from './type';

export const sendCafeNotification = async (
  cafeId: number,
  data: SendNotificationRequest,
): Promise<SendNotificationResponse> => {
  const response = await axiosInstance.post<SendNotificationResponse>(
    `/api/v1/owner/cafes/${cafeId}/notification`,
    data,
  );
  return response.data;
};
