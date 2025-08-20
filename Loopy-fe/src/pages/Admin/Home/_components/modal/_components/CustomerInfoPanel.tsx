import StampPaper from '../../../../../User/MyStamp/components/StampPaper';
import type { Customer } from '../KeypadModal';

type CustomerInfoPanelProps = {
  status: 'idle' | 'loading' | 'success' | 'notfound' | 'error';
  customer: Customer | null;
  onApply: () => void;
};

const CustomerInfoPanel = ({
  status,
  customer,
  onApply,
}: CustomerInfoPanelProps) => {
  return (
    <div
      className={`w-[23.188rem] p-6 flex flex-col ${
        status === 'success' ? 'bg-[#EEF0FF]' : 'bg-[#F3F3F3]'
      }`}
    >
      <div className="text-[1rem] text-[#7F7F7F] font-semibold mb-6 leading-none">
        고객 정보
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        <div className="min-h-full flex flex-col items-center justify-center text-center">
          {status === 'idle' && (
            <div className="text-[#A8A8A8]">
              고객의 전화번호를 입력해
              <br />
              고객 정보를 조회해주세요
            </div>
          )}

          {status === 'loading' && (
            <div className="text-[#555] animate-pulse">
              고객 정보를 불러오는 중...
            </div>
          )}

          {status === 'notfound' && (
            <div className="text-[#D04747]">
              해당 번호의 고객 정보가 없습니다.
              <br />
              번호를 확인하거나 새로 입력해주세요.
            </div>
          )}

          {status === 'error' && (
            <div className="text-[#D04747]">
              조회 중 오류가 발생했습니다.
              <br />
              다시 시도해주세요.
            </div>
          )}

          {status === 'success' && customer && (
            <>
              <div className="flex w-full justify-between">
                <div className="flex gap-4 justify-center items-center">
                  <div className="text-[1.5rem] font-bold leading-none">
                    {customer.name.length > 4
                      ? customer.name.slice(0, 4) + '...'
                      : customer.name}
                  </div>
                  <div className="text-[0.875rem] text-[#7F7F7F] font-semibold leading-none">
                    스탬프지 {customer.stampBook}장 째
                  </div>
                </div>
                <button
                  onClick={onApply}
                  className="w-[6rem] h-[2.125rem] text-[0.875rem] font-semibold rounded-md bg-[#6970F3] text-white"
                  aria-label="스탬프 적립"
                >
                  스탬프 적립
                </button>
              </div>
              <div className="flex mt-4 mb-8">
                <div className="flex gap-4 w-[10.094rem] h-[3.125rem] py-[1rem] items-center justify-center border-y border-r border-[#A8A8A8]">
                  <div className="text-[0.875rem] font-semibold leading-none">
                    스탬프
                  </div>
                  <div className="text-[1.125rem] text-[#6970F3] font-bold leading-none ">
                    {customer.stamps}개
                  </div>
                </div>
                <div className="flex gap-4 w-[10.094rem] h-[3.125rem] py-[1rem] items-center justify-center border-y border-[#A8A8A8]">
                  <div className="text-[0.875rem] font-semibold leading-none">
                    포인트
                  </div>
                  <div className="text-[1.125rem] text-[#6970F3] font-bold leading-none ">
                    {customer.points}p
                  </div>
                </div>
              </div>
              <StampPaper currentStep={customer.stamps % 10} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoPanel;
