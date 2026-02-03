import axiosInstance from '../axios';
import type { Notification, NotificationDetailResponse } from './type';

export const getMyNotifications = async (): Promise<Notification[]> => {
  const response = await axiosInstance.get(
    '/api/v1/users/me/notification',
  );

  return response.data?.success?.data ?? [];
};

export const getNotificationDetail = async (notificationId: number) => {
  const res = await axiosInstance.get<NotificationDetailResponse>(
    `/api/v1/notification/${notificationId}`,
  );
  return res.data;
};