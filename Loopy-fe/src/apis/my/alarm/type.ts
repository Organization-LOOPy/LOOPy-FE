export interface CafeLite {
  id: number;
  name: string;
  address: string;
}

export interface NotificationDetail {
  notificationId: number;
  type: "cafe";
  createdAt: string;
  cafe: CafeLite;
  isRead?: boolean;  
}

export interface GetNotificationDetailResponse {
  message: string;
  data: {
    notificationId: number;
    type: "cafe";
    createdAt: string;
    cafe: CafeLite;
  };
}

export interface ErrorResponse {
  errorCode: string;
  reason: string;
  data: null;
}
