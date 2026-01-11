export interface GetInsightRequest {
  cafeId: number;
  period: string;
}

export interface InsightResponse {
  cafeId: number;
  period: string;
  insight: {
    insights_summary: string;
    insights_text: string;
  };
}
