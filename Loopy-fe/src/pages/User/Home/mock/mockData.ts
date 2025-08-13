export interface StampItem {
  cafeId: string;
  imageUrl: string;
  cafeName: string;
  address: string;
  stampCount: number;
  stampMax: number;
  stampPaper: number;
  dueDate: Date;
}

export interface ProfileCardData {
  username: string;
  level: string;
  imageUrl?: string;
  receivedStamps: number;
  ongoingChallenges: number;
  totalStamps: number;
  points: number;
}

export interface ChallengeCardData {
  challengeName: string;
  challengeImage: string;
}

export const stampList: StampItem[] = [
  {
    cafeId: '1',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    cafeName: '카페 위니',
    address: '서울 서대문구 이화여대길 52',
    stampCount: 5,
    stampMax: 10,
    stampPaper: 1,
    dueDate: new Date(2025, 9, 7),
  },
  {
    cafeId: '2',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    cafeName: '모닝브루',
    address: '서울 용산구 이태원로 55',
    stampCount: 2,
    stampMax: 10,
    stampPaper: 1,
    dueDate: new Date(2025, 10, 15),
  },
  {
    cafeId: '3',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    cafeName: '커피 정원',
    address: '서울 관악구 관악로 75',
    stampCount: 4,
    stampMax: 10,
    stampPaper: 2,
    dueDate: new Date(2025, 6, 20),
  },
  {
    cafeId: '4',
    imageUrl: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571',
    cafeName: '스윗빈',
    address: '서울 송파구 백제고분로 99',
    stampCount: 0,
    stampMax: 10,
    stampPaper: 1,
    dueDate: new Date(2025, 9, 20),
  },
];

export const profileCardData: ProfileCardData = {
  username: '루피25',
  level: '호기심 많은 탐색가',
  imageUrl:
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
  receivedStamps: 5,
  ongoingChallenges: 2,
  totalStamps: 10,
  points: 100,
};

export const challengeCardList: ChallengeCardData[] = [
  {
    challengeName: '지구를 지켜요!\n텀블러 챌린지',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
  },
  {
    challengeName: '지구를 지켜요!\n텀블러 챌린지',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
  },
  {
    challengeName: '지구를 지켜요!\n텀블러 챌린지',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
  },
  {
    challengeName: '지구를 지켜요!\n텀블러 챌린지',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
  },
  {
    challengeName: '지구를 지켜요!\n텀블러 챌린지',
    challengeImage:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
  },
];
