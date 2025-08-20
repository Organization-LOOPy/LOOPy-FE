import { useState, useEffect } from "react";
import BellIcon from "/src/assets/images/BellPlus.svg?react";
import BellRingIcon from "/src/assets/images/BellRing.svg?react";
import MessageModal from "./MessageModal";

interface AlarmSubscribeButtonProps {
  className?: string;
  isActive?: boolean; 
  onToggle?: (newState: boolean) => void;
}

export default function AlarmSubscribeButton({ className = "", isActive, onToggle }: AlarmSubscribeButtonProps) {
    const [subscribed, setSubscribed] = useState<boolean>(!!isActive);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setSubscribed(!!isActive);
    }, [isActive]);

    const Icon = subscribed ? BellRingIcon : BellIcon;

    const handleClick = () => {
        if (subscribed) {
            setSubscribed(false);
            onToggle?.(false);
        } else {
            setShowModal(true);
        }
    };

    const handleConfirm = () => {   
        setSubscribed(true);
        onToggle?.(true);
        setShowModal(false);
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={`
                    flex items-center gap-[0.25rem] px-[0.5rem] py-[0.1875rem] rounded-[0.25rem]
                    text-[0.75rem] whitespace-nowrap
                    ${subscribed ? "border border-[#6970F3] text-[#6970F3]" : "border border-[#A8A8A8]"}
                    ${className}
                `}
            >
                <Icon className="w-[0.75rem] h-[0.75rem]" />
                <span>{subscribed ? "알림 받는 중" : "알림 받기"}</span>
            </button>

            {showModal && (
                <MessageModal
                    onClose={() => setShowModal(false)}
                    onConfirm={handleConfirm}
                />
            )}
        </>
    );
}
