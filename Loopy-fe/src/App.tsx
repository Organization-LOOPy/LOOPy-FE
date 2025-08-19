import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import UserLayout from './layouts/UserLayout.tsx';
import AdminLayout from './layouts/AdminLayout';
import HomePage from './pages/User/Home';
import DetailPage from './pages/User/Detail';
import AdminLoginPage from './pages/Admin/Login';
import SigninPage from './pages/User/Signin';
import MapPage from './pages/User/Map';
import AdminSigninPage from './pages/Admin/Signin';
import ErrorPage from './pages/ErrorPage';
import SearchPage from './pages/User/Search';
import AlarmPage from './pages/User/Alarm';
import BookMarkPage from './pages/User/BookMark';
import LocationPage from './pages/User/Location';
import ChallengePage from './pages/User/Challenge';
import LevelDetailPage from './pages/User/LevelDetail';
import ChallengeDetailPage from './pages/User/ChallengeDetail';
import ChallengeStoreListPage from './pages/User/ChallengeDetail/ChallengeStoreListPage';
import MyStampPage from './pages/User/MyStamp';
import MenuListPage from './pages/User/Menu';
import ReviewWritePage from './pages/User/Review';
import OnboardingLayout from './layouts/OnboardingLayout.tsx';
import LoginSuccess from './pages/auth/LoginSuccess.tsx';
import MyPageFunnelLayout from './layouts/MyPageFunnelLayout.tsx';
import AdminHomePage from './pages/Admin/Home/index.tsx';
import AdminChallengePage from './pages/Admin/Challenge/index.tsx';
import AdminCouponPage from './pages/Admin/Coupon/index.tsx';
import AdminStampPage from './pages/Admin/Stamp/index.tsx';
import AdminSettingFunnelLayout from './layouts/AdminSettingFunnelLayout.tsx';
import AdminChallengeList from './pages/Admin/Challenge/_components/AdminChallengeList.tsx';
import AdminChallengeDetail from './pages/Admin/Challenge/_components/AdminChallengeDetail.tsx';
import AdminNotificationPage from './pages/Admin/Notification/index.tsx';
import AdminRegisterPage from './pages/Admin/Register/index.tsx';
import MapSearchProviders from './layouts/MapSearchProviderLayout.tsx';
import VerifyPage from './pages/auth/VerifyPage.tsx';
import { AuthCheck } from './utils/authCheck';
import AppEntry from './pages/AppEntry.tsx';

const publicRoutes = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <AppEntry />,
        handle: { isPublic: true },
      },
      {
        path: 'signin',
        loader: AuthCheck.authPageCheck,
        element: <SigninPage />,
        handle: { isPublic: true },
      },
      {
        path: 'login/success',
        element: <LoginSuccess />,
        handle: { isPublic: true },
      },
      {
        path: 'verify',
        loader: AuthCheck.authPageCheck,
        element: <VerifyPage />,
      },
      {
        path: 'onboard',
        loader: AuthCheck.authPageCheck,
        element: <OnboardingLayout />,
      },
      {
        path: 'home',
        loader: AuthCheck.authPageCheck,
        element: <HomePage />,
      },
      {
        path: 'map',
        loader: AuthCheck.authPageCheck,
        children: [
          {
            index: true,
            element: (
              <MapSearchProviders>
                <MapPage />
              </MapSearchProviders>
            ),
          },
          { path: 'location', element: <LocationPage /> },
        ],
      },
      {
        path: 'search',
        loader: AuthCheck.authPageCheck,
        children: [
          {
            index: true,
            element: (
              <MapSearchProviders>
                <SearchPage />
              </MapSearchProviders>
            ),
          },
          { path: 'location', element: <LocationPage /> },
        ],
      },
      {
        path: 'detail/:cafeId',
        loader: AuthCheck.authPageCheck,
        children: [
          {
            index: true,
            loader: AuthCheck.authPageCheck,
            element: <DetailPage />,
          },
          {
            path: 'menu',
            loader: AuthCheck.authPageCheck,
            element: <MenuListPage />,
          },
          {
            path: 'write-review',
            loader: AuthCheck.authPageCheck,
            element: <ReviewWritePage />,
          },
        ],
      },
      {
        path: 'mypage',
        loader: AuthCheck.authPageCheck,
        element: <MyPageFunnelLayout />,
      },
      {
        path: 'alarm',
        loader: AuthCheck.authPageCheck,
        element: <AlarmPage />,
      },
      {
        path: 'bookmark',
        loader: AuthCheck.authPageCheck,
        element: <BookMarkPage />,
      },
      {
        path: 'challenge',
        loader: AuthCheck.authPageCheck,
        element: <ChallengePage />,
      },
      {
        path: 'challenge/:id',
        loader: AuthCheck.authPageCheck,
        element: <ChallengeDetailPage />,
      },
      {
        path: 'challenge/:id/stores',
        loader: AuthCheck.authPageCheck,
        element: <ChallengeStoreListPage />,
      },
      {
        path: 'level',
        loader: AuthCheck.authPageCheck,
        element: <LevelDetailPage />,
      },
      {
        path: 'mystamppage/:stampBookId',
        loader: AuthCheck.authPageCheck,
        element: <MyStampPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminLoginPage />,
      },
      // {
      //   path: 'login/success',
      //   element: <AdminLoginSuccess />,
      //   handle: { isPublic: true },
      // },
      {
        path: 'signin',
        loader: AuthCheck.authPageCheck,
        element: <AdminSigninPage />,
      },
      {
        path: 'home',
        loader: AuthCheck.authPageCheck,
        element: <AdminHomePage />,
      },
      {
        path: 'register',
        loader: AuthCheck.authPageCheck,
        element: <AdminRegisterPage />,
      },
      {
        path: 'challenge',
        loader: AuthCheck.authPageCheck,
        element: <AdminChallengePage />,
      },
      {
        path: 'challenge/:challengeId',
        loader: AuthCheck.authPageCheck,
        element: <AdminChallengeDetail />,
      },

      {
        path: 'challengelist',
        loader: AuthCheck.authPageCheck,
        element: <AdminChallengeList />,
      },
      {
        path: 'coupon/:cafeId',
        loader: AuthCheck.authPageCheck,
        element: <AdminCouponPage />,
      },
      {
        path: 'stamp',
        loader: AuthCheck.authPageCheck,
        element: <AdminStampPage />,
      },
      {
        path: 'notification',
        loader: AuthCheck.authPageCheck,
        element: <AdminNotificationPage />,
      },
      {
        path: 'setting',
        loader: AuthCheck.authPageCheck,
        element: <AdminSettingFunnelLayout />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={publicRoutes} />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;
