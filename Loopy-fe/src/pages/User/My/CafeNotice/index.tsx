import CommonHeader from "../../../../components/header/CommonHeader";
import MessageList from "./_components/MessageList";
import { recentMessages, oldMessages } from "./mock/messages";

interface CafeNoticePageProps {
  onBack: () => void;
}

const CafeNoticePage = ({ onBack }: CafeNoticePageProps) => {
  return (
    <div>
      <CommonHeader title="From 카페" onBack={onBack} />

      <section className="mt-[1.5rem]">
        <h2 className="text-[1.125rem] font-bold text-[#252525] mb-[1rem]">최근 7일</h2>
        <MessageList messages={recentMessages} />
      </section>

      <section className="mt-[1.5rem] mb-[4rem]">
        <h2 className="text-[1.125rem] font-bold text-[#252525] mb-[1rem]">예전 메시지</h2>
        <MessageList messages={oldMessages} />
      </section>
    </div>
  );
};

export default CafeNoticePage;
