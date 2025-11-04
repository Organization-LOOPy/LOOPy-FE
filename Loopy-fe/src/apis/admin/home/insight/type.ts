export interface GetInsightRequest {
  cafeId: number;
  period: string;
}

export interface InsightResponse {
  cafeId: number;
  period: string;
  insights_text: string;
  insights_summary: string;
  insights: {
    title: string;
    detail: string;
  }[];
}
