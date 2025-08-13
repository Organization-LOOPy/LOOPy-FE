import axiosInstance from "../axios";

export const getMyStamp = async (cafeId: string) => {
    const response = await axiosInstance.get(`/api/v1/cafes/${cafeId}/my-stamp`);
    return response.data;
};