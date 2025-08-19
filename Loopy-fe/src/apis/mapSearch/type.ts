export interface MapCafe {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  isStamped: boolean;
  distance?: number;
  bookmarkedBy?: { id: number }[];
  isBookmarked?: boolean;
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
  x: number; // lng
  y: number; // lat
  zoom: number | string;

  store?: string[];  
  menu?: string[];  
  takeout?: string[];
}
