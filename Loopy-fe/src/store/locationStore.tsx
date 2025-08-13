import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from 'react';
import type { KakaoPlace } from '../types/location';
import { generateRegionKey, normalizeRegion } from '../utils/region';

const STORAGE_KEY = 'loopy:selectedLocation:v1';
const STORAGE_FLAG = 'loopy:shouldApplyOnMap:v1';

export interface SelectedLocation {
  region: string;    
  regionKey: string; 
  lat: number;
  lng: number;
  updatedAt: number;
  addressInfo?: {                            
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
  };
}

interface LocationCtx {
  selected: SelectedLocation | null;
  shouldApplyOnMap: boolean; // 리스트에서 위치 설정 후 지도에서 1회만 적용
  applyFromPlace: (place: KakaoPlace) => void;
  reset: () => void;               // 위치 초기화 (→ "위치를 설정해주세요")
  markAppliedOnMap: () => void;    // 지도에서 반영 완료 처리
}

const LocationContext = createContext<LocationCtx | null>(null);

function readAddressStr(place: any): string {
  if (typeof place === 'string') return place;
  return (place && place.address_name) ? String(place.address_name) : '';
}

/** ✅ 표시용 지역 문자열 얻기: depth가 있으면 조합, 없으면 normalizeRegion(문자열) */
function getRegionText(place: any): string {
  // 1) 이미 depth가 들어온 경우(우리가 toKakaoLikePlace에서 넣어줌)
  const p = place as any;
  if (p?.region_1depth_name && p?.region_2depth_name && p?.region_3depth_name) {
    return `${p.region_1depth_name} ${p.region_2depth_name} ${p.region_3depth_name}`;
  }

  // 2) 문자열 주소로만 normalizeRegion 호출
  const addr = readAddressStr(place);
  if (!addr) return '';

  try {
    const n: any = normalizeRegion(addr); // ← 문자열만 전달
    if (typeof n === 'string') return n;
    if (n && typeof n === 'object' && typeof n.region === 'string') return n.region;
  } catch {
    // normalizeRegion 내부 파싱 실패 시 원본 주소 사용
  }
  return addr;
}

function extractAddressInfo(place: any): SelectedLocation['addressInfo'] | undefined {
  // 1) 이미 depth가 들어온 경우 그대로 사용
  const p = place as any;
  if (p?.region_1depth_name && p?.region_2depth_name && p?.region_3depth_name) {
    return {
      region_1depth_name: String(p.region_1depth_name),
      region_2depth_name: String(p.region_2depth_name),
      region_3depth_name: String(p.region_3depth_name),
    };
  }

  // 2) 문자열 주소 기반으로 normalizeRegion 호출
  const addr = readAddressStr(place);
  if (!addr) return undefined;

  try {
    const n: any = normalizeRegion(addr); // ← 문자열만 전달
    const r1 = n?.region_1depth_name ?? n?.region1DepthName;
    const r2 = n?.region_2depth_name ?? n?.region2DepthName;
    const r3 = n?.region_3depth_name ?? n?.region3DepthName;
    if (r1 && r2 && r3) {
      return {
        region_1depth_name: String(r1),
        region_2depth_name: String(r2),
        region_3depth_name: String(r3),
      };
    }
  } catch {
    /* ignore */
  }
  return undefined;
}

/** Kakao 결과에서 위경도 얻기 (x=lng, y=lat) */
function getLatLng(place: KakaoPlace): { lat: number; lng: number } {
  if ('lat' in (place as any) && 'lng' in (place as any)) {
    const p = place as any;
    return { lat: Number(p.lat), lng: Number(p.lng) };
  }
  const p = place as any; // Kakao 원형: x=lng, y=lat (문자열)
  return {
    lat: typeof p.y === 'string' ? parseFloat(p.y) : Number(p.y),
    lng: typeof p.x === 'string' ? parseFloat(p.x) : Number(p.x),
  };
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<SelectedLocation | null>(null);
  const [shouldApplyOnMap, setShouldApplyOnMap] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // 최소 필드 검증
        if (parsed && typeof parsed.lat === 'number' && typeof parsed.lng === 'number') {
          setSelected(parsed);
        }
      }
      const flag = localStorage.getItem(STORAGE_FLAG);
      if (flag === '1') setShouldApplyOnMap(true);
    } catch {}
  }, []);

  const value = useMemo<LocationCtx>(() => ({
    selected,
    shouldApplyOnMap,
    applyFromPlace: (place) => {
      const regionKey = generateRegionKey(place);
      const region = getRegionText(place);
      const addressInfo = extractAddressInfo(place);
      const { lat, lng } = getLatLng(place);

      const next: SelectedLocation = {
        region,
        regionKey,
        lat,
        lng,
        updatedAt: Date.now(),
        ...(addressInfo ? { addressInfo } : {}),
      };
      setSelected(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        localStorage.setItem(STORAGE_FLAG, '1');
      } catch {}
      setShouldApplyOnMap(true);
    },
    reset: () => {
      setSelected(null);
      setShouldApplyOnMap(false);
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_FLAG);
      } catch {}
    },
    markAppliedOnMap: () => {
      setShouldApplyOnMap(false);
      try { localStorage.removeItem(STORAGE_FLAG); } catch {}
    },
  }), [selected, shouldApplyOnMap]);

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export const useSelectedLocationStore = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useSelectedLocationStore must be used within LocationProvider');
  return ctx;
};
