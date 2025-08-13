import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CommonHeader from '../../../components/header/CommonHeader';
import CommonButton from '../../../components/button/CommonButton';
import StepProgress from './_components/StepProgress';
import Step1DocumentGuide from './_steps/Step1DocumentGuide';
import Step2BasicInfo from './_steps/Step2BasicInfo';
import Step3BusinessInfo from './_steps/Step3BusinessInfo';
import Step4Menu from './_steps/Step4Menu';
import Step5Stamp from './_steps/Step5Stamp';
import AdminRegisterContentLayout from '../../../layouts/AdminRegisterContetntLayout';

const stepLabels = ['필요 서류 안내', '기본정보 입력', '운영정보 입력', '메뉴 등록', '스탬프 등록'];
const LAST_STEP_INDEX = stepLabels.length - 1;

export default function AdminRegisterPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const stepFromParams = useMemo(() => {
        const raw = searchParams.get('step');
        const n = Number(raw);
        if (!Number.isFinite(n)) return 0;
        if (n < 0) return 0;
        if (n > LAST_STEP_INDEX) return LAST_STEP_INDEX;
        return n;
    }, [searchParams]);

    const [step, setStep] = useState<number>(stepFromParams);
    const [isStepValid, setIsStepValid] = useState(false);

    // URL 변경 시 내부 step 동기화 + 스크롤 상단 + 유효성 초기화
    useEffect(() => {
        setStep(stepFromParams);
        setIsStepValid(false);
        window.scrollTo(0, 0);
    }, [stepFromParams]);

    const goToStep = (next: number) => {
        const safe = next < 0 ? 0 : next > LAST_STEP_INDEX ? LAST_STEP_INDEX : next;
        setStep(safe);
        setSearchParams({ step: String(safe) });
    };

    const handleNext = () => {
        if (step < LAST_STEP_INDEX) {
            goToStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step === 0) {
            navigate("/admin");
            return;
        }
        if (step === 1) {
            navigate(-1);
        } else if (step > 0) {
            goToStep(step - 1);
        }
    };

    const renderStep = () => {
        const props = { onNext: handleNext, onBack: handleBack, setValid: setIsStepValid };

        switch (step) {
            case 0:
                return <Step1DocumentGuide {...props} />;
            case 1:
                return <Step2BasicInfo {...props} />;
            case 2:
                return <Step3BusinessInfo />;
            case 3:
                return <Step4Menu setValid={setIsStepValid} />;
            case 4:
                return <Step5Stamp setValid={setIsStepValid} />;
            default:
                return null;
        }
    };

    // 계산식 추가
    const isNextDisabled = (step !== 2 ? !isStepValid : false) || step === LAST_STEP_INDEX;

    return (
        <div className="w-full min-h-screen bg-white font-suit">
            {/* 상단 고정 영역 */}
            <div className="fixed top-0 left-0 w-full bg-white z-50">
                <div className="ml-[1.5rem]">
                    <CommonHeader onBack={handleBack} title="" />
                </div>
                <StepProgress steps={stepLabels} currentStep={step} />
            </div>

            {/* 콘텐츠 영역 */}
            <AdminRegisterContentLayout>
                {renderStep()}
            </AdminRegisterContentLayout>

            {/* 하단 고정 버튼 */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full px-[1.5rem] pt-[1rem] pb-[2rem] max-w-[1024px] flex justify-center bg-white">
                <CommonButton
                    text="다음으로 넘어가기"
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    className={`w-full max-w-[34rem] ${isStepValid ? 'bg-[#6970F3] text-white' : 'bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none'}`}
                />
            </div>
        </div>
    );
}
