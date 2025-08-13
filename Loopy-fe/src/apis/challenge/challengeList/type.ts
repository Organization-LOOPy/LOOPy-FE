export interface ChallengeListItem {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  startDate: string;
  endDate: string;
  isParticipated: boolean;
}

export interface ChallengeListResponse {
  resultType: string;
  error: string;
  success: ChallengeListItem[];
}
