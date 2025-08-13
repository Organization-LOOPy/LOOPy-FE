export interface ChallengeDetail {
  id: number;
  title: string;
  thumbnailUrl: string;
  description: string;
  goalDescription: string;
  startDate: string;
  endDate: string;
  rewardDetail: string;
  participantCount: number;
  completedCount: number;
}

export interface ChallengeDetailResponse {
  resultType: string;
  data: ChallengeDetail;
}
