import axios from 'axios';
import type { InsightResponse } from './type';

export const getInsight = async (cafeId: number, period?: string): Promise<InsightResponse> => {
  const url =
    'https://znaciei4wl53qg3rv2cqdu3md40ahcgg.lambda-url.ap-northeast-2.on.aws/insight';

  const currentPeriod = period ?? new Date().toISOString().slice(0, 7);

  const response = await axios.get<InsightResponse>(url, {
    params: {
      cafeId,
      period: currentPeriod,
    },
    withCredentials: false, 
  });
  
  console.log('📡 getInsight 호출됨', { cafeId, period: currentPeriod });
  return response.data;
};
