import { MyPageFunnelProvider } from "../zustand/MyFunnelProvider";
import MyPage from "../pages/User/My";

const MyPageFunnelLayout = () => {
  return (
    <MyPageFunnelProvider>
      <MyPage />
    </MyPageFunnelProvider>
  );
};

export default MyPageFunnelLayout;
