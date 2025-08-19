export type NotificationType = 'cafe' | (string & {});
export type NotificationContent = string | Record<string, unknown>;

export interface CafeSummary {
  id: number;
  name: string;
  address: string;
}

export interface NotificationListItem {
  notificationId: number;
  cafeId: number;
  cafeName: string;
  title: string;
  content: NotificationContent;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationDetail {
  notificationId: number;
  type: NotificationType;
  createdAt: string;
  cafe: CafeSummary;
}

export interface MyNotificationListSuccess {
  message: string;
  data: NotificationListItem[];
}

export interface NotificationDetailSuccess {
  message: string;
  data: NotificationDetail;
}

export interface ApiErrorBody {
  errorCode: string;
  reason: string;
  data: null;
}
