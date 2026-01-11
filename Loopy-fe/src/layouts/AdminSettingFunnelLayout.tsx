import { AdminSettingFunnelProvider } from "../zustand/AdminSettingProvider";
import AdminSettingPage from "../pages/Admin/Setting";

const MyPageFunnelLayout = () => {
  return (
    <AdminSettingFunnelProvider>
      <AdminSettingPage />
    </AdminSettingFunnelProvider>
  );
};

export default MyPageFunnelLayout;
