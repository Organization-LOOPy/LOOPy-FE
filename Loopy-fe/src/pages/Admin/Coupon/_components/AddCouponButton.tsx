interface AddCouponButtonProps {
  onClick?: () => void;
}

const AddCouponButton = ({ onClick }: AddCouponButtonProps) => (
  <button
    onClick={onClick}
    className="bg-[#6970F3] text-white text-[1rem] font-semibold rounded-[8px] px-10 py-3"
  >
    쿠폰 발행하기
  </button>
);

export default AddCouponButton;
