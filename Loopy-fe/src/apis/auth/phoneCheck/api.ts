import axiosInstance from "../../axios";
import type { DummyPhoneResponse } from "./type";

export const getIsDummyPhone = async (): Promise<DummyPhoneResponse> => {
  const { data } = await axiosInstance.get<DummyPhoneResponse>(
    "/api/v1/users/isDummyPhone"
  );
  return data;
};
