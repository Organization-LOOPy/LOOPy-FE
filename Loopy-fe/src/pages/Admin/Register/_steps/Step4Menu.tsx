import { useMemo, useState, useEffect } from "react";
import BigAddButton from "../_components/BigAddButton";
import ModalMenuForm from "../_components/ModalMenuForm";
import MenuCard from "../../../User/Detail/_components/MenuCard";
import ArrowDownIcon from '/src/assets/images/ArrowDownPurple.svg?react';
import ArrowUpIcon from '/src/assets/images/ArrowUpPurple.svg?react';
import MinusIcon from '/src/assets/images/DeleteMenu.svg?react';
import CommonButton from "../../../../components/button/CommonButton"; 

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
  onNext?: () => void; 
}

export default function Step4Menu({ setValid, onNext }: Step4MenuProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [expanded, setExpanded] = useState(false);

  const [deleteMode, setDeleteMode] = useState(false);
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

  const handleMenuSubmit = (newMenu: Omit<MenuItem, 'id'>) => {
    const id = crypto.randomUUID?.() ?? `${Date.now()}_${Math.random()}`;
    setMenuList(prev => [...prev, { ...newMenu, id }]);
    setIsModalOpen(false);
  };

  const sortedMenus = useMemo(() => {
    return [...menuList].sort((a, b) => {
      if (a.isRepresentative && !b.isRepresentative) return -1;
      if (!a.isRepresentative && b.isRepresentative) return 1;
      return 0;
    });
  }, [menuList]);

  const visibleMenus = deleteMode
    ? sortedMenus
    : expanded
      ? sortedMenus
      : sortedMenus.slice(0, 4);

  const enterDeleteMode = () => {
    setDeleteMode(true);
    setExpanded(true);
    setDeletedStack([]);
  };

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

  const cancelDeleteMode = () => {
    setMenuList(prev => {
      const restored = [...prev];
      const sorted = [...deletedStack].sort((a, b) => a.index - b.index);
      for (const { menu, index } of sorted) {
        restored.splice(index, 0, menu);
      }
      return restored;
    });
    setDeletedStack([]);
    setDeleteMode(false);
  };

  const confirmDelete = () => {
    setDeletedStack([]);
    setDeleteMode(false);
  };

  const formatPrice = (numStr: string) =>
    numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div className="relative w-full bg-white font-suit min-h-screen flex flex-col">
      <div className="flex-1 pt-[2rem] pb-[8rem] max-w-[34rem] mx-auto flex flex-col">
        <h1 className="text-[1.25rem] font-bold text-[#252525] mb-[0.75rem]">
          메뉴를 등록해주세요
        </h1>

        <p className="text-[0.875rem] text-[#7F7F7F] leading-[100%] mb-[1.5rem]">
          메뉴는 최소 1개 이상 등록해야 하며, 최대 50개까지 등록 가능해요
        </p>

        <BigAddButton text="메뉴 추가하기" onClick={handleAddMenuClick} />

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

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full px-[1.5rem] pt-[1rem] pb-[2rem] max-w-[1024px] flex justify-center bg-white">
        <CommonButton
          text="다음으로 넘어가기"
          onClick={onNext}
          disabled={menuList.length === 0}
          className="w-full max-w-[34rem] bg-[#6970F3] text-white"
        />
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
