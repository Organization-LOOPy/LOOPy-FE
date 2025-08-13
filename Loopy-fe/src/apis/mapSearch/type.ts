export interface MapCafe {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  isStamped: boolean;
  distance?: number;
}

export interface MapCenter {
  x: number; // longitude
  y: number; // latitude
}

export interface MapSearchSuccess {
  cafes: MapCafe[];
  totalCount: number;
  searchRadius: number;
  zoomLevel: string;
  center: MapCenter;
}

export interface MapSearchResponse {
  resultType: 'SUCCESS' | 'FAIL';
  error: null | unknown;
  success: MapSearchSuccess | null;
}

export interface MapSearchParams {
  /** 항상 전달 (거리순 정렬 기준) */
  x: number; // lng
  y: number; // lat
  zoom: number | string;

  /** 선택 필터: 콤마 직렬화 예정 */
  store?: string[];   // ['wifi','laptop_seat']
  menu?: string[];    // ['vegan','decaf']
  takeout?: string[]; // ['package_discount']

  /** 지역 지정/미지정은 x,y,zoom으로 표현 (지역 미지정=전국 스케일 zoom) */
}
