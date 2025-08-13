export interface PastChallenge {
  id: number;
  title: string;
  thumbnailUrl: string;
  startDate: string;
  endDate: string;
  participantCount: number;
  completedCount: number;
}

export interface PastChallengesResponse {
  resultType: string;
  data: PastChallenge[];
}
