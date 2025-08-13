import type { StampBook } from './type';

function calculateDerivedFields(
  currentCount: number,
  goalCount: number,
  expiresAt: string,
) {
  const remainCount = Math.max(0, goalCount - currentCount);
  const progressRatio = currentCount / goalCount;
  const progressPercent = Math.round(progressRatio * 100);

  const now = new Date();
  const expireDate = new Date(expiresAt);
  const diffMs = expireDate.getTime() - now.getTime();
  const daysUntilExpiration = Math.max(
    0,
    Math.ceil(diffMs / (1000 * 60 * 60 * 24)),
  );

  const isExpired = expireDate < now;
  const isExpiringSoon = !isExpired && daysUntilExpiration <= 7;

  return {
    remainCount,
    progressRatio,
    progressPercent,
    isExpired,
    isExpiringSoon,
    daysUntilExpiration,
  };
}

export const stampBookListMock: StampBook[] = [
  {
    id: 1,
    cafe: {
      id: 101,
      name: 'Coffee Factory',
      address: '서울특별시 강남구 테헤란로 123',
      image: 'https://example.com/cafes/coffee_factory.jpg',
    },
    currentCount: 5,
    goalCount: 10,
    status: 'active',
    expiresAt: '2025-12-31T23:59:59.000Z',
    ...calculateDerivedFields(5, 10, '2025-12-31T23:59:59.000Z'),
  },
  {
    id: 2,
    cafe: {
      id: 102,
      name: 'Bean Brothers',
      address: '서울특별시 마포구 월드컵북로 45',
      image: 'https://example.com/cafes/bean_brothers.jpg',
    },
    currentCount: 3,
    goalCount: 10,
    status: 'active',
    expiresAt: '2025-10-15T23:59:59.000Z',
    ...calculateDerivedFields(3, 10, '2025-10-15T23:59:59.000Z'),
  },
  {
    id: 3,
    cafe: {
      id: 103,
      name: 'Cafe Latte',
      address: '서울특별시 종로구 삼일대로 77',
      image: 'https://example.com/cafes/cafe_latte.jpg',
    },
    currentCount: 10,
    goalCount: 10,
    status: 'completed',
    expiresAt: '2025-07-30T23:59:59.000Z',
    ...calculateDerivedFields(10, 10, '2025-07-30T23:59:59.000Z'),
  },
];
