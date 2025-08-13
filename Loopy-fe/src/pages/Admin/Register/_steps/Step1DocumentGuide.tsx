import { useState, useEffect } from "react";
import AgreementItemPlain from "../_components/AgreementItemPlain";

interface Step1DocumentGuideProps {
    setValid: (valid: boolean) => void;
}

export default function Step1DocumentGuide({ setValid }: Step1DocumentGuideProps) {
    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        setValid(agreed); 
    }, [agreed, setValid]);

    return (
        <div className="w-full flex-1 bg-white font-suit px-[1.5rem]">
            <div className="w-full max-w-[544px] mx-auto flex flex-col h-full min-h-[calc(100vh-9.5rem-6.5rem)] pt-[2rem]">
                <h1 className="text-[1.25rem] font-bold text-[#252525] w-full text-left mb-[1.5rem]">
                    필요 서류 안내
                </h1>

                <div className="w-full h-[6rem] p-[1.5rem] bg-[#F4F5FF] text-[1rem] font-medium text-[#3B3B3B] rounded-[0.5rem] leading-[150%] mb-[2rem]">
                    등록된 제휴 업체는 실제 영업을 하고 있는 사업자여야 하며,
                    루피는 필요 시 관련 서류(사업자등록증 등)를 요청할 수 있습니다.
                </div>

                <div className="flex-1" />

                
                <AgreementItemPlain
                    label="서류 안내 사항을 확인하였으며, 이에 동의합니다."
                    checked={agreed}
                    onClick={() => setAgreed((prev) => !prev)}
                />
            </div>
        </div>
    );
}