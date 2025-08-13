import KakaoLogin from "../../../User/Login/_components/KakaoLogin";

const AdminSocialLogin = () => {
  // const handleKakaoLogin = () => {
  //   const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  //   const redirectBase = import.meta.env.VITE_KAKAO_REDIRECT_URI; 

  //   const kakaoAuthUrl =
  //     `https://kauth.kakao.com/oauth/authorize` +
  //     `?client_id=${clientId}` +
  //     `&redirect_uri=${encodeURIComponent(redirectBase)}` +
  //     `&response_type=code`;

  //   window.location.href = kakaoAuthUrl;
  // };

  return (
    <div className="flex flex-col items-center mt-[3rem]">
      <div className="flex items-center w-full">
        <div className="flex-grow h-px bg-[#A8A8A8] mr-[0.75rem]" />
        <span className="text-[#A8A8A8] font-semibold text-[0.875rem] whitespace-nowrap">
          SNS로 로그인하기
        </span>
        <div className="flex-grow h-px bg-[#A8A8A8] ml-[0.75rem]" />
      </div>

      <div className="my-[1rem] w-full">
        <KakaoLogin />
      </div>
    </div>
  );
};

export default AdminSocialLogin;
