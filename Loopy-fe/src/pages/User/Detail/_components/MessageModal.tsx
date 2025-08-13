import BaseModalLayout from "./BaseModal";

interface Props {
    onClose: () => void;
    onConfirm: () => void;
}

export default function MessageModal({ onClose, onConfirm }: Props) {
    return (
        <BaseModalLayout onConfirm={onConfirm} onClose={onClose} confirmText="알림 받기">
            <div className="text-[1.25rem] font-bold text-[#000000]">카페 위니의 메시지 알림을 받을까요?</div>
            <p className="mt-[1rem] text-[#7F7F7F] text-[0.875rem] font-normal leading-[1.5rem]">
                카페 위니만의 다양한 할인, 이벤트, 쿠폰 정보를 알림으로 알려드려요
            </p>
        </BaseModalLayout>
    );
}
