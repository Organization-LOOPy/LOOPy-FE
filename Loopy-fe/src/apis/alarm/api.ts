import axiosInstance from '../axios';
import type { NotificationDetailResponse } from './type';

export const fetchNotificationDetail = async (
  notificationId: number,
): Promise<NotificationDetailResponse> => {
  const response = await axiosInstance.get<NotificationDetailResponse>(
    `/api/v1/notification/${notificationId}`,
  );
  return response.data;
};
