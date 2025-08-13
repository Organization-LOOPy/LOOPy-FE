import { MyPageFunnelProvider } from "../contexts/MyFunnelProvider";
import MyPage from "../pages/User/My";

const MyPageFunnelLayout = () => {
  return (
    <MyPageFunnelProvider>
      <MyPage />
    </MyPageFunnelProvider>
  );
};

export default MyPageFunnelLayout;
