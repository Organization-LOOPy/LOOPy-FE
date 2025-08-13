import { useMemo, useState } from "react";
import clsx from "clsx";
import CommonSideBar from "../../../../components/admin/sideBar/CommonSideBar";
import CommonTopBar from "../../../../components/admin/topBar/CommonTopBar";
import BasicInfoTab from "./tabList/BasicInfoTab";
import OperationInfoTab from "./tabList/OperationInfoTab";
import MenuRegisterTab from "./tabList/MenuRegisterTab";

interface Props {
  onBack: () => void;
}

type TabId = "basic" | "operation" | "menu";

const TAB_LIST: { id: TabId; label: string }[] = [
  { id: "basic",     label: "기본 정보" },
  { id: "operation", label: "운영 정보" },
  { id: "menu",      label: "메뉴 등록" },
];

const AdminEditProfile = ({ onBack }: Props) => {
  const [selectedTab, setSelectedTab] = useState<TabId>("basic");
  const [visited, setVisited] = useState<Set<TabId>>(new Set<TabId>(["basic"]));

  const handleSelect = (id: TabId) => {
    setSelectedTab(id);
    setVisited((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const buttonClasses = useMemo(
    () =>
      TAB_LIST.map((_, idx) => ({
        isFirst: idx === 0,
        isLast: idx === TAB_LIST.length - 1,
      })),
    []
  );

  return (
    <div className="w-full min-h-screen flex font-suit text-[#252525]">
      <CommonSideBar />

      <div className="flex-1 flex flex-col ml-[12.875rem]">
        <CommonTopBar title="매장 정보 수정" profileImageUrl="" onBack={onBack} />

        <div className="grid grid-cols-3 bg-[#F3F3F3] rounded-[8px] overflow-hidden max-w-[34rem]">
          {TAB_LIST.map((tab, i) => {
            const { isFirst, isLast } = buttonClasses[i];
            const isSelected = selectedTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelect(tab.id)}
                role="tab"
                aria-selected={isSelected}
                className={clsx(
                  "py-2 text-[1rem] font-semibold transition-all text-center outline-none",
                  !isFirst && "border-l-[0.5px] border-[#A8A8A8]/60",
                  isFirst && "rounded-l-[8px]",
                  isLast && "rounded-r-[8px]",
                  isSelected ? "text-white bg-[#6970F3]" : "text-[#7F7F7F]"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 max-w-[34rem]">
          <section
            role="tabpanel"
            aria-hidden={selectedTab !== "basic"}
            className={clsx(selectedTab === "basic" ? "block" : "hidden")}
          >
            <BasicInfoTab />
          </section>

          {visited.has("operation") && (
            <section
              role="tabpanel"
              aria-hidden={selectedTab !== "operation"}
              className={clsx(selectedTab === "operation" ? "block" : "hidden")}
            >
              <OperationInfoTab />
            </section>
          )}

          {visited.has("menu") && (
            <section
              role="tabpanel"
              aria-hidden={selectedTab !== "menu"}
              className={clsx(selectedTab === "menu" ? "block" : "hidden")}
            >
              <MenuRegisterTab />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEditProfile;
