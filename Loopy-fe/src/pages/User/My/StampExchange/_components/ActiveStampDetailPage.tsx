import StampPaper from '../../../MyStamp/components/StampPaper';
import StampDetailLayout from '../../../../../layouts/StampDetailLayout';
import type { ExpiringStampBookResponse } from '../../../../../apis/my/expiring/type';

interface Props {
  stampBook: ExpiringStampBookResponse;
  onBack: () => void;
}

const ActiveStampDetailPage = ({ stampBook, onBack }: Props) => {
  const { cafe, expiresAt, rewardDetail, round, currentCount } = stampBook;

  const formatYMD = (iso: string) =>
    new Date(iso)
      .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .replaceAll(' ', '')
      .replace(/\.$/, '');

  return (
    <StampDetailLayout title="내 스탬프지" onBack={onBack}>
      <div className="flex items-center gap-2 mt-6 text-white font-semibold text-lg">
        <span className="font-bold text-[1.25rem]">{cafe.name}</span>
        <span className="text-[#DFDFDF] text-[0.875rem] font-normal">
          ~{formatYMD(expiresAt)}
        </span>
      </div>

      <div className="mt-1 text-[#E3F389] text-[1rem] font-semibold">
        {rewardDetail}
      </div>

      <div className="relative bg-white rounded-t-xl mt-6 pt-6 pb-6 flex-grow -mx-[1.5rem] px-[1.5rem]">
        <div className="text-[1rem] flex gap-[0.5rem] items-center mb-4">
          <span className="font-medium">스탬프지</span>
          <span className="font-semibold text-[#6970F3]">
            {round}장째 진행 중
          </span>
        </div>

        <div className="my-20">
          <StampPaper currentStep={currentCount} />
        </div>
      </div>
    </StampDetailLayout>
  );
};

export default ActiveStampDetailPage;
