export interface ChallengeStatistics {
  participatedChallengeCount: number;
  totalParticipantCount: number;
  completedUserCount: number;
  challengeRelatedSalesCount: number;
}

export interface ChallengeStatisticsResponse {
  resultType: string;
  data: ChallengeStatistics;
}
