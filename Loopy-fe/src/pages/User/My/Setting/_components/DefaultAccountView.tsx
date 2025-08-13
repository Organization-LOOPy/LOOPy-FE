import KakaoIcon from "../../../../../assets/images/KakaoLogo.svg?react";

interface Props {
  email?: string;
  allowKakaoAlert?: boolean;
  onClickLogout: () => void;
  onClickWithdraw: () => void;
}

const DefaultAccountView = ({
  email = "",
  allowKakaoAlert = false,
  onClickLogout,
  onClickWithdraw,
}: Props) => {
  const handleKakaoConnect = () => {
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
    <div className="flex flex-col mt-[1.5rem]">
      {allowKakaoAlert ? (
        <div>
          <p className="text-[0.875rem] text-[#7F7F7F] mb-[0.5rem]">
            소셜 계정이 연동되었습니다.
          </p>
          <div className="flex justify-between items-center py-[1.5rem] border-b border-[#DFDFDF]">
            <span className="font-semibold text-[1rem]">Kakao</span>
            <span className="text-[1rem] text-[#7F7F7F]">
              {email || "연동된 이메일 없음"}
            </span>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-[0.875rem] text-[#7F7F7F] mb-[1.5rem] leading-[150%]">
            카카오 연동으로 더 쉽게 로그인을 이용하세요!
            <br />
            카카오로 최초 확인, 일회만 받기 때문에 안전해요.
          </p>
          <button
            onClick={handleKakaoConnect}
            className="w-full h-[3.125rem] bg-[#FAE64D] p-[1rem] rounded-[8px] relative flex items-center justify-center"
          >
            <div className="absolute left-[16px] w-5 h-5">
              <KakaoIcon className="w-full h-full" />
            </div>
            <span className="text-[#252525] text-[1rem] font-semibold">
              카카오 계정 연동하기
            </span>
          </button>
        </div>
      )}

      <div className="mt-[1.5rem] w-full h-[0.8px] border border-[#DFDFDF]" />

      <div className="mt-[2rem]">
        <button
          onClick={onClickLogout}
          className="w-full font-medium text-left text-[1rem] mb-[1.25rem]"
        >
          로그아웃
        </button>
        <button
          onClick={onClickWithdraw}
          className="w-full font-medium text-left text-[1rem] mb-[1.25rem]"
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default DefaultAccountView;
