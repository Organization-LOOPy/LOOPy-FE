import axiosInstance from "../../axios";

export const postReview = async ({
  cafeId,
  formData,
}: {
  cafeId: string;
  formData: FormData;
}) => {
  const response = await axiosInstance.post(
    `/api/v1/cafe/${cafeId}/review`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};
