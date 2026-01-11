import { useEffect, useState } from "react";
import CommonHeader from "../../../../components/header/CommonHeader";
import MessageList from "./_components/MessageList";
import {
  useMyPageNotifications,
  useOpenNotification,
  useInvalidateMyNotifications,
} from "../../../../hooks/query/my/useMyPageNotifications";

interface CafeNoticePageProps {
  onBack: () => void;
}

type Message = {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  date: string;
  isNew: boolean;
};

const fmt = (iso: string) => {
  const d = new Date(iso);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${mm}.${dd} ${hh}:${mi}`;
};

const isRecent7 = (iso: string) => {
  const created = new Date(iso);
  const d7 = new Date();
  d7.setDate(d7.getDate() - 7);
  return created >= d7;
};

const CafeNoticePage = ({ onBack }: CafeNoticePageProps) => {
  const { data: notifications = [] } = useMyPageNotifications();
  const invalidateList = useInvalidateMyNotifications();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { isSuccess } = useOpenNotification(selectedId ?? 0);

  useEffect(() => {
    if (isSuccess) {
      invalidateList();
      setSelectedId(null);
    }
  }, [isSuccess, invalidateList]);

  const toMessage = (n: any): Message => {
    const content = typeof n.content === "string" ? n.content : JSON.stringify(n.content);
    const combined = n.title ? `${n.title}\n${content}` : content;
    return {
      id: n.notificationId,
      sender: n.cafeName || "알림",
      avatar: "",
      content: combined,
      date: fmt(n.createdAt),
      isNew: !n.isRead,
    };
  };

  const recentMsgs: Message[] = notifications
    .filter((n) => isRecent7(n.createdAt))
    .map(toMessage);

  const oldMsgs: Message[] = notifications
    .filter((n) => !isRecent7(n.createdAt))
    .map(toMessage);

  return (
    <div>
      <CommonHeader title="From 카페" onBack={onBack} />

      <section className="mt-[1.5rem]">
        <h2 className="text-[1.125rem] font-bold text-[#252525] mb-[1rem]">최근 7일</h2>
        <MessageList
          messages={recentMsgs}
          onOpen={(id) => setSelectedId(id)}
        />
      </section>

      <section className="mt-[1.5rem] mb-[4rem]">
        <h2 className="text-[1.125rem] font-bold text-[#252525] mb-[1rem]">예전 메시지</h2>
        <MessageList
          messages={oldMsgs}
          onOpen={(id) => setSelectedId(id)}
        />
      </section>
    </div>
  );
};

export default CafeNoticePage;
