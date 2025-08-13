import { useNavigate } from "react-router-dom";
import KakaoLogin from "./KakaoLogin";

const SocialLoginSection = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectBase = import.meta.env.VITE_KAKAO_REDIRECT_URI; 

    const kakaoAuthUrl =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectBase)}` +
      `&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="flex flex-col items-center mt-[3rem]">
      <div className="flex items-center w-full">
        <div className="flex-grow h-px bg-[#DFDFDF] mr-[0.75rem]" />
        <span className="text-[#DFDFDF] font-semibold text-[0.75rem] whitespace-nowrap">
          SNS로 로그인하기
        </span>
        <div className="flex-grow h-px bg-[#DFDFDF] ml-[0.75rem]" />
      </div>

      <div className="my-[1rem] w-full">
        <KakaoLogin onClick={() => handleKakaoLogin()} />
      </div>

      <div className="flex justify-center items-center text-[0.75rem] gap-[1rem] mb-[1.25rem]">
        <span className="text-[#7F7F7F] font-normal">카페 사장님이시라면?</span>
        <button
          onClick={() => navigate("/admin")}
          className="text-[#252525] font-semibold"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default SocialLoginSection;
