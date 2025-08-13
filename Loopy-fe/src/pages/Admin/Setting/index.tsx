import { Suspense, lazy } from "react";
import { useAdminSettingFunnel, SettingProvider } from "../../../contexts/AdminSettingProvider";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";

const AdminMainSettingPage = lazy(() => import("./_components/AdminMainSettingPage"));
const AdminEditProfile   = lazy(() => import("./_components/AdminEditProfile"));  
const AdminManageAccount = lazy(() => import("./_components/AdminManageAccount")); 

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
