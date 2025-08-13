import KakaoIcon from '../../../../assets/images/KakaoLogo.svg?react';

interface KakaoLoginProps {
  onClick?: () => void;
}

const KakaoLogin = ({ onClick }: KakaoLoginProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#FAE64D] p-[1rem] rounded-md relative flex items-center justify-center"
    >
      <div className="absolute left-[16px] w-6 h-6">
        <KakaoIcon className="w-full h-full" />
      </div>
      <span className="text-[#252525] text-[0.875rem] font-suit font-semibold rounded-[8px]">
        카카오로 시작하기
      </span>
    </button>
  );
};

export default KakaoLogin;
