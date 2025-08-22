export interface GetInsightRequest {
  cafeId: number;
  period: string;
}

export interface InsightResponse {
  ok: boolean;
  cafeId: number;
  period: string;
  report: {
    insights_text: string;
    insights_summary: string;
    insights: {
      title: string;
      detail: string;
    }[];
  };
}
