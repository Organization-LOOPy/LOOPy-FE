import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonHeader from '../../../components/header/CommonHeader';
import CafeListCard from '../../../components/card/CafeListCard';
import BookMarkPageSkeleton from './Skeleton/BookMarkSkeleton';
import { useBookMark } from '../../../hooks/query/bookmark/useBookMark';

const BookMarkPage = () => {
  const navigate = useNavigate();
  const {
    data: bookmarksData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useBookMark();

  // 이미 북마크된 카페 id를 관리
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  // 데이터 로딩 후 active 상태인 북마크 아이디 초기화
  useEffect(() => {
    if (bookmarksData.length > 0) {
      const activeIds = bookmarksData
        .filter((b) => b.status === 'active')
        .map((b) => Number(b.id));
      setBookmarkedIds(activeIds);
    }
  }, [bookmarksData]);

  // 북마크 토글 함수
  const handleBookmarkToggle = (id: number, newState: boolean) => {
    setBookmarkedIds((prev) =>
      newState ? [...prev, id] : prev.filter((item) => item !== id),
    );
  };

  // 카페 리스트로 변환
  const cafes = useMemo(
    () =>
      bookmarksData
        .filter((b) => b.status === 'active')
        .map((b) => ({
          id: Number(b.id),
          name: b.name,
          address: b.address,
          distanceText: '',
          images: b.photoUrl ? [b.photoUrl] : [],
          keywords: b.keywords ?? [],
        })),
    [bookmarksData],
  );

  if (isLoading) return <BookMarkPageSkeleton />;

  if (isError) {
    return (
      <div className="mb-8">
        <CommonHeader title="북마크한 카페" onBack={() => navigate(-1)} />
        <div className="mt-[1.5rem] px-4">
          <p className="text-red-600 mb-2">
            북마크된 카페를 불러오는 중 오류가 발생했습니다.
          </p>
          <pre className="text-sm text-gray-700">{(error as any)?.message}</pre>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => refetch()}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <CommonHeader title="북마크한 카페" onBack={() => navigate(-1)} />
      <div className="mt-[1.5rem] flex flex-col gap-6">
        {cafes.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            북마크한 카페가 없습니다.
          </div>
        ) : (
          cafes.map((cafe) => (
            <CafeListCard
              key={cafe.id}
              id={cafe.id}
              name={cafe.name}
              distanceText={cafe.distanceText}
              address={cafe.address}
              images={cafe.images}
              keywords={cafe.keywords}
              isBookmarked={bookmarkedIds.includes(cafe.id)}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BookMarkPage;
