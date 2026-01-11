
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
  cafeName: string | null;
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

export interface ApiSuccess<T> {
  resultType: "SUCCESS";
  error: null;
  success: {
    message: string;
    data: T;
  };
}

export interface ApiErrorBody {
  errorCode: string;
  reason: string;
  data: null;
}
