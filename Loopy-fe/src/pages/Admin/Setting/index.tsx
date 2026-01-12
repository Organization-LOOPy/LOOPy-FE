import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import AdminMainSettingPage from "./_components/AdminMainSettingPage";
import AdminEditProfile from "./_components/AdminEditProfile";
import AdminManageAccount from "./_components/AdminManageAccount";
import { useAdminSettingFunnelStore } from "../../../store/funnel/useAdminSettingFunnelStore";
import { SettingProvider } from "../../../providers/AdminSettingProvider";
import type { AdminSettingStep } from "../../../types/adminSteps";

const VALID_STEPS: AdminSettingStep[] = [
  "setting",
  "editProfile",
  "manageAccount",
];

const AdminSettingPage = () => {
  const funnel = useAdminSettingFunnelStore((s) => s.funnel);
  const [searchParams, setSearchParams] = useSearchParams();

  const initializedRef = useRef(false);

  useEffect(() => {
    if (!funnel || initializedRef.current) return;

    if (funnel.step !== "setting") {
      initializedRef.current = true;
      return;
    }

    const stepFromUrl = searchParams.get("step") as AdminSettingStep | null;

    if (stepFromUrl && VALID_STEPS.includes(stepFromUrl)) {
      if (stepFromUrl !== funnel.step) {
        funnel.history.replace(stepFromUrl, funnel.context);
      }
    } else {
      setSearchParams({ step: funnel.step }, { replace: true });
    }

    initializedRef.current = true;
  }, [funnel, searchParams, setSearchParams]);

  useEffect(() => {
    if (!funnel) return;

    const stepInUrl = searchParams.get("step");
    if (stepInUrl !== funnel.step) {
      setSearchParams({ step: funnel.step }, { replace: true });
    }
  }, [funnel?.step, searchParams, setSearchParams]);

  if (!funnel) return <LoadingSpinner />;

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
