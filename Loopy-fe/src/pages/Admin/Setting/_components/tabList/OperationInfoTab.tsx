import { useEffect, useState } from "react";
import CommonAdminButton from "../../../../../components/admin/button/CommonAdminButton";
import DaySelector from "./operation/DaySelector";
import TimeSection from "./operation/TimeSection";
import CafeKeywordSection from "./operation/CafeKeywordSection";
import CafeHashtagInput from "./operation/CafeHashtageInput";
import { useOwnerOperationForm } from "./operation/_logic/useOwnerOperationForm";

const OperationInfoTab = () => {
  const {
    selectedDays,
    setSelectedDays,
    hashtags,
    setHashtags,
    storeFilters,
    setStoreFilters,
    takeOutFilters,
    setTakeOutFilters,
    menuFilters,
    setMenuFilters,
    timeSectionValues,
    setTimeSectionValues,
    isLoading,
    isError,
    setIsFormValid,
    isFormValid,
    submitLabel,
    submit,
  } = useOwnerOperationForm();

  const [dayTouched, setDayTouched] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const isDayValid = selectedDays.length > 0;

  useEffect(() => {
    setIsFormValid(isDayValid);
  }, [isDayValid, setIsFormValid]);

  const handleSubmit = async () => {
    await submit();       
    setIsDirty(false);  
    setDayTouched(false); 
  };

  if (isLoading) {
    return (
      <div className="w-full h-[10rem] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#6970F3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-[#FDECEC] text-[#B00020] p-4">
        운영 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
      </div>
    );
  }

  return (
    <div>
      <div className="font-bold text-[1.25rem] mb-10">
        우리 매장의 운영정보를 입력해주세요
      </div>

      <div className="flex flex-col gap-12">
        <DaySelector
          selectedDays={selectedDays}
          setSelectedDays={(days) => {
            setDayTouched(true);
            setIsDirty(true);
            setSelectedDays(days);
          }}
          showError={dayTouched && !isDayValid}
        />

        <TimeSection
          values={timeSectionValues}
          setValues={(v) => {
            setIsDirty(true);
            setTimeSectionValues(v);
          }}
          selectedDays={selectedDays}
          setValid={setIsFormValid}
        />

        <CafeHashtagInput
          hashtags={hashtags}
          setHashtags={(v) => {
            setIsDirty(true);
            setHashtags(v);
          }}
        />

        <CafeKeywordSection
          storeFilters={storeFilters}
          setStoreFilters={(v) => {
            setIsDirty(true);
            setStoreFilters(v);
          }}
          takeOutFilters={takeOutFilters}
          setTakeOutFilters={(v) => {
            setIsDirty(true);
            setTakeOutFilters(v);
          }}
          menuFilters={menuFilters}
          setMenuFilters={(v) => {
            setIsDirty(true);
            setMenuFilters(v);
          }}
        />

        <CommonAdminButton
          label={submitLabel}
          disabled={!isFormValid || !isDayValid || !isDirty}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default OperationInfoTab;
