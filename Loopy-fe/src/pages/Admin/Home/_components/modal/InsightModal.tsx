import { useInsight } from '../../../../../hooks/query/admin/home/useInsight';

type InsightModalProps = {
  onClose: () => void;
};

const InsightModal = ({ onClose }: InsightModalProps) => {
  const { data, isLoading, isError } = useInsight();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative w-[600px] max-w-full bg-white rounded-2xl shadow-lg px-10 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl leading-none ml-4"
        >
          ×
        </button>

        <h2 className="text-[1.125rem] font-bold mb-4.5">매장 분석 요약</h2>
        {isLoading && <p className="text-gray-500">로딩 중...</p>}
        {isError && (
          <p className="text-red-500">데이터를 불러오지 못했습니다.</p>
        )}
        {data && (
          <p className="text-black text-[1rem] whitespace-pre-line">
            {data.report.insights_text}
          </p>
        )}
      </div>
    </div>
  );
};

export default InsightModal;
