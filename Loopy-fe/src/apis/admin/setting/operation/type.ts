export type DayOfWeek =
  | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY"
  | "FRIDAY" | "SATURDAY" | "SUNDAY";

export type BusinessHourType =
  | "SAME_ALL_DAYS"  
  | "WEEKDAY_WEEKEND" 
  | "EACH_DAY_DIFFERENT"; 

export interface BusinessHour {
  day: DayOfWeek;
  isClosed: boolean;
  openTime: string;
  closeTime: string;  
  breakStart?: string | null;
  breakEnd?: string | null;
}

export interface SelectedKeywords {
  storeFilters: string[];
  takeOutFilters: string[];
  menuFilters: string[];
}

export interface OwnerCafeOperationInfo {
  businessHourType: BusinessHourType;
  businessHours: BusinessHour[];
  hasNoHoliday: boolean;
  keywords: string[];
  selectedKeywords: SelectedKeywords;
}
