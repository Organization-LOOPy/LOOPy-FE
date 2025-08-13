import type { NotificationDetail } from '../../../../apis/alarm/type';

export const mockAlarmData: NotificationDetail[] = Array.from(
  { length: 15 },
  (_, i) => ({
    notificationId: i + 1,
    title: '오늘의 챌린지가 시작됐어요!',
    type: 'system',
    createdAt: new Date(Date.now() - i * 24 * 3600 * 1000).toISOString(), // 1일씩 다르게
    cafe: {
      id: 1,
      name: '루피커피',
    },
    detail: {
      title: `시스템 알림 제목 ${i + 1}`,
      content: `시스템 알림 본문\n알림 목데이터 ${i + 1} 입니다`,
    },
  }),
);
