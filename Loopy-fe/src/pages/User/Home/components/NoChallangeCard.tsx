import { useNavigate } from 'react-router-dom';

const NoChallengeCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/challenge');
  };

  return (
    <div className="bg-[#F0F1FE] rounded-lg p-6 flex flex-col justify-center">
      <span className="text-[1rem] font-bold">
        아직 참여 중인 챌린지가 없어요!
      </span>
      <span className="text-[0.875rem] font-normal">
        루피와 작은 챌린지부터 시작해볼까요?
      </span>
      <div className="rounded-sm">
        <button
          onClick={handleClick}
          className="bg-transparent text-[#6970F3] border border-[#6970F3] rounded-lg w-full h-[2.5rem] text-[0.875rem] font-semibold mt-3"
        >
          참여 가능한 챌린지 보러가기
        </button>
      </div>
    </div>
  );
};

export default NoChallengeCard;
