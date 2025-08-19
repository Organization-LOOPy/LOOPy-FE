import { useNavigate } from 'react-router-dom';
import DueDate from '../../../../components/date/Date';
import ExpireTag from './ExpireTag';
import { GetRemainingDays } from '../../MyStamp/components/GetRemainingDays';
import type { StampBook } from '../../../../apis/stampBook/type';

interface MyStampProps {
  stampBook: StampBook;
  imageUrl?: string;
}

const MyStamp: React.FC<MyStampProps> = ({ stampBook, imageUrl }) => {
  const navigate = useNavigate();

  const { cafe, currentCount, goalCount, expiresAt } = stampBook;

  const dueDate = new Date(expiresAt);
  const progressPercent = (currentCount / goalCount) * 100;
  const daysLeft = GetRemainingDays(dueDate);

  return (
    <div className="relative w-[21.563rem] h-[11.125rem] flex items-center justify-between p-4 overflow-hidden">
      {/* 스탬프 영역 */}
      <div className="absolute w-[16.375rem] h-[5.125rem] rounded-br-[6.25rem] top-0 right-0 bg-[#E3F389] px-4 py-3 flex flex-col items-end justify-center">
        <div className="absolute top-[0.938rem] left-[6.25rem] flex items-center gap-10 text-base font-semibold text-black">
          <span>스탬프 {currentCount}개</span>
          <span
            className="text-lg cursor-pointer"
            onClick={() => navigate(`/mystamppage/${stampBook.id}`)}
          >
            →
          </span>
        </div>

        <div className="absolute top-[2.813rem] left-[6.25rem] flex items-center gap-2 mt-1">
          <div className="w-[4.313rem] h-[0.5rem] bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6970F3] rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="text-xs text-black">
            {currentCount}/{goalCount}
          </div>
        </div>
      </div>

      {/* 이미지 */}
      <div className="absolute top-0 left-0 w-[10.25rem] h-[10.5rem] rounded-full overflow-hidden bg-gray-200">
        {imageUrl ? (
          <img src={imageUrl} className="w-full h-full object-cover" />
        ) : null}
      </div>

      {/* 연한 부채꼴 */}
      <div className="absolute w-[10rem] h-[10rem] rounded-full bg-[#E3F389] opacity-30 top-25 right-0"></div>

      {/* 카페 정보 */}
      <div className="absolute left-[5.125rem] top-[5.25rem] w-[11.875rem] h-[6.25rem] bg-white p-3.5">
        <div className="text-[1rem] font-semibold">{cafe.name}</div>
        <div className="text-[0.75rem] text-[#7F7F7F] truncate max-w-[15ch] overflow-hidden whitespace-nowrap">
          {cafe.address}
        </div>
        {daysLeft >= 7 ? (
          <div className="text-[0.875rem] font-semibold text-[#6970F3] mt-1">
            기한 ~ <DueDate date={dueDate} />
          </div>
        ) : (
          <ExpireTag dueDate={dueDate} />
        )}
      </div>
    </div>
  );
};

export default MyStamp;
