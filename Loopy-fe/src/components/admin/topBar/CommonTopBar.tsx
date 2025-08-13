import AdminBell from '../../../assets/images/AdminBell.svg?react';
import BackIcon from "../../../assets/images/Back.svg?react";

const SIDEBAR_WIDTH = '12.875rem';

interface TopBarProps {
  userName?: string; // 홈 화면일 때 
  profileImageUrl?: string;
  title?: string; // 일반 제목일 때 보여줄 타이틀 텍스트
  onBack?: () => void; // 뒤로가기 버튼 클릭 
}

const CommonTopBar = ({ userName, profileImageUrl, title, onBack }: TopBarProps) => {
  const isAdmin = !!userName;

  return (
    <header
      aria-label="상단 바"
      className={`flex items-center justify-between bg-white ${isAdmin ? 'pt-8 px-6' : 'mt-8 mb-6'}`}
      style={
        isAdmin
          ? {
              position: 'absolute',
              top: 0,
              left: SIDEBAR_WIDTH,
              right: 0,
              zIndex: 20,
            }
          : undefined
      }
    >
      {/* 왼쪽: 관리자 인사말 or 일반 타이틀 */}
      <div className="flex items-center gap-4">
        {!isAdmin && title && onBack && (
          <button onClick={onBack} aria-label="뒤로가기" className="mt-0.25">
            <BackIcon className="text-[#252525]" />
          </button>
        )}

        {isAdmin ? (
          <div className="text-[1.25rem] font-bold text-[#252525]">
            안녕하세요, {userName} 담당자님!
          </div>
        ) : (
          <div className="text-[1.25rem] font-bold text-[#252525]">{title}</div>
        )}
      </div>

      {/* 오른쪽: 알림 + 프로필 */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="relative w-6 h-6">
          <AdminBell />
        </div>
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt="프로필 사진"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <div className="text-xs text-gray-500">L</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default CommonTopBar;
