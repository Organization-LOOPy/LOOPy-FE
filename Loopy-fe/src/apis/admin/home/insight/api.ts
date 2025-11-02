import axios from 'axios';
import type { InsightResponse } from './type';

export const getInsight = async (): Promise<InsightResponse> => {
  const url =
    'https://p2xn46stbh2jcuf3geofhvvfbi0rejth.lambda-url.ap-northeast-2.on.aws/insight';

  const response = await axios.get<InsightResponse>(url, {
    params: {
      cafeId: 1,
      period: '2025-08',
    },
    withCredentials: false, // 명시적으로 false
  });

  return response.data;
};
