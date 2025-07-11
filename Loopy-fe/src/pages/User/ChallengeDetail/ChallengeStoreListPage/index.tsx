import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import CommonHeader from '../../../../components/header/CommonHeader';
import { challengeCardList } from '../../Challenge/mock/mockData';
import LocationLabel from '../../../../components/etc/LocationLabel';
import SmallButton from '../components/SmallButton';
import CommonBottomPopup from '../../../../components/popup/CommonBottomPopup';

const ChallengeStoreListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const challengeId = Number(id);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const challenge = challengeCardList.find(
    (item) => item.challengeId === challengeId,
  );

  if (!challenge) {
    return <div>챌린지를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <CommonHeader title="카공 챌린지 가능 매장" onBack={() => navigate(-1)} />
      <div className="space-y-4">
        <div className="mt-[1.5rem] mb-[1rem]">
          <LocationLabel dongName="서대문구 연희동" />
        </div>
        {challenge.storeList?.length ? (
          challenge.storeList.map((store, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* 카페 사진 */}
              <img
                src={store.imageUrl}
                alt={store.name}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              {/* 정보 */}
              <div className="flex-1 flex flex-col justify-center gap-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-[1.125rem]">{store.name}</p>
                  <p className="text-[0.75rem] text-[#7F7F7F]">
                    {store.distance}m
                  </p>
                </div>
                <p className="text-[0.875rem] text-[#7F7F7F]">
                  {store.address}
                </p>
              </div>

              {/* 참여 버튼 */}
              <SmallButton text="참여" onClick={() => setIsPopupOpen(true)} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">등록된 매장이 없습니다.</p>
        )}
      </div>

      {/* 팝업 컴포넌트 */}
      <CommonBottomPopup
        show={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        titleText="카페 위니에서 카공 챌린지를 진행할까요?"
        purpleButton="참여하기"
        contentsText="챌린지는 한 카페에서만 진행하실 수 있어요"
      />
    </div>
  );
};

export default ChallengeStoreListPage;
