import axiosInstance from '../axios';
import type { NotificationListResponse } from './type';

export const getMyNotifications =
  async (): Promise<NotificationListResponse> => {
    const response = await axiosInstance.get<NotificationListResponse>(
      '/api/v1/users/me/notification',
    );
    return response.data;
  };
