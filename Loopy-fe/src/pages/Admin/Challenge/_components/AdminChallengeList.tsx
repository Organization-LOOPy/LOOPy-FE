import { useNavigate } from 'react-router-dom';
import CommonSideBar from '../../../../components/admin/sideBar/CommonSideBar';
import CommonTopBar from '../../../../components/admin/topBar/CommonTopBar';
import ChallengeCard from './ChallengeCard';

const AdminChallengeList = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex font-suit text-[#252525]">
      <CommonSideBar />
      <div className="flex-1 flex flex-col ml-[12.875rem]">
        <CommonTopBar
          title="챌린지 목록"
          profileImageUrl=""
          onBack={() => navigate(-1)}
        />
        <ChallengeCard type="tumbler" buttonText="참여 중" />
        <ChallengeCard type="coffee" buttonText="참여" />
      </div>
    </div>
  );
};

export default AdminChallengeList;
