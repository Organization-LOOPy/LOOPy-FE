import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="w-full relative flex justify-center font-suit overflow-hidden">
      {/*sm - 640px 이상
        md - 768px 이상
        lg - 1024px 이상
        xl - 1280px 이상
        2xl - 1536px 이상
      */}
      <div className="w-full sm:max-w-[393px] min-h-screen bg-white relative flex flex-col px-[1.5rem] outline-[0.5px] outline-[#E0E0E0]">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
