import CommonHeader from '../../../components/header/CommonHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Info from '../../../assets/images/Info.svg?react';
import CommonBottomPopup from '../../../components/popup/CommonBottomPopup';
import StampPaper from './components/StampPaper';
import { GetRemainingDays } from './components/GetRemainingDays';
import MyStampSkeleton from './Skeleton/MyStampSkeleton';
import { useStampBookDetail } from '../../../hooks/query/stampBook/useStampBookDetail';
import { useExtendStampBook } from '../../../hooks/query/stampBook/useExtendStampBook';

const MyStampPage = () => {
  const { stampBookId } = useParams<{ stampBookId: string }>();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupStep, setPopupStep] = useState<1 | 2>(1);
  const [newExpiresAt, setNewExpiresAt] = useState<string | null>(null);

  const id = stampBookId ? Number(stampBookId) : undefined;
  const { data: stampData, isLoading } = useStampBookDetail(id!);
  const { mutate: extendMutation } = useExtendStampBook();

  if (isLoading) return <MyStampSkeleton />;
  if (!stampData) return <div>해당 카페 스탬프 정보를 찾을 수 없습니다.</div>;

  const dueDate = new Date(stampData.expiresAt);
  const diffDays = GetRemainingDays(dueDate);

  const handlePurpleButtonClick = () => {
    if (!id) return;

    extendMutation(id, {
      onSuccess: (data) => {
        setNewExpiresAt(data.newExpiresAt);
        setPopupStep(2);
        setIsPopupOpen(true);
      },
      onError: () => {
        console.error('스탬프지 연장 실패');
      },
    });
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupStep(1);
  };

  const popupContents = {
    1: {
      titleText: '스탬프지 기한을 연장할까요?',
      contentsText: `연장하면 지금까지 모은 스탬프를 그대로 유지할 수 있어요.
단, 스탬프지는 14일 동안 연장돼요.`,
      purpleButtonText: '기한 연장하기',
    },
    2: {
      titleText: newExpiresAt
        ? `스탬프지 기한이\n${new Date(newExpiresAt).getMonth() + 1}.${new Date(
            newExpiresAt,
          ).getDate()}까지 연장되었어요!`
        : '스탬프지 기한이 연장되었어요!',
      contentsText: undefined,
      purpleButtonText: undefined,
    },
  };

  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#6970F3] to-[#3D418D] z-0" />
      <div className="relative z-10 flex flex-col min-h-screen">
        <CommonHeader title="내 스탬프지" onBack={() => navigate(-1)} white />
        <div className="flex items-center gap-2 mt-6 text-white font-semibold text-lg">
          <span className="font-bold text-[1.25rem] leading-none">
            {stampData.cafe.name}
          </span>
          <span className="text-[#DFDFDF] text-[0.875rem] font-normal leading-none">
            ~
            {dueDate
              .toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
              .replace(/\.$/, '')}
          </span>
        </div>
        <div className="mt-4 text-[#E3F389] text-[1rem] font-medium leading-none">
          5,000원 이상 구매 시 스탬프 1개 적립
        </div>

        {diffDays <= 7 && (
          <>
            <div className="flex items-center gap-2 p-3 rounded bg-[rgba(255,255,255,0.3)] mt-4">
              <Info className="w-4 h-4 text-white" />
              <span className="text-white text-[0.875rem] font-semibold leading-none">
                {diffDays > 0
                  ? `${diffDays}일 후 포인트로 자동 환전되어요!`
                  : '오늘 포인트로 자동 환전되어요!'}
              </span>
            </div>
            <div className="flex h-[2.875rem] items-center text-center justify-center gap-2 px-3 rounded-[0.375rem] bg-[#E3F389] mt-2">
              <span
                className="text-black text-[1rem] font-semibold cursor-pointer"
                onClick={() => setIsPopupOpen(true)}
              >
                스탬프지 기한 연장하기
              </span>
            </div>
          </>
        )}

        <div className="bg-white rounded-t-xl mt-6 pt-6 pb-6 flex-grow -mx-[1.5rem] px-[1.5rem]">
          <div className="text-[1rem] flex gap-[0.5rem] items-center mb-4">
            <span className="font-medium">스탬프지</span>
            <span className="font-semibold text-[#6970F3]">
              {Math.floor(stampData.currentCount / stampData.goalCount) + 1}장째
              진행 중
            </span>
          </div>
          <div className="my-20">
            <StampPaper currentStep={stampData.currentCount % 10} />
          </div>
        </div>
      </div>

      <CommonBottomPopup
        show={isPopupOpen}
        onClose={handleClosePopup}
        titleText={popupContents[popupStep].titleText}
        contentsText={popupContents[popupStep].contentsText}
        purpleButton={popupContents[popupStep].purpleButtonText}
        purpleButtonOnClick={handlePurpleButtonClick}
      />
    </div>
  );
};

export default MyStampPage;
