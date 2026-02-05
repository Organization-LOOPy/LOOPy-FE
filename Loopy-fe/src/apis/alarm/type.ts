export interface Notification {
  notificationId: number;
  cafeId: number;
  cafeName: string;
  title: string;
  content: string | Record<string, any>;
  type: 'cafe' | string;
  isRead: boolean;
  createdAt: string;
}

export interface GetMyNotificationsResponse {
  resultType: 'SUCCESS' | 'FAIL';
  error: any | null;
  success?: {
    message: string;
    data: Notification[];
  };
}

export interface NotificationDetailResponse {
  resultType: 'SUCCESS' | 'FAIL';
  error: any | null;
  success?: {
    message: string;
    data: {
      notificationId: number;
      type: string;
      createdAt: string;
      cafe: any | null;
    };
  };
}