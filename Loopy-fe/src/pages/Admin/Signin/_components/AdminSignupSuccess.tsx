import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuccessIcon from "../../../../assets/images/SuccessIcon.svg?react";
import CommonButton from "../../../../components/button/CommonButton";

const AdminSignupSuccess = () => {
  const navigate = useNavigate();

  // 뒤로가기 시 /admin으로 강제 이동
  useEffect(() => {
    const handlePopState = () => {
      navigate("/admin", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const handleClick = () => {
    navigate("/admin", { replace: true });
  };

  return (
    <div className="relative min-h-screen w-full bg-white font-suit flex flex-col items-center justify-center">
      <div className="w-full max-w-[34rem] flex flex-col items-center text-center mt-[3rem]">
        <SuccessIcon className="w-[3.5rem] h-[3.5rem] mb-[2rem]" />

        <h1 className="text-[1.5rem] font-bold text-[#252525] mb-[1rem]">
          가입이 완료되었습니다!
        </h1>

        <p className="text-[1rem] text-[#7F7F7F] font-medium mb-[3.5rem] leading-[120%]">
          루피와 함께 고객이 끊이지 않는 고객관리를 시작하세요
        </p>

        <div
          className="absolute left-1/2 translate-x-[-50%] w-full max-w-[34rem] 
            flex flex-col items-center transition-all duration-300 bottom-[2rem]"
        >
          <CommonButton
            text="시작하기"
            onClick={handleClick}
            autoStyle={false}
            className="w-full bg-[#6970F3] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSignupSuccess;
