interface StepProgressProps {
  steps: string[];
  currentStep: number;
}

export default function StepProgress({ steps, currentStep }: StepProgressProps) {
    return (
        <div className="w-full px-[2rem] py-[2rem]">
            <div className="flex justify-center w-full max-w-[1024px] mx-auto">
                <div className="flex items-center">
                    {steps.map((step, index) => {
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep; 
                        const isFirst = index === 0;
                        const isLast = index === steps.length - 1;

                        return (
                            <div key={index} className="flex flex-col items-center">
                                {/* 원 + 선 */}
                                <div className="flex items-center h-[0.75rem]">
                                    {/* 왼쪽 선 */}
                                    <div
                                    className={`w-[2.59375rem] h-[1px] mr-[0.375rem] ${
                                        isFirst ? 'bg-transparent' : (isCompleted || isActive) ? 'bg-[#6970F3]' : 'bg-[#D9D9D9]'
                                    }`}
                                    />

                                    {/* 원 */}
                                    <div className="relative w-[0.75rem] h-[0.75rem] flex-shrink-0">
                                    <div
                                        className={`w-full h-full rounded-full z-10 ${
                                            isActive ? 'bg-[#6970F3]' : isCompleted ? 'bg-[#6970F3]' : 'bg-[#D9D9D9]'
                                        }`}
                                    />
                                    {isActive && (
                                        <div className="absolute inset-[-0.375rem] rounded-full bg-[rgba(105,112,243,0.2)]" />
                                    )}
                                    </div>

                                    {/* 오른쪽 선 */}
                                    <div
                                        className={`w-[2.59375rem] h-[1px] ml-[0.375rem] ${
                                            isLast ? 'bg-transparent' : isCompleted ? 'bg-[#6970F3]' : 'bg-[#D9D9D9]'
                                        }`}
                                    />
                                </div>

                                {/* 텍스트 */}
                                <p
                                    className={`mt-[1rem] text-[0.875rem] leading-[1rem] font-semibold text-center whitespace-nowrap ${
                                        isActive ? 'text-[#6970F3]' : isCompleted ? 'text-[#6970F3]' : 'text-[#A8A8A8]'
                                    }`}
                                >
                                    {step}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
