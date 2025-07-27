import CommonButton from "../../../../../components/button/CommonButton";

const ReviewBottomButton = ({ isValid }: { isValid: boolean }) => {
  return (
    <div className="absolute bottom-[2rem] left-0 w-full px-[1.5rem] transition-all duration-150">
      <CommonButton
        text="수정 완료하기"
        className={`w-full ${
          isValid
            ? "bg-[#6970F3]"
            : "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
        }`}
        disabled={!isValid}
      />
    </div>
  );
};

export default ReviewBottomButton;
