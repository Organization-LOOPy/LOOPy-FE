import axiosInstance from '../../axios';

export const fetchChallengeCafes = async (challengeId: number) => {
  const res = await axiosInstance.get('/api/v1/challenge/cafes', {
    params: { challengeId },
  });
  return res.data;
};
