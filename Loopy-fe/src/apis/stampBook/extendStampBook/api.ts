import axiosInstance from '../../axios';

export const extendStampBook = async (
  stampBookId: number,
): Promise<{
  message: string;
  newExpiresAt: string;
}> => {
  const response = await axiosInstance.patch(
    `/api/v1/stampbooks/${stampBookId}/extend`,
  );
  return response.data;
};
