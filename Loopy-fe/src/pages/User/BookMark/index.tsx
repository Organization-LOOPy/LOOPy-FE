import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonHeader from '../../../components/header/CommonHeader';
import CafeListCard from '../../../components/card/CafeListCard';
import BookMarkPageSkeleton from './Skeleton/BookMarkSkeleton';
import { useBookMark } from '../../../hooks/query/bookmark/useBookMark';

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
];

const BookMarkPage = () => {
  const navigate = useNavigate();
  const { data: bookmarks, isLoading, isError, error, refetch } = useBookMark();

  const cafes = useMemo(() => {
    if (!bookmarks) return [];
    return bookmarks
      .filter((b) => b.status === 'active')
      .map((b) => ({
        id: b.id,
        name: b.name,
        address: b.address,
        distanceText: '',
        images: DEFAULT_IMAGES,
        keywords: b.keywords ?? [],
      }));
  }, [bookmarks]);

  if (isLoading) {
    return <BookMarkPageSkeleton />;
  }

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
              id={typeof cafe.id === 'string' ? parseInt(cafe.id, 10) : cafe.id}
              name={cafe.name}
              distanceText={cafe.distanceText}
              address={cafe.address}
              images={cafe.images}
              keywords={cafe.keywords}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BookMarkPage;
