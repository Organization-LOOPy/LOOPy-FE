import type { Bookmark } from './type';

export const bookmarkListMock: Bookmark[] = [
  {
    id: '1',
    name: '테스트카페',
    address: '서울시 마포구 양화로 123',
    region: '마포구',
    latitude: 37.5509,
    longitude: 126.9143,
    description: '테스트용 샘플 카페입니다.',
    keywords: ['커피', '공부', '아늑한'],
    status: 'active',
    createdAt: '2025-07-19T09:21:39.933Z',
    updatedAt: '2025-07-19T09:20:09.040Z',
  },
  {
    id: '2',
    name: '모의카페',
    address: '서울시 강남구 역삼로 456',
    region: '강남구',
    latitude: 37.4979,
    longitude: 127.0276,
    description: '응답 실패 시 보여줄 대체 카페.',
    keywords: ['브런치', '와이파이'],
    status: 'active',
    createdAt: '2025-06-01T12:00:00.000Z',
    updatedAt: '2025-06-10T08:30:00.000Z',
  },
];
