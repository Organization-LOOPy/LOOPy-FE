export interface NotificationDetailResponse {
  message: string;
  data: NotificationDetail;
}

export interface NotificationDetail {
  notificationId: number;
  title: string;
  type: string;
  createdAt: string;
  cafe: {
    id: number;
    name: string;
  };
  detail: {
    title: string;
    content: string;
  };
  isRead?: boolean;
}
