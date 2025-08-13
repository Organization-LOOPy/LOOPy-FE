import { useNavigate } from "react-router-dom";
import StepCafeInfo from "./_components/StepCafeInfo";
import StepSearchArea from "./_components/StepSearchArea";
import CommonHeader from "../../../components/header/CommonHeader";
import { useFunnel } from "../../../hooks/Funnel/useFunnel";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { step, go, back } = useFunnel<"search" | "cafe">("search");

  const handleBack = () => {
    if (step === "search") {
      navigate('/'); 
    } else if (step === "cafe") {
      back("search")(); 
    }
  };

  return (
    <div>
      <CommonHeader title="" onBack={handleBack} />

      {step === "search" && (
        <StepSearchArea onNext={() => go("cafe")} />
      )}

      {step === "cafe" && (
        <StepCafeInfo onNext={() => navigate("/home")} />
      )}
    </div>
  );
};

export default OnboardingPage;
