export type NotificationType = "cafe" | (string & {});

export interface NotificationListItem {
  notificationId: number;
  cafeId: number;
  cafeName: string;
  cafeMainImage: string;
  title: string;
  content: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

export interface ApiSuccess<T> {
  resultType: "SUCCESS";
  error: null;
  success: {
    message: string;
    data: T;
  };
}
