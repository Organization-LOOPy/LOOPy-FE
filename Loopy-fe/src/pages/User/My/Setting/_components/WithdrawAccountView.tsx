import { useState } from "react";
import CheckCircle from "../../../Signin/_components/CheckCircle";
import CommonButton from "../../../../../components/button/CommonButton";
import { useKeyboardOpen } from "../../../../../hooks/useKeyboardOpen";
import { usePatchUserInactive } from "../../../../../hooks/mutation/active/useActiveStatus";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../../../../components/header/CommonHeader";

interface Props {
  onBack: () => void;
}

const WithdrawAccountView = ({ onBack }: Props) => {
  const [agree, setAgree] = useState(false);
  const isKeyboardOpen = useKeyboardOpen();
  const navigate = useNavigate();

  const { mutate: patchInactive } = usePatchUserInactive(
    () => {
      navigate("/");
    },
    (err) => {
      console.error("휴면 전환 실패", err);
      alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  );

  const handleWithdraw = () => {
    patchInactive();
  };

  return (
    <div className="relative min-h-screen flex flex-col font-suit bg-white">
      <CommonHeader title="계정 관리" onBack={onBack} />

      <div className="flex-1 overflow-y-auto pt-[1.5rem] pb-[9rem]">
        <h2 className="text-[1.25rem] font-bold leading-[1.5] text-[#323232]">
          회원탈퇴를 신청하기 전에 <br /> 안내사항을 꼭 확인해주세요
        </h2>

        <ul className="mt-[2.5rem] list-inside space-y-4 text-[1rem] text-[#3A3D40] leading-relaxed">
          <li className="font-bold">
            제1조(휴면계정 전환)
            <p className="text-[0.875rem] mt-4">
              회사는 회원의 서비스 미이용 기간이 30일(1개월)을 초과할 경우, 해당 계정을 휴면계정으로 전환할 수 있다.
              휴면계정 전환 시, 회원은 로그인 및 서비스 이용에 일부 제한이 있을 수 있으며, 휴면계정 해제는 별도의 절차에 따라 가능하다.
              SMS 인증 후 휴면계정이 해제된다.
            </p>
          </li>
          <li className="font-bold pt-2">
            제2조(탈퇴 처리 및 데이터 삭제)
            <p className="text-[0.875rem] mt-4">
              회사는 회원의 탈퇴 요청을 접수한 후 지체 없이 개인정보를 파기한다. 다만, 전자상거래법, 세법 등 관련 법령에 따라 일정 기간 거래 정보 및 법적 보관 의무가 있는 정보는 별도로 보관할 수 있다.
            </p>
          </li>
          <li className="font-bold pt-2">
            제3조(탈퇴 후 서비스 이용 제한)
            <p className="text-[0.875rem] mt-4">회원 탈퇴 후에는 다음과 같은 서비스 이용이 제한된다.</p>
            <p className="text-[0.875rem] text-[#8E9398] font-normal mt-4">
              1. 포인트, 쿠폰 등 서비스 내 모든 적립 및 혜택이 소멸된다. <br />
              2. 재가입 시 기존 아이디 및 정보 복구가 불가능하다. <br />
              3. 서비스 내 로그인 및 이용 기능이 완전 차단된다.
            </p>
          </li>
          <li className="font-bold pt-2">
            제4조(탈퇴 시 유의사항 안내)
            <p className="text-[0.875rem] mt-4">회원 탈퇴 전 다음 사항을 충분히 숙지해야 한다.</p>
            <p className="text-[0.875rem] text-[#8E9398] font-normal mt-4">
              1. 탈퇴 후에는 모든 회원 정보가 삭제되어 복구가 불가능하다. <br />
              2. 탈퇴로 인해 발생하는 불이익에 대해 회사는 책임지지 않는다. <br />
              3. 탈퇴 후에도 법령에 따라 보존해야 하는 정보는 관련 기간 동안 보관된다.
            </p>
          </li>
          <li className="font-bold py-2">
            제5조(탈퇴 관련 문의)
            <p className="text-[0.875rem] mt-4 mb-8">
              탈퇴 관련 문의 및 처리는 고객센터(010-2581-9543)를 통해 가능하며, 회사는 신속하고 성실히 응대한다.
            </p>
          </li>
        </ul>
      </div>

      <div
        className={`absolute left-0 right-0 mx-auto max-w-[48rem] transition-all duration-300 ${
          isKeyboardOpen ? "bottom-[4rem]" : "bottom-[2rem]"
        }`}
      >
        <div
          className="flex items-center gap-[0.5rem] ml-[0.125rem] cursor-pointer mb-[1rem]"
          onClick={() => setAgree((prev) => !prev)}
        >
          <CheckCircle checked={agree} />
          <span className="text-[1rem] text-[#3A3D40] font-normal">
            안내 사항을 모두 확인하였으며, 이에 동의합니다.
          </span>
        </div>

        <CommonButton
          text="회원탈퇴하기"
          onClick={handleWithdraw}
          className={`w-full ${
            agree ? "bg-[#6970F3] text-white" : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
          }`}
          disabled={!agree}
        />
      </div>
    </div>
  );
};

export default WithdrawAccountView;
