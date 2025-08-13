export interface PatchOwnerCafeBasicInfoRequest {
  name: string;
  ownerName: string;
  address: string;
  region1DepthName: string;
  region2DepthName: string;
  region3DepthName: string;
  latitude?: number;
  longitude?: number;
  phone: string;
  websiteUrl?: string;
  description?: string;
}

export type DayOfWeek =
  | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY"
  | "FRIDAY" | "SATURDAY" | "SUNDAY";

export interface BusinessHour {
  day: DayOfWeek;
  isClosed: boolean;
  openTime?: string | null;
  closeTime?: string | null;
  breakStart?: string | null;
  breakEnd?: string | null;
}

export type BusinessHourType =
  | "SAME_ALL_DAYS"    
  | "WEEKDAY_WEEKEND" 
  | "EACH_DAY_DIFFERENT";

export interface OwnerCafeDetailResponse {
  id: number;
  name: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  ownerName: string;
  businessHours: BusinessHour[] | null; 
  phone: string;
  websiteUrl?: string | null;
  description?: string | null;
  storeFilters?: string | null;
  takeOutFilters?: string | null;
  menuFilters?: string | null;
  keywords?: string | null;
  status: "active" | "inactive" | string;
  createdAt: string; 
  updatedAt: string;
  ownerId: number;
  region1DepthName: string;
  region2DepthName: string;
  region3DepthName: string;
  businessHourType: BusinessHourType; 
  breakTime?: string | null;
}
