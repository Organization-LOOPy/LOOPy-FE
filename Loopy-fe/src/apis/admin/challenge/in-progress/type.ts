export interface ChallengeItem {
  id: number;
  title: string;
  thumbnailUrl: string;
  startDate: string;
  endDate: string;
  participantCount: number;
  completedCount: number;
}

export interface InProgressChallengesResponse {
  resultType: 'SUCCESS' | 'FAIL';
  data: ChallengeItem[];
}
