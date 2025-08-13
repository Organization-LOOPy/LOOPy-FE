import axios from "axios";
import { applyInterceptors } from "./interceptors.ts";

const kakaoInstance = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local",
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
  },
});

applyInterceptors(kakaoInstance);

export default kakaoInstance;
