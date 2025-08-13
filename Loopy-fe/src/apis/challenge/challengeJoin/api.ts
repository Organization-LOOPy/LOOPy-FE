import axiosInstance from '../../axios';

export const joinChallenge = async (challengeId: number) => {
  const response = await axiosInstance.post(
    `/api/v1/challenges/${challengeId}/join`,
  );
  return response.data;
};
