import type { AxiosInstance } from "axios";

export const applyInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { status, data } = error.response || {};
      if (status === 500) {
        alert("서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
      return Promise.reject(data);
    }
  );

  return instance;
};
