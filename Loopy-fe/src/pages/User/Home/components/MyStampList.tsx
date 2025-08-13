import { useStampBooks } from '../../../../hooks/query/stampBook/useStampBook';
import MyStamp from './MyStamp';

const MyStampList = () => {
  const { data: stampBooks, isLoading, error } = useStampBooks();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>스탬프북을 불러오는 중 오류가 발생했습니다.</div>;
  if (!stampBooks || stampBooks.length === 0)
    return <div>스탬프북이 없습니다.</div>;

  return (
    <div className="flex flex-wrap gap-4">
      {stampBooks.map((stamp) => (
        <MyStamp
          key={stamp.id}
          stampBook={stamp}
          imageUrl={undefined} // 이미지가 있다면 stamp.imageUrl 등으로 바꿔주세요
        />
      ))}
    </div>
  );
};

export default MyStampList;
