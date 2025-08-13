export interface ChallengeCardData {
  challengeId: number;
  challengeMonth?: number;
  challengeName: string;
  challengeStartDate: string;
  challengeDoneDate: string;
  challengeImage: string;
  participating: boolean;
  challengeDescription: string;
  challengeDetail: string;
  challengeReward: string;
  storeList?: Store[];
}

export interface Store {
  name: string;
  address: string;
  imageUrl: string;
  distance: number;
}

export const challengeCardList: ChallengeCardData[] = [
  {
    challengeId: 1,
    challengeMonth: 7,
    challengeName: '친구와 함께하는 카공 챌린지',
    challengeStartDate: '2025.07.01',
    challengeDoneDate: '2025.07.31',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
    participating: true,
    challengeDescription: '친구와 함께 같은 날 카페에서\n3회 공부 인증하기',
    challengeDetail:
      '혼자보다 함께일 때, 루피는 더 오래 이어지고 집중도 더 길어져요.\n친구와 함께하는 카페 공부(카공) 시간, 이제 루피 챌린지로 기록해보세요.\n마음 맞는 친구와 함께 카페에 앉아 공부하고, 스탬프도 함께 쌓다 보면 어느새 나만의 루틴이 완성될 거예요.',
    challengeReward: '+ 300p',
    storeList: [
      {
        name: '카페 위니',
        address: '서울 서대문구 이화여대길 52',
        imageUrl:
          'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
        distance: 500,
      },
    ],
  },
  {
    challengeId: 2,
    challengeMonth: 0,
    challengeName: '친구와 함께하는 카공 챌린지',
    challengeStartDate: '2025.07.01',
    challengeDoneDate: '2025.07.31',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
    participating: true,
    challengeDescription: '친구와 함께 같은 날 카페에서\n3회 공부 인증하기',
    challengeDetail:
      '혼자보다 함께일 때, 루피는 더 오래 이어지고 집중도 더 길어져요.\n친구와 함께하는 카페 공부(카공) 시간, 이제 루피 챌린지로 기록해보세요.\n마음 맞는 친구와 함께 카페에 앉아 공부하고, 스탬프도 함께 쌓다 보면 어느새 나만의 루틴이 완성될 거예요.',
    challengeReward: '+ 300p',
    storeList: [
      {
        name: '카페 위니',
        address: '서울 서대문구 이화여대길 52',
        imageUrl:
          'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
        distance: 500,
      },
    ],
  },
  {
    challengeId: 3,
    challengeMonth: 7,
    challengeName: '친구와 함께하는 카공 챌린지',
    challengeStartDate: '2025.07.01',
    challengeDoneDate: '2025.07.31',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
    participating: false,
    challengeDescription: '친구와 함께 같은 날 카페에서\n3회 공부 인증하기',
    challengeDetail:
      '혼자보다 함께일 때, 루피는 더 오래 이어지고 집중도 더 길어져요.\n친구와 함께하는 카페 공부(카공) 시간, 이제 루피 챌린지로 기록해보세요.\n마음 맞는 친구와 함께 카페에 앉아 공부하고, 스탬프도 함께 쌓다 보면 어느새 나만의 루틴이 완성될 거예요.',
    challengeReward: '+ 300p',
    storeList: [
      {
        name: '카페 위니',
        address: '서울 서대문구 이화여대길 52',
        imageUrl:
          'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
        distance: 500,
      },
      {
        name: '카페 위니',
        address: '서울 서대문구 이화여대길 52',
        imageUrl:
          'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
        distance: 500,
      },
      {
        name: '카페 위니',
        address: '서울 서대문구 이화여대길 52',
        imageUrl:
          'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
        distance: 500,
      },
    ],
  },
  {
    challengeId: 4,
    challengeMonth: 0,
    challengeName: '친구와 함께하는 카공 챌린지',
    challengeStartDate: '2025.07.01',
    challengeDoneDate: '2025.07.31',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
    participating: true,
    challengeDescription: '친구와 함께 같은 날 카페에서\n3회 공부 인증하기',
    challengeDetail:
      '혼자보다 함께일 때, 루피는 더 오래 이어지고 집중도 더 길어져요.\n친구와 함께하는 카페 공부(카공) 시간, 이제 루피 챌린지로 기록해보세요.\n마음 맞는 친구와 함께 카페에 앉아 공부하고, 스탬프도 함께 쌓다 보면 어느새 나만의 루틴이 완성될 거예요.',
    challengeReward: '+ 300p',
    storeList: [
      {
        name: '카페 위니',
        address: '서울 서대문구 이화여대길 52',
        imageUrl:
          'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
        distance: 500,
      },
    ],
  },
  {
    challengeId: 5,
    challengeMonth: 7,
    challengeName: '친구와 함께하는 카공 챌린지',
    challengeStartDate: '2025.07.01',
    challengeDoneDate: '2025.07.31',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
    participating: false,
    challengeDescription: '친구와 함께 같은 날 카페에서\n3회 공부 인증하기',
    challengeDetail:
      '혼자보다 함께일 때, 루피는 더 오래 이어지고 집중도 더 길어져요.\n친구와 함께하는 카페 공부(카공) 시간, 이제 루피 챌린지로 기록해보세요.\n마음 맞는 친구와 함께 카페에 앉아 공부하고, 스탬프도 함께 쌓다 보면 어느새 나만의 루틴이 완성될 거예요.',
    challengeReward: '+ 300p',
    storeList: [
      {
        name: '카페 위니',
        address: '서울 서대문구 이화여대길 52',
        imageUrl:
          'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
        distance: 500,
      },
    ],
  },
  {
    challengeId: 6,
    challengeMonth: 7,
    challengeName: '친구와 함께하는 카공 챌린지',
    challengeStartDate: '2025.07.01',
    challengeDoneDate: '2025.07.31',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
    participating: false,
    challengeDescription: '친구와 함께 같은 날 카페에서\n3회 공부 인증하기',
    challengeDetail:
      '혼자보다 함께일 때, 루피는 더 오래 이어지고 집중도 더 길어져요.\n친구와 함께하는 카페 공부(카공) 시간, 이제 루피 챌린지로 기록해보세요.\n마음 맞는 친구와 함께 카페에 앉아 공부하고, 스탬프도 함께 쌓다 보면 어느새 나만의 루틴이 완성될 거예요.',
    challengeReward: '+ 300p',
    storeList: [
      {
        name: '카페 위니',
        address: '서울 서대문구 이화여대길 52',
        imageUrl:
          'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
        distance: 500,
      },
    ],
  },
  {
    challengeId: 7,
    challengeMonth: 7,
    challengeName: '친구와 함께하는 카공 챌린지',
    challengeStartDate: '2025.07.01',
    challengeDoneDate: '2025.07.31',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
    participating: false,
    challengeDescription: '친구와 함께 같은 날 카페에서\n3회 공부 인증하기',
    challengeDetail:
      '혼자보다 함께일 때, 루피는 더 오래 이어지고 집중도 더 길어져요.\n친구와 함께하는 카페 공부(카공) 시간, 이제 루피 챌린지로 기록해보세요.\n마음 맞는 친구와 함께 카페에 앉아 공부하고, 스탬프도 함께 쌓다 보면 어느새 나만의 루틴이 완성될 거예요.',
    challengeReward: '+ 300p',
    storeList: [
      {
        name: '카페 위니',
        address: '서울 서대문구 이화여대길 52',
        imageUrl:
          'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
        distance: 500,
      },
    ],
  },
  {
    challengeId: 8,
    challengeMonth: 7,
    challengeName: '친구와 함께하는 카공 챌린지',
    challengeStartDate: '2025.07.01',
    challengeDoneDate: '2025.07.31',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
    participating: false,
    challengeDescription: '친구와 함께 같은 날 카페에서\n3회 공부 인증하기',
    challengeDetail:
      '혼자보다 함께일 때, 루피는 더 오래 이어지고 집중도 더 길어져요.\n친구와 함께하는 카페 공부(카공) 시간, 이제 루피 챌린지로 기록해보세요.\n마음 맞는 친구와 함께 카페에 앉아 공부하고, 스탬프도 함께 쌓다 보면 어느새 나만의 루틴이 완성될 거예요.',
    challengeReward: '+ 300p',
    storeList: [
      {
        name: '카페 위니',
        address: '서울 서대문구 이화여대길 52',
        imageUrl:
          'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
        distance: 500,
      },
    ],
  },
  {
    challengeId: 9,
    challengeMonth: 7,
    challengeName: '혼자만의 집중 카공 챌린지',
    challengeStartDate: '2025.07.01',
    challengeDoneDate: '2025.07.31',
    challengeImage:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80',
    participating: true,
    challengeDescription: '혼자 카페에서 하루 1시간 공부 인증하기',
    challengeDetail:
      '혼자만의 시간을 통해 몰입과 집중력을 키워보세요.\n루피와 함께라면 혼공도 외롭지 않아요!',
    challengeReward: '+ 200p',
    storeList: [
      {
        name: '카페 솔트',
        address: '서울 마포구 연남동 227-15',
        imageUrl:
          'https://images.unsplash.com/photo-1556742049-908a9d7b92a0?auto=format&fit=crop&w=400&q=80',
        distance: 300,
      },
    ],
  },
  {
    challengeId: 10,
    challengeMonth: 8,
    challengeName: '모닝 루틴 챌린지',
    challengeStartDate: '2025.08.01',
    challengeDoneDate: '2025.08.31',
    challengeImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    participating: true,
    challengeDescription: '오전 9시 전 카페에서 공부 인증 5회',
    challengeDetail:
      '부지런한 아침의 시작, 카페에서 하루를 활기차게 열어보세요.\n일찍 일어나는 새가 스탬프도 얻어요!',
    challengeReward: '+ 500p',
    storeList: [
      {
        name: '카페 브리즈',
        address: '서울 성동구 서울숲길 22',
        imageUrl:
          'https://images.unsplash.com/photo-1492724441997-5dc865305da4?auto=format&fit=crop&w=400&q=80',
        distance: 200,
      },
    ],
  },
  {
    challengeId: 11,
    challengeMonth: 8,
    challengeName: '비 오는 날 챌린지',
    challengeStartDate: '2025.08.01',
    challengeDoneDate: '2025.08.31',
    challengeImage:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
    participating: true,
    challengeDescription: '비 오는 날 카페에서 공부 인증 2회',
    challengeDetail:
      '촉촉한 빗소리와 함께 카페에서의 집중력은 배가 됩니다.\n감성도 공부도 함께 채워보세요.',
    challengeReward: '+ 350p',
    storeList: [
      {
        name: '카페 무드',
        address: '서울 종로구 삼청로 125',
        imageUrl:
          'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=400&q=80',
        distance: 600,
      },
    ],
  },
  {
    challengeId: 12,
    challengeMonth: 9,
    challengeName: '저녁 집중 챌린지',
    challengeStartDate: '2025.09.01',
    challengeDoneDate: '2025.09.30',
    challengeImage:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80',
    participating: true,
    challengeDescription: '오후 7시 이후 공부 인증 4회',
    challengeDetail:
      '조용한 밤, 집중의 시간.\n밤이 깊어질수록 몰입도도 깊어져요. 루피와 함께하는 야간 공부 습관!',
    challengeReward: '+ 400p',
    storeList: [
      {
        name: '카페 루미에르',
        address: '서울 강남구 논현로 645',
        imageUrl:
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
        distance: 800,
      },
    ],
  },
  {
    challengeId: 13,
    challengeMonth: 7,
    challengeName: '주말 루틴 챌린지',
    challengeStartDate: '2025.07.01',
    challengeDoneDate: '2025.07.31',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
    participating: false,
    challengeDescription: '토/일 중 3회 이상 카페 공부 인증하기',
    challengeDetail:
      '주말에도 루틴을 지키는 당신, 멋져요!\n꾸준함이 진짜 실력이에요.',
    challengeReward: '+ 300p',
    storeList: [
      {
        name: '카페 어반리프',
        address: '서울 마포구 성미산로 161',
        imageUrl:
          'https://images.unsplash.com/photo-1588854337221-c4d4e0c3d345?auto=format&fit=crop&w=400&q=80',
        distance: 450,
      },
    ],
  },
  {
    challengeId: 14,
    challengeMonth: 9,
    challengeName: '새로운 카페 탐방 챌린지',
    challengeStartDate: '2025.09.01',
    challengeDoneDate: '2025.09.30',
    challengeImage:
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80',
    participating: true,
    challengeDescription: '서로 다른 카페 3곳에서 공부 인증하기',
    challengeDetail:
      '매번 같은 장소는 지겹지 않나요?\n새로운 공간에서 새로운 자극으로 집중력을 업!',
    challengeReward: '+ 600p',
    storeList: [
      {
        name: '카페 A',
        address: '서울 용산구 이태원로 120',
        imageUrl:
          'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80',
        distance: 700,
      },
      {
        name: '카페 B',
        address: '서울 강서구 공항대로 213',
        imageUrl:
          'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80',
        distance: 1300,
      },
      {
        name: '카페 C',
        address: '서울 송파구 백제고분로 41',
        imageUrl:
          'https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=400&q=80',
        distance: 1200,
      },
    ],
  },
];
