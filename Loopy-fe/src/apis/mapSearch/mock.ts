import type { MapSearchResponse } from './type';

/** 기본 목: 초기 진입(zoom 3) 샘플 */
export const mapSearchMockDefault: MapSearchResponse = {
  resultType: 'SUCCESS',
  error: null,
  success: {
    cafes: [
      { id: 10, name: '스타벅스 강남역점', latitude: 37.497175, longitude: 127.027926, isStamped: true },
      { id: 11, name: '투썸플레이스 강남점', latitude: 37.498234, longitude: 127.029871, isStamped: false },
      { id: 13, name: '카페베네 강남역점', latitude: 37.495876, longitude: 127.025431, isStamped: true },
    ],
    totalCount: 3,
    searchRadius: 320,
    zoomLevel: '3',
    center: { x: 127.027926, y: 37.497175 },
  },
};

/** 필터 예시 목: wifi, zoom 6 */
export const mapSearchMockWifiZoom6: MapSearchResponse = {
  resultType: 'SUCCESS',
  error: null,
  success: {
    cafes: [
      { id: 10, name: '스타벅스 강남역점', latitude: 37.497175, longitude: 127.027926, isStamped: false },
      { id: 11, name: '투썸플레이스 강남점', latitude: 37.498234, longitude: 127.029871, isStamped: false },
      { id: 13, name: '카페베네 강남역점', latitude: 37.495876, longitude: 127.025431, isStamped: false },
      { id: 12, name: '블루보틀 강남점', latitude: 37.499123, longitude: 127.030945, isStamped: false },
      { id: 14, name: "로컬카페 '소소한하루'", latitude: 37.500456, longitude: 127.032187, isStamped: false },
      { id: 1,  name: '로스터리 카페', latitude: 37.5009, longitude: 127.0363, isStamped: false },
    ],
    totalCount: 6,
    searchRadius: 2560,
    zoomLevel: '6',
    center: { x: 127.027926, y: 37.497175 },
  },
};

/** 빈 결과 목 */
export const mapSearchEmpty: MapSearchResponse = {
  resultType: 'SUCCESS',
  error: null,
  success: {
    cafes: [],
    totalCount: 0,
    searchRadius: 2560,
    zoomLevel: '6',
    center: { x: 127.027926, y: 37.497175 },
  },
};

/** 임베딩 폴백: center 주변 Top-15 생성용 유틸 */
export function makeSimilarCafesMock(centerX: number, centerY: number, count = 15): MapSearchResponse {
  // 대략 수 백 m 반경 분포
  const jitterLng = () => (Math.random() - 0.5) * 0.02; // ~±0.01°
  const jitterLat = () => (Math.random() - 0.5) * 0.02;

  const names = [
    '어반커피', '모노라떼', '브루랩', '포그커피', '벨벳빈', '슬로우드립', '더밀크', '그라운드73',
    '호라이즌', '데일리컵', '스테이트커피', '살롱드카페', '라이트핸드', '에스프레소바', '코지브루'
  ];

  const cafes = Array.from({ length: count }).map((_, i) => {
    const latitude = centerY + jitterLat();
    const longitude = centerX + jitterLng();
    return {
      id: 1000 + i,
      name: names[i % names.length],
      latitude,
      longitude,
      isStamped: i % 3 === 0, // 3개 중 1개 도장 보유
    };
  });

  return {
    resultType: 'SUCCESS',
    error: null,
    success: {
      cafes,
      totalCount: cafes.length,
      searchRadius: 1280,
      zoomLevel: '5',
      center: { x: centerX, y: centerY },
    },
  };
}

/** 기본 폴백 샘플(강남역 중심) */
export const mapSearchSimilarTop15 = makeSimilarCafesMock(127.027926, 37.497175, 15);
