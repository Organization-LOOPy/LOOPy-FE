import { Suspense } from "react";
import { useAdminSettingFunnel, SettingProvider } from "../../../contexts/AdminSettingProvider";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import AdminMainSettingPage from "./_components/AdminMainSettingPage";
import AdminEditProfile from "./_components/AdminEditProfile";
import AdminManageAccount from "./_components/AdminManageAccount";

const AdminSettingPage = () => {
  const funnel = useAdminSettingFunnel();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <funnel.Render
        setting={({ history, step, context }) => (
          <SettingProvider value={{ step, context, replace: history.replace, push: history.push }}>
            <AdminMainSettingPage onNavigate={history.push} />
          </SettingProvider>
        )}
        editProfile={({ history, step, context }) => (
          <SettingProvider value={{ step, context, replace: history.replace, push: history.push }}>
            <AdminEditProfile onBack={() => history.push("setting", {})} />
          </SettingProvider>
        )}
        manageAccount={({ history, step, context }) => (
          <SettingProvider value={{ step, context, replace: history.replace, push: history.push }}>
            <AdminManageAccount onBack={() => history.push("setting", {})} />
          </SettingProvider>
        )}
      />
    </Suspense>
  );
};

export default AdminSettingPage;
