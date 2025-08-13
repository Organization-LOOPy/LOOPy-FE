import { useEffect, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useMyPageFunnel } from "../../../contexts/MyFunnelProvider";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";

const MainMyPage = lazy(() => import("./_components/MainMyPage"));
const SettingPage = lazy(() => import("./Setting"));
const StampExchangePage = lazy(() => import("./StampExchange"));
const CouponBoxPage = lazy(() => import("./CouponBox"));
const StampHistoryPage = lazy(() => import("./StampHistory"));
const FilterPage = lazy(() => import("./Filter"));
const CafeNoticePage = lazy(() => import("./CafeNotice"));
const EditProfile = lazy(() => import("./Setting/_components/EditProfile"));
const ManageAccount = lazy(() => import("./Setting/_components/ManageAccount"));
const WithdrawAccountView = lazy(() => import("./Setting/_components/WithdrawAccountView"));
const MyReviewPage = lazy(() => import("./MyReview"));

const MyPage = () => {
  const funnel = useMyPageFunnel();
  const navigate = useNavigate();

  useEffect(() => {
    if ((funnel.step as string) === "myChallenge") {
      navigate("/challenge");
    }
  }, [funnel.step, navigate]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <funnel.Render
        my={({ history }) => (
          <MainMyPage onNavigate={history.push} />
        )}
        setting={({ history, step }) => (
          <SettingPage
            currentStep={step}
            onBack={() => history.push("my", {})}
            onNavigate={history.push}
          />
        )}
        editProfile={({ history }) => (
          <EditProfile onBack={() => history.push("setting", {})} />
        )}
        manageAccount={({ history }) => (
          <ManageAccount
            onBack={() => history.push("setting", {})}
            onGoWithdraw={() => history.push("withdraw", {})}
          />
        )}
        withdraw={({ history }) => (
          <WithdrawAccountView
            onBack={() => history.push("manageAccount", {})}
          />
        )}
        stampExchange={({ history }) => (
          <StampExchangePage onBack={() => history.push("my", {})} />
        )}
        couponBox={({ history }) => (
          <CouponBoxPage onBack={() => history.push("my", {})} />
        )}
        stampHistory={({ history }) => (
          <StampHistoryPage onBack={() => history.push("my", {})} />
        )}
        review={({ history }) => (
          <MyReviewPage onBack={() => history.push("my", {})} />
        )}
        filter={({ history }) => (
          <FilterPage onBack={() => history.push("my", {})} />
        )}
        cafeNotice={({ history }) => (
          <CafeNoticePage onBack={() => history.push("my", {})} />
        )}
      />
    </Suspense>
  );
};

export default MyPage;
