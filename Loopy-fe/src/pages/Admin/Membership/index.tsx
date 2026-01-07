import HomeQRButton from '../Home/_components/HomeQRButton';
import HomeStampButton from '../Home/_components/HomeStampButton';

const AdminMembershipPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-[44rem] px-6">
        <div className="flex gap-4 justify-center">
          <div className="w-[18rem]">
            <HomeStampButton />
          </div>
          <div className="w-[18rem]">
            <HomeQRButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMembershipPage;
