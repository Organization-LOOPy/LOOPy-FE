// ====== Query ======
export interface CafeListQueryParams {
  /** 기준 좌표 (거리순 정렬 기준) */
  x: number; // lng
  y: number; // lat

  /** 키워드 검색어 (옵션) */
  searchQuery?: string;

  /** 페이지네이션 커서 (옵션) */
  cursor?: number;
}

// ====== Body ======
export interface CafeListBody {
  storeFilter: Record<string, boolean>;
  takeOutFilter: Record<string, boolean>;
  menuFilter: Record<string, boolean>;

  addressInfo?: {
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
  };
}

// ====== Response ======
export interface CafeListPhoto {
  id: number | string;
  photoUrl?: string;
  url?: string;
}

export interface CafeListItem {
  id: number;
  name: string;
  address: string;
  keywords: string[];

  latitude: number;
  longitude: number;

  region1DepthName?: string;
  region2DepthName?: string;
  region3DepthName?: string;

  createdAt?: string;

  photos?: CafeListPhoto[];

  /** 즐겨찾기한 사용자 목록(간단 아이디만 포함) */
  bookmarkedBy?: { id: number }[];

  /** 현재 사용자 기준 즐겨찾기 여부 */
  isBookmarked?: boolean;

  /** 현재 사용자 기준 스탬프 보유 여부 (추가 예정 필드) */
  isStamped?: boolean;

  /** 기준 좌표(x,y)로부터의 거리(미터) */
  distance?: number;
}

export interface CafeListSuccess {
  fromNLP: boolean;
  data: CafeListItem[];
  nextCursor: number | null;
  hasMore: boolean;
}

export interface CafeListResponse {
  resultType: 'SUCCESS' | 'FAIL';
  error: null | unknown;
  success: CafeListSuccess | null;
}
