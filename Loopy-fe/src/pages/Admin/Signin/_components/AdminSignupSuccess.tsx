import { useNavigate } from "react-router-dom";
import SuccessIcon from "../../../../assets/images/SuccessIcon.svg?react";
import CommonButton from "../../../../components/button/CommonButton";

const AdminSignupSuccess = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/register");
  };

  return (
    <div className="relative min-h-screen w-full bg-white font-suit flex flex-col items-center justify-center">

      <div className="w-full max-w-[34rem] flex flex-col items-center text-center mt-[3rem]">
        <SuccessIcon className="w-[3.5rem] h-[3.5rem] mb-[2rem]" />

        <h1 className="text-[1.5rem] font-bold text-[#252525] mb-[1rem]">
          가입이 완료되었습니다!
        </h1>
        <p className="text-[1rem] text-[#7F7F7F] font-medium mb-[3.5rem] leading-[120%]">
          루프의 매장 손님이 많아지는 고객센터를 시작해보세요
        </p>

        <div
          className={`absolute left-1/2 translate-x-[-50%] w-full max-w-[34rem] flex flex-col items-center transition-all duration-300 bottom-[2rem]`}
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
