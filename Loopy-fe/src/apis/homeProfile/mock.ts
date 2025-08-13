import type { HomeInfoSuccessResponse } from './type';

export const homeInfoMock: HomeInfoSuccessResponse = {
  message: '홈 정보 조회 성공',
  data: {
    nickname: '유진',
    thisMonthStampCount: 10,
    thisMonthChallengeCount: 0,
    totalStampCount: 100,
    totalPoint: 0,
    loopyLevel: {
      level: 1,
      label: '호기심 많은 탐색가',
    },
  },
};
