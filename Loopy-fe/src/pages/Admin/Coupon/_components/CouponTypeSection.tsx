import { useState } from "react";
import CheckCircle from "../../../User/Signin/_components/CheckCircle";
import { useCafeMenus } from "../../../../hooks/query/admin/coupon/useCafeMenus";
import ArrowDown from "../../../../assets/images/ArrowDown_Grey2.svg?react";
import LoadingSpinner from "../../../../components/loading/LoadingSpinner";

interface Props {
  value: "discount" | "size" | "freeDrink" | null;
  onChange: (value: "discount" | "size" | "freeDrink") => void;
  discountAmount: string;
  onChangeDiscountAmount: (amount: string) => void;
  selectedMenuId: number | null; 
  selectedMenuName: string | null;   
  onSelectMenu: (id: number, name: string) => void; 
}

const CouponTypeSection = ({
  value,
  onChange,
  discountAmount,
  onChangeDiscountAmount,
  selectedMenuId,
  selectedMenuName,
  onSelectMenu,
}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: menus = [], isLoading } = useCafeMenus();

  return (
    <section className="mb-6">
      <h3 className="font-bold text-[1.125rem] text-[#252525] mb-[1.5rem]">쿠폰 유형</h3>

      <div className="flex gap-6">
        {(["discount", "size", "freeDrink"] as const).map((type) => (
          <div
            key={type}
            className="flex items-center gap-[0.75rem] cursor-pointer"
            onClick={() => onChange(type)}
          >
            <CheckCircle checked={value === type} />
            <span
              className={`text-[0.875rem] font-normal ${
                value === type ? "text-[#6970F3]" : "text-[#252525]"
              }`}
            >
              {type === "discount" ? "금액 할인" : type === "size" ? "사이즈업" : "무료 음료"}
            </span>
          </div>
        ))}
      </div>

      {(value === "discount" || value === "size" || value === "freeDrink") && (
        <div className="relative mt-3">
          <div
            className="rounded-[8px] p-4 w-full bg-[#F3F3F3] flex justify-between items-center cursor-pointer"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <span className={selectedMenuId ? "text-[#252525]" : "text-[#999]"}>
              {selectedMenuName || "쿠폰을 적용할 메뉴를 선택해주세요"}
            </span>

            <ArrowDown className="w-[1.5rem] h-[0.625rem]"/>
          </div>

          {isDropdownOpen && (
            <div className="absolute mt-2 w-full bg-white font-normal text-[0.875rem] leading-[100%] shadow-md rounded-[0.25rem] max-h-[19rem] overflow-y-auto z-10">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                menus.map((menu) => (
                  <div
                    key={menu.id}
                    className="px-6 py-3 bg-[#F3F3F3] cursor-pointer text"
                    onClick={() => {
                      onSelectMenu(menu.id, menu.name); 
                      setIsDropdownOpen(false);
                    }}
                  >
                    {menu.name}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {value === "discount" && selectedMenuId !== null && (
        <div className="mt-3 font-normal text-[1rem] flex items-center gap-3">
          <input
            type="number"
            value={discountAmount}
            onChange={(e) => onChangeDiscountAmount(e.target.value)}
            placeholder="금액 입력"
            className="rounded-[8px] px-[1rem] py-[0.75rem] bg-[#F3F3F3] w-[6.25rem] focus:outline-none"
          />
          <span className="text-[#252525]">원 할인</span>
        </div>
      )}
    </section>
  );
};

export default CouponTypeSection;
