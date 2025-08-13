import CommonSideBar from '../../../components/admin/sideBar/CommonSideBar';
import CommonTopBar from '../../../components/admin/topBar/CommonTopBar';
import StampStatsBar from './_components/StampStatsBar';
import StampPolicyCard from './_components/StampPolicyCard';

const AdminStampPage = () => {
  const token = undefined;

  return (
    <div>
      <CommonSideBar />
      <div className="flex-1 flex flex-col ml-[12.875rem]">
        <CommonTopBar title="스탬프 관리" profileImageUrl="" />

        <div className='mb-[2rem]'>
          <StampStatsBar token={token} />
        </div>
        
        <div>
          <StampPolicyCard token={token} />
        </div>
      </div>
    </div>
  );
};

export default AdminStampPage;
