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

export interface NotificationListResponse {
  message: string;
  data: Notification[];
}
