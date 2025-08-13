import type { ChallengeDetailResponse } from './type';

export const mockChallengeDetailResponses: ChallengeDetailResponse[] = [
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 1,
      title: '7월 북카페 탐방\n챌린지',
      description: '서울 시내 인기 북카페를 방문하고 인증샷을 올려보세요!',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-07-01',
      endDate: '2025-07-31',
      goalDescription: '북카페 3곳 이상 방문 인증샷 업로드',
      goalCount: 3,
      rewardPoint: 500,
      isParticipated: true,
      availableCafes: [
        {
          id: 101,
          name: '책방카페 숨',
          address: '서울특별시 마포구 동교로 23길 17',
          image:
            'https://images.unsplash.com/photo-1586075010923-34013f7290b4?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울',
          region2DepthName: '마포구',
          region3DepthName: '서교동',
        },
        {
          id: 102,
          name: '카페 페이지원',
          address: '서울특별시 종로구 삼청로 122',
          image:
            'https://images.unsplash.com/photo-1562003389-f8e7a5e8a3f0?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울',
          region2DepthName: '종로구',
          region3DepthName: '삼청동',
        },
        {
          id: 103,
          name: '북카페 온',
          address: '서울특별시 성동구 성수일로 89',
          image:
            'https://images.unsplash.com/photo-1536520002442-39764a41e2be?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울',
          region2DepthName: '성동구',
          region3DepthName: '성수동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 2,
      title: '비건 카페 도전\n챌린지',
      description: '비건 디저트를 판매하는 카페를 방문하고 후기를 공유해요.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-08-01',
      endDate: '2025-08-31',
      goalDescription: '비건 메뉴를 제공하는 카페에서 인증샷과 후기를 남기기',
      goalCount: 2,
      rewardPoint: 700,
      isParticipated: false,
      availableCafes: [
        {
          id: 201,
          name: '비건브런치그라운드',
          address: '서울 강남구 논현로 123',
          image:
            'https://images.unsplash.com/photo-1606788075761-0e564f1e3af6?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '강남구',
          region3DepthName: '논현동',
        },
        {
          id: 202,
          name: '그린비건카페',
          address: '서울 성동구 성수일로 45',
          image:
            'https://images.unsplash.com/photo-1612197526851-5d35a6f2dba9?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '성동구',
          region3DepthName: '성수동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 3,
      title: '카공족 인증\n챌린지',
      description: '공부하기 좋은 카페에서 하루 1시간 이상 공부하고 인증!',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-07-10',
      endDate: '2025-08-10',
      goalDescription:
        '스터디 가능한 조용한 카페에서 공부 인증샷 5회 이상 업로드',
      goalCount: 5,
      rewardPoint: 800,
      isParticipated: true,
      availableCafes: [
        {
          id: 301,
          name: '카페 스터디존',
          address: '서울 마포구 월드컵북로 19길 38',
          image:
            'https://images.unsplash.com/photo-1570783832040-4665f6b4c1b4?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '마포구',
          region3DepthName: '상암동',
        },
        {
          id: 302,
          name: '북스앤카페',
          address: '서울 서대문구 연희로 23',
          image:
            'https://images.unsplash.com/photo-1598256989800-39d3e1e6c810?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '서대문구',
          region3DepthName: '연희동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 4,
      title: '테라스 카페 감성\n챌린지',
      description:
        '테라스나 야외 좌석이 있는 카페를 다녀오고 감상 후기 남기기!',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-07-15',
      endDate: '2025-08-15',
      goalDescription: '테라스 또는 야외 좌석에서 인증샷 2회 이상 업로드',
      goalCount: 2,
      rewardPoint: 600,
      isParticipated: false,
      availableCafes: [
        {
          id: 401,
          name: '테라스 커피',
          address: '서울 용산구 이태원로 123',
          image:
            'https://images.unsplash.com/photo-1611414907831-69a661b96c1f?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '용산구',
          region3DepthName: '이태원동',
        },
        {
          id: 402,
          name: '루프탑카페 블루문',
          address: '서울 중구 퇴계로 89',
          image:
            'https://images.unsplash.com/photo-1627368547283-5d1160dc62f2?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '중구',
          region3DepthName: '필동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 5,
      title: '소문난 디저트 맛집 탐험 챌린지',
      description: 'SNS에서 핫한 디저트 카페에 가보고 별점 남기기!',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-07-20',
      endDate: '2025-08-20',
      goalDescription: '디저트 맛집 3곳 이상 방문 인증 및 별점 남기기',
      goalCount: 3,
      rewardPoint: 700,
      isParticipated: false,
      availableCafes: [
        {
          id: 501,
          name: '초코가게',
          address: '서울 서초구 강남대로 321',
          image:
            'https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '서초구',
          region3DepthName: '서초동',
        },
        {
          id: 502,
          name: '망고디저트하우스',
          address: '서울 동대문구 왕산로 24',
          image:
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '동대문구',
          region3DepthName: '신설동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 6,
      title: '카페 독서 모임\n챌린지',
      description: '책 한 권을 골라서 카페에서 독서하는 모습을 인증해보세요!',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-08-01',
      endDate: '2025-08-31',
      goalDescription: '카페에서 책 읽는 모습 인증샷 4회 이상 업로드',
      goalCount: 4,
      rewardPoint: 500,
      isParticipated: true,
      availableCafes: [
        {
          id: 601,
          name: '조용한카페 북앤커피',
          address: '서울 노원구 상계로 56',
          image:
            'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '노원구',
          region3DepthName: '상계동',
        },
        {
          id: 602,
          name: '리딩카페 휴',
          address: '서울 양천구 목동로 77',
          image:
            'https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '양천구',
          region3DepthName: '목동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 7,
      title: '친환경 텀블러 사용 챌린지',
      description: '카페 이용 시 텀블러를 사용하고 실천 인증샷 올리기!',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-07-25',
      endDate: '2025-08-25',
      goalDescription: '텀블러 사용 인증샷 3회 이상 업로드',
      goalCount: 3,
      rewardPoint: 500,
      isParticipated: false,
      availableCafes: [
        {
          id: 701,
          name: '지구를지켜카페',
          address: '서울 강서구 화곡로 123',
          image:
            'https://images.unsplash.com/photo-1562440499-64c9b4bc8a94?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '강서구',
          region3DepthName: '화곡동',
        },
        {
          id: 702,
          name: '제로카페 선인장',
          address: '서울 동대문구 왕산로 22',
          image:
            'https://images.unsplash.com/photo-1563899951197-2e864a153230?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '동대문구',
          region3DepthName: '장안동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 8,
      title: '이색 커피 레시피 도전 챌린지',
      description: '나만의 커피 레시피를 만들어 보고 친구들과 공유해요.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-07-05',
      endDate: '2025-07-30',
      goalDescription: '이색 커피 레시피 공유 2회 이상',
      goalCount: 2,
      rewardPoint: 600,
      isParticipated: true,
      availableCafes: [
        {
          id: 801,
          name: '홈카페 실험실',
          address: '서울 종로구 자하문로 88',
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '종로구',
          region3DepthName: '평창동',
        },
        {
          id: 802,
          name: '크리에이티브커피랩',
          address: '서울 중구 명동9가길 27',
          image:
            'https://images.unsplash.com/photo-1600035480548-6d174c632a1b?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '중구',
          region3DepthName: '명동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 9,
      title: '새로운 원두 탐험 챌린지',
      description: '다양한 원두를 시도해보고 취향을 찾아보세요!',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-07-12',
      endDate: '2025-08-12',
      goalDescription: '서로 다른 원두를 사용한 커피 4종 이상 시음',
      goalCount: 4,
      rewardPoint: 700,
      isParticipated: false,
      availableCafes: [
        {
          id: 901,
          name: '로스터리 탐방소',
          address: '서울 은평구 연서로 81',
          image:
            'https://images.unsplash.com/photo-1585296867304-01937a7aae5d?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '은평구',
          region3DepthName: '불광동',
        },
        {
          id: 902,
          name: '빈즈백 커피랩',
          address: '서울 송파구 백제고분로 99',
          image:
            'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '송파구',
          region3DepthName: '잠실동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 10,
      title: '커피와 디저트 페어링 챌린지',
      description: '커피와 어울리는 디저트를 찾아보고 리뷰 작성하기.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-07-18',
      endDate: '2025-08-18',
      goalDescription: '커피와 디저트 조합 리뷰 3건 이상 작성',
      goalCount: 3,
      rewardPoint: 650,
      isParticipated: true,
      availableCafes: [
        {
          id: 1001,
          name: '스윗빈 카페',
          address: '서울 강남구 도산대로 45길 11',
          image:
            'https://images.unsplash.com/photo-1515442261605-cd4c5f2ebf94?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '강남구',
          region3DepthName: '신사동',
        },
        {
          id: 1002,
          name: '케이크룸 앤 커피',
          address: '서울 마포구 망원로 20',
          image:
            'https://images.unsplash.com/photo-1589736663355-89416b8b5d01?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '마포구',
          region3DepthName: '망원동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 11,
      title: '핸드드립 마스터 챌린지',
      description: '핸드드립 커피를 연습하고 인증사진 공유하기!',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-08-01',
      endDate: '2025-08-31',
      goalDescription: '핸드드립 커피 인증샷 3회 이상 업로드',
      goalCount: 3,
      rewardPoint: 600,
      isParticipated: false,
      availableCafes: [
        {
          id: 1101,
          name: '핸드드립 카페 진주',
          address: '서울 용산구 이태원로 45',
          image:
            'https://images.unsplash.com/photo-1510626176961-4b5322925e9e?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '용산구',
          region3DepthName: '이태원동',
        },
        {
          id: 1102,
          name: '드립커피 공방',
          address: '서울 마포구 월드컵북로 12',
          image:
            'https://images.unsplash.com/photo-1520697222865-4e25b5a5b9ab?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '마포구',
          region3DepthName: '성산동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 12,
      title: '주말 브런치 카페 탐방 챌린지',
      description: '주말마다 새로운 브런치 카페 방문하고 후기 남기기.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-07-10',
      endDate: '2025-08-10',
      goalDescription: '주말 브런치 카페 4곳 이상 방문 및 후기 작성',
      goalCount: 4,
      rewardPoint: 700,
      isParticipated: true,
      availableCafes: [
        {
          id: 1201,
          name: '브런치 카페 루프',
          address: '서울 송파구 백제고분로 37',
          image:
            'https://images.unsplash.com/photo-1505253210343-fd9bf0a4f30f?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '송파구',
          region3DepthName: '방이동',
        },
        {
          id: 1202,
          name: '카페 더 모닝',
          address: '서울 강남구 도산대로 99',
          image:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '강남구',
          region3DepthName: '청담동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 13,
      title: '커피 관련 도서 읽기 챌린지',
      description: '커피와 관련된 책을 읽고 독후감 작성하기.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-07-15',
      endDate: '2025-08-15',
      goalDescription: '커피 관련 도서 2권 이상 읽고 독후감 작성',
      goalCount: 2,
      rewardPoint: 500,
      isParticipated: false,
      availableCafes: [
        {
          id: 1301,
          name: '북카페 커피빈',
          address: '서울 종로구 율곡로 6',
          image:
            'https://images.unsplash.com/photo-1496317556649-f930d733eea2?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '종로구',
          region3DepthName: '청운동',
        },
        {
          id: 1302,
          name: '커피와책방',
          address: '서울 마포구 동교로 48',
          image:
            'https://images.unsplash.com/photo-1486308510493-cb9163c9320f?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '마포구',
          region3DepthName: '서교동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 14,
      title: '지역 카페 투어 챌린지',
      description: '자신의 지역 내 카페 여러 곳 방문 인증샷 찍기!',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-07-20',
      endDate: '2025-08-20',
      goalDescription: '지역 내 카페 5곳 이상 방문 인증',
      goalCount: 5,
      rewardPoint: 650,
      isParticipated: true,
      availableCafes: [
        {
          id: 1401,
          name: '우리동네카페',
          address: '서울 은평구 연서로 100',
          image:
            'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '은평구',
          region3DepthName: '진관동',
        },
        {
          id: 1402,
          name: '동네커피하우스',
          address: '서울 서대문구 연희로 45',
          image:
            'https://images.unsplash.com/photo-1510626176961-4b5322925e9e?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '서대문구',
          region3DepthName: '연희동',
        },
      ],
    },
  },
  {
    resultType: 'mock',
    error: '',
    success: {
      id: 15,
      title: '친구와 함께하는 카페 데이트 챌린지',
      description: '친구와 함께 카페에서 즐거운 시간 보내고 사진 올리기.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=400&q=80',
      startDate: '2025-07-25',
      endDate: '2025-08-25',
      goalDescription: '친구와 함께 카페 방문 및 사진 업로드 3회 이상',
      goalCount: 3,
      rewardPoint: 550,
      isParticipated: false,
      availableCafes: [
        {
          id: 1501,
          name: '카페 데이트',
          address: '서울 강서구 공항대로 88',
          image:
            'https://images.unsplash.com/photo-1536520002442-39764a41e2be?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '강서구',
          region3DepthName: '마곡동',
        },
        {
          id: 1502,
          name: '프렌즈 카페',
          address: '서울 강남구 학동로 55',
          image:
            'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=400&q=80',
          region1DepthName: '서울특별시',
          region2DepthName: '강남구',
          region3DepthName: '논현동',
        },
      ],
    },
  },
];
