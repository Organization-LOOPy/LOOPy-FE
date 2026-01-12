import axiosInstance from '../../axios';

export const joinChallenge = async (challengeId: number, cafeId: number) => {
  const response = await axiosInstance.post(
    `/api/v1/owner/cafe/${cafeId}/challenges/${challengeId}/join`,
    { joinedCafeId: cafeId },
  );
  return response.data;
};
