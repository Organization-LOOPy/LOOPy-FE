export interface AvailableCafe {
  id: number;
  name: string;
  address: string;
  image: string;
  region1DepthName: string;
  region2DepthName: string;
  region3DepthName: string;
}

export interface JoinedCafe {
  id: number;
  name: string;
}

export interface ChallengeDetail {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  startDate: string;
  endDate: string;
  goalDescription: string;
  goalCount: number;
  rewardPoint: number;
  isParticipated: boolean;
  joinedCafe?: JoinedCafe;
  joinedCount?: number;
  availableCafes: AvailableCafe[];
}

export interface ChallengeDetailResponse {
  resultType: string;
  error: string | null;
  success: ChallengeDetail;
}
