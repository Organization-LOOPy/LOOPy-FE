import { useMemo, useState, useEffect } from "react";
import BigAddButton from "../_components/BigAddButton";
import ModalMenuForm from "../_components/ModalMenuForm";
import MenuCard from "../../../User/Detail/_components/MenuCard";
import ArrowDownIcon from '/src/assets/images/ArrowDownPurple.svg?react';
import ArrowUpIcon from '/src/assets/images/ArrowUpPurple.svg?react';
import MinusIcon from '/src/assets/images/DeleteMenu.svg?react';

interface MenuItem {
  id: string;
  imageUrl?: string;
  name: string;
  description: string;
  price: string; 
  isRepresentative?: boolean;
}

interface Step4MenuProps {
  setValid?: (v: boolean) => void;
}

export default function Step4Menu({ setValid }: Step4MenuProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [expanded, setExpanded] = useState(false);

  // 삭제 모드
  const [deleteMode, setDeleteMode] = useState(false);
  // 삭제 취소 복구를 위해 원래 index까지 저장
  const [deletedStack, setDeletedStack] = useState<{ menu: MenuItem; index: number }[]>([]);

  const repCount = useMemo(
    () => menuList.filter(m => m.isRepresentative).length,
    [menuList]
  );

  useEffect(() => {
    setValid?.(menuList.length > 0);
  }, [menuList.length, setValid]);
  const handleAddMenuClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // ModalMenuForm은 id가 없음 → 여기서 생성
  const handleMenuSubmit = (newMenu: Omit<MenuItem, 'id'>) => {
    const id = crypto.randomUUID?.() ?? `${Date.now()}_${Math.random()}`;
    setMenuList(prev => [...prev, { ...newMenu, id }]);
    setIsModalOpen(false);
  };

  // 대표메뉴 상단 정렬
  const sortedMenus = useMemo(() => {
    return [...menuList].sort((a, b) => {
      if (a.isRepresentative && !b.isRepresentative) return -1;
      if (!a.isRepresentative && b.isRepresentative) return 1;
      return 0;
    });
  }, [menuList]);

  // 삭제 모드면 무조건 전체 표시
  const visibleMenus = deleteMode
    ? sortedMenus
    : expanded
      ? sortedMenus
      : sortedMenus.slice(0, 4);

  // 삭제 모드 진입/취소/확정
  const enterDeleteMode = () => {
    setDeleteMode(true);
    setExpanded(true);         // 강제 펼침
    setDeletedStack([]);       // 삭제 기록 초기화
  };

  // 즉시 삭제: UI에서 바로 제거 + 원래 인덱스와 함께 스택 저장
  const handleDeleteMenu = (menu: MenuItem) => {
    setMenuList(prev => {
      const idx = prev.findIndex(m => m.id === menu.id);
      if (idx === -1) return prev;
      setDeletedStack(stack => [...stack, { menu, index: idx }]);
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
  };

  // 취소 → 삭제했던 메뉴를 원래 자리로 복구
  const cancelDeleteMode = () => {
    setMenuList(prev => {
      const restored = [...prev];
      // 원래 인덱스 순서대로 삽입
      const sorted = [...deletedStack].sort((a, b) => a.index - b.index);
      for (const { menu, index } of sorted) {
        restored.splice(index, 0, menu);
      }
      return restored;
    });
    setDeletedStack([]);
    setDeleteMode(false);
  };

  // 확인 → 삭제 확정
  const confirmDelete = () => {
    setDeletedStack([]);
    setDeleteMode(false);
  };

  const formatPrice = (numStr: string) =>
    numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div className="relative w-full bg-white px-[1.5rem] pt-[2rem] pb-[8rem] font-suit gap-[2rem]">
      <div className="max-w-[34rem] mx-auto flex flex-col">
        {/* 제목 */}
        <h1 className="text-[1.25rem] font-bold text-[#252525] mb-[0.75rem]">
          메뉴를 등록해주세요
        </h1>

        {/* 설명 */}
        <p className="text-[0.875rem] text-[#7F7F7F] leading-[100%] mb-[1.5rem]">
          메뉴는 최소 1개 이상 등록해야 하며, 최대 50개까지 등록 가능해요
        </p>

        {/* 메뉴 추가 버튼 */}
        <BigAddButton text="메뉴 추가하기" onClick={handleAddMenuClick} />

        {/* 총 개수 + 우측 선택/취소/확인 */}
        {menuList.length > 0 && (
          <div className="mt-[1.5rem] flex items-center justify-between">
            <div className="text-[0.875rem] font-semibold leading-[100%]">
              <span className="text-black">총&nbsp;</span>
              <span className="text-[#6970F3]">{menuList.length}</span>
              <span className="text-black">&nbsp;개</span>
            </div>

            {!deleteMode ? (
              <button
                onClick={enterDeleteMode}
                className="h-[2rem] px-[0.875rem] rounded-[0.5rem] text-[0.875rem] font-semibold leading-[100%]
                           border border-[#A8A8A8] text-[#3B3B3B] bg-white"
              >
                선택
              </button>
            ) : (
              <div className="flex items-center gap-[0.5rem]">
                <button
                  onClick={cancelDeleteMode}
                  className="h-[2rem] px-[0.875rem] rounded-[0.5rem] text-[0.875rem] font-semibold leading-[100%]
                             border border-[#A8A8A8] text-[#3B3B3B] bg-white"
                >
                  취소
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deletedStack.length === 0}
                  className={`h-[2rem] px-[0.875rem] rounded-[0.5rem] text-[0.875rem] font-semibold leading-[100%]
                    ${deletedStack.length === 0
                      ? 'bg-[#DFDFDF] text-[#7F7F7F] cursor-not-allowed'
                      : 'bg-[#6970F3] text-white'}`}
                >
                  확인
                </button>
              </div>
            )}
          </div>
        )}

        {/* 메뉴 카드 목록 (삭제 버튼 공간 64px 확보) */}
        <div className="mt-[0.75rem] flex flex-col gap-[1.5rem]">
          {visibleMenus.map(menu => (
            <div key={menu.id} className={`relative ${deleteMode ? 'pr-[4rem]' : ''}`}>
              <MenuCard
                imageUrl={menu.imageUrl ?? ''}
                name={menu.name}
                description={menu.description}
                price={`${formatPrice(menu.price)}`}
                isRepresentative={menu.isRepresentative}
              />

              {deleteMode && (
                <button
                  onClick={() => handleDeleteMenu(menu)}
                  className="absolute top-1/2 -translate-y-1/2 right-0
                             w-[2rem] h-[2rem] rounded-full flex items-center justify-center"
                  aria-label="메뉴 삭제"
                  title="메뉴 삭제"
                >
                  <MinusIcon className="w-[2rem] h-[2rem]" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* 펼치기/접기: 삭제 모드에서는 숨김(강제 펼침) */}
        {menuList.length > 4 && !deleteMode && (
          <button
            className="
              mt-[1rem] w-full h-[3.125rem] px-[5.3125rem] py-[1.0625rem]
              flex items-center justify-center gap-[0.625rem]
              text-[#6970F3] text-[1rem] font-semibold leading-[100%]
              border border-[#6970F3] rounded-[0.5rem] bg-white"
            onClick={() => setExpanded(prev => !prev)}
          >
            {expanded ? (
              <ArrowUpIcon className="w-[0.875rem] h-[0.875rem]" />
            ) : (
              <ArrowDownIcon className="w-[0.875rem] h-[0.875rem]" />
            )}
            {expanded ? '등록된 메뉴 접기' : '등록된 메뉴 펼치기'}
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <ModalMenuForm
            onClose={handleCloseModal}
            onSubmit={(menu) => handleMenuSubmit(menu as Omit<MenuItem, 'id'>)}
            disableRepresentative={repCount >= 2}
          />
        </div>
      )}
    </div>
  );
}
