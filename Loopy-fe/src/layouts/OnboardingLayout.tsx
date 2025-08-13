import { OnboardingProvider } from "../contexts/OnboardingContext";
import OnboardingPage from "../pages/User/OnBoard";

const OnboardingLayout = () => {
  return (
    <OnboardingProvider>
      <OnboardingPage />
    </OnboardingProvider>
  );
};

export default OnboardingLayout;
