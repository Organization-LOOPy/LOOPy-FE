import { useEffect, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // location import
import { useMyPageFunnel } from "../../../contexts/MyFunnelProvider";
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

const MyPage = () => {
  const funnel = useMyPageFunnel();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if ((funnel.step as string) === "myChallenge") {
      navigate("/challenge");
    }
  }, [funnel.step, navigate]);

   useEffect(() => {
    const params = new URLSearchParams(location.search);

    const myStep = params.get("myStep");
    if (myStep && myStep !== funnel.step) {
      funnel.history.push(myStep as any, {});
      return;
    }

    const myDotStep = params.get("my.step");
    if (myDotStep && myDotStep !== funnel.step) {
      funnel.history.push(myDotStep as any, {});
    }
  }, [location.search, funnel]);

  return (
    <Suspense fallback={<MainMyPageSkeleton />}>
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
