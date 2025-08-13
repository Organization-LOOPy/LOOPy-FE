// type.ts

export type BookmarkStatus = 'active' | 'inactive' | string;

export interface Bookmark {
  id: string;
  name: string;
  address: string;
  region: string;
  latitude: number;
  longitude: number;
  description: string | null;
  keywords: string[] | null;
  status: BookmarkStatus;
  createdAt: string; // ISO 8601
  updatedAt: string;
}

export interface SuccessPayload {
  message: string;
  bookmarks: Bookmark[];
}

export interface ApiSuccessWrapper {
  resultType: 'SUCCESS' | string;
  error: null;
  success: SuccessPayload;
}

export interface ApiErrorWrapper {
  resultType: 'FAILURE' | string;
  error: {
    code?: string;
    message?: string;
    [key: string]: any;
  } | null;
  success: null;
}

export type BookmarkListResponse = ApiSuccessWrapper | ApiErrorWrapper;
