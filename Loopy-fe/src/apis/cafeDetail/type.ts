export type DayKo = '일'|'월'|'화'|'수'|'목'|'금'|'토';
export type BusinessHourType = 'SAME_ALL_DAYS' | 'WEEKDAY_WEEKEND' | 'DIFFERENT_EACH_DAY';

export interface SameAllDaysHours {
  open: string;   // "10:00"
  close: string;  // "20:00"
}

export interface WeekdayWeekendHours {
  weekday: { open: string; close: string };
  weekend: { open: string; close: string };
}

export interface EachDayHour {
  day: DayKo;        
  isClosed: boolean;
  openTime?: string;     // isClosed=false일 때 존재
  closeTime?: string;    // isClosed=false일 때 존재
}

interface CafeBase {
  id: number;
  name: string;
  address: string;

  breakTime?: string | null; // "14:00~15:00"
  phone: string | null;
  websiteUrl: string | null;
  description: string | null;

  // null 가능
  storeFilters: Record<string, boolean> | null;
  takeOutFilters: Record<string, boolean> | null;
  menuFilters: Record<string, boolean> | null;
  keywords: string[] | null;
}

export type Cafe =
  | (CafeBase & {
      businessHourType: 'SAME_ALL_DAYS';
      businessHours: SameAllDaysHours;
    })
  | (CafeBase & {
      businessHourType: 'WEEKDAY_WEEKEND';
      businessHours: WeekdayWeekendHours;
    })
  | (CafeBase & {
      businessHourType: 'DIFFERENT_EACH_DAY';
      businessHours: EachDayHour[];
    });

export interface CafePhoto {
  id: number;
  url: string;
  displayOrder: number;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  imgUrl: string;
  isSoldOut: boolean;
  isRepresentative: boolean;
}

export type CouponDiscountType = 'DISCOUNT' | 'AMOUNT' | 'PERCENTAGE';
export interface Coupon {
  id: number;
  name: string;
  discountType: CouponDiscountType;  
  discountValue: number;
  applicableMenu: MenuItem | null;
  createdAt: string;
  expiredAt: string;
  userCoupons?: Array<{ id: number }>;
  isIssued?: boolean;
}

export interface StampImage {
  id: number;
  imageUrl: string;
}

export interface StampBook {
  id: number;
  stampBookId: number;
  currentCount: number;
  goalCount: number;
  expiresAt: string;
  stampImages?: StampImage[];
}

export interface Bookmark {
  isBookmarked: boolean;
}

export interface CafeChallenge {
  id: number;
  challengeId: number;
  title: string;
  thumbnailUrl: string;
  startDate: string;
  endDate: string;
}

export interface CafeDetailSuccess {
  cafe: Cafe;
  photos: CafePhoto[];
  menu: MenuItem[];
  coupons: Coupon[];
  challenge: CafeChallenge[];
  stampBook: StampBook | null;
  stampPolicyMessage: string | null;  
  bookmark: Bookmark;
}

export interface CafeDetailResponse {
  resultType: 'SUCCESS' | 'FAILURE';
  error: unknown;
  success: CafeDetailSuccess;
}
