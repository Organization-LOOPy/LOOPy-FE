import CommonButton from "../../../../components/button/CommonButton";

interface BaseModalLayoutProps {
    children: React.ReactNode;
    onConfirm: () => void;
    onClose: () => void;
    confirmText: string;
    closeText?: string;
}

export default function BaseModalLayout({
    children,
    onConfirm,
    onClose,
    confirmText,
    closeText = "닫기",
}: BaseModalLayoutProps) {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-end">
            <div className="relative w-full max-w-[24.5625rem] h-full">
                <div
                    className="absolute inset-0 bg-black/50 z-0"
                    onClick={onClose}
                />

                <div className="
                    absolute bottom-0 w-full h-[18.75rem] bg-white rounded-t-[1rem] z-10
                    px-[1.5rem] pt-[2.5rem] pb-[2.25rem]
                ">

                    {/* 내용 */}
                    {children}

                    {/* 하단 버튼 */}
                    <div className="absolute bottom-[2.25rem] left-0 w-full px-[1.5rem] flex flex-col gap-[0.5rem]">
                        <CommonButton
                        text={confirmText}
                        autoStyle
                        className="text-[1rem] h-[3.125rem] bg-[#6970F3] text-white font-semibold flex items-center justify-center"
                        onClick={onConfirm}
                        />
                        <CommonButton
                        text={closeText}
                        autoStyle={false}
                        className="text-[1rem] h-[3.125rem] bg-[#DFDFDF] text-[#7F7F7F] font-semibold flex items-center justify-center"
                        onClick={onClose}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
