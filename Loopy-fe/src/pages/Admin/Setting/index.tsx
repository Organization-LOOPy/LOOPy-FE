import { Suspense, useEffect } from "react";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import AdminMainSettingPage from "./_components/AdminMainSettingPage";
import AdminEditProfile from "./_components/AdminEditProfile";
import AdminManageAccount from "./_components/AdminManageAccount";
import { useAdminSettingFunnelStore } from "../../../hooks/Funnel/useAdminSettingFunnelStore";
import { SettingProvider } from "../../../zustand/AdminSettingProvider";
import { useLocation, useNavigate } from "react-router-dom";

const AdminSettingPage = () => {
  const funnel = useAdminSettingFunnelStore((s) => s.funnel);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.search === "?") {
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  if (!funnel) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SettingProvider
        value={{
          step: funnel.step,
          context: funnel.context,
          replace: funnel.history.replace,
          push: funnel.history.push,
        }}
      >
        <funnel.Render
          setting={({ history }) => (
            <AdminMainSettingPage onNavigate={history.push} />
          )}
          editProfile={({ history }) => (
            <AdminEditProfile onBack={() => history.push("setting")} />
          )}
          manageAccount={({ history }) => (
            <AdminManageAccount onBack={() => history.push("setting")} />
          )}
        />
      </SettingProvider>
    </Suspense>
  );
};

export default AdminSettingPage;
