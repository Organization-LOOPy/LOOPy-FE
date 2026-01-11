import BasicInfoFormView from "./basic/BasicInfoFormView";
import { useBasicInfoForm } from "../../../../../hooks/useBasicInfoForm/useBasicInfoForm";

const BasicInfoTab = () => {
  const data = useBasicInfoForm();

  if (!data.isReady || data.isLoading) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#6970F3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const {
    form,
    setField,
    commit,
    isSubmitting,
    maxPhotos,
    minPhotos,
    isDirty
  } = data;

  return (
    <BasicInfoFormView
      form={form}
      setField={setField}
      commit={commit}
      isSubmitting={isSubmitting}
      maxPhotos={maxPhotos}
      minPhotos={minPhotos}
      isDirty={isDirty}
    />
  );
};

export default BasicInfoTab;
