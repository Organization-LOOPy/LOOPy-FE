import { useEffect, useRef, Suspense } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMyPageFunnelStore } from "../../../store/funnel/useMyPageFunnelStore";
import MainMyPageSkeleton from "./Skeleton/MainMypageSkeleton";
import MainMyPage from "./_components/MainMyPage";
import CouponBoxPage from "./CouponBox";
import SettingPage from "./Setting";
import EditProfile from "./Setting/_components/EditProfile";
import ManageAccount from "./Setting/_components/ManageAccount";
import WithdrawAccountView from "./Setting/_components/WithdrawAccountView";
import StampExchangePage from "./StampExchange";
import StampHistoryPage from "./StampHistory";
import MyReviewPage from "./MyReview";
import FilterPage from "./Filter";
import CafeNoticePage from "./CafeNotice";
import type { MyPageStep } from "../../../types/mySteps";

const MyPage = () => {
  const funnel = useMyPageFunnelStore((s) => s.funnel);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!funnel || isInitializedRef.current) return;

    const stepFromUrl = searchParams.get("step") as MyPageStep | null;

    if (stepFromUrl && stepFromUrl !== funnel.step) {
      funnel.history.replace(stepFromUrl, funnel.context);
    }

    isInitializedRef.current = true;
  }, [funnel, searchParams]);

  useEffect(() => {
    if (!funnel) return;
    setSearchParams({ step: funnel.step }, { replace: true });
  }, [funnel?.step, setSearchParams]);

  useEffect(() => {
    if (!funnel) return;
    if ((funnel.step as string) === "myChallenge") {
      navigate("/challenge");
    }
  }, [funnel, navigate]);

  if (!funnel) {
    return <MainMyPageSkeleton />;
  }

  return (
    <Suspense fallback={<MainMyPageSkeleton />}>
      <funnel.Render
        my={({ history }) => (
          <MainMyPage onNavigate={history.push} />
        )}

        setting={({ history, step }) => (
          <SettingPage
            currentStep={step}
            onBack={() => history.push("my")}
            onNavigate={history.push}
          />
        )}

        editProfile={({ history }) => (
          <EditProfile onBack={() => history.push("setting")} />
        )}

        manageAccount={({ history }) => (
          <ManageAccount
            onBack={() => history.push("setting")}
            onGoWithdraw={() => history.push("withdraw")}
          />
        )}

        withdraw={({ history }) => (
          <WithdrawAccountView
            onBack={() => history.push("manageAccount")}
          />
        )}

        stampExchange={({ history }) => (
          <StampExchangePage onBack={() => history.push("my")} />
        )}

        couponBox={({ history }) => (
          <CouponBoxPage onBack={() => history.push("my")} />
        )}

        stampHistory={({ history }) => (
          <StampHistoryPage onBack={() => history.push("my")} />
        )}

        review={({ history }) => (
          <MyReviewPage onBack={() => history.push("my")} />
        )}

        filter={({ history }) => (
          <FilterPage onBack={() => history.push("my")} />
        )}

        cafeNotice={({ history }) => (
          <CafeNoticePage onBack={() => history.push("my")} />
        )}
      />
    </Suspense>
  );
};

export default MyPage;
