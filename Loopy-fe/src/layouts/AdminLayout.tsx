import { Outlet } from 'react-router-dom';
import { AdminCafeProvider } from '../contexts/AdminContext';

const AdminLayout = () => {
  return (
    <AdminCafeProvider>
      <div className="w-full min-h-screen flex justify-center relative font-suit">
        <div className="w-full min-h-screen bg-white px-[1.5rem]">
          <Outlet />
        </div>
      </div>
    </AdminCafeProvider>
  );
};

export default AdminLayout;
