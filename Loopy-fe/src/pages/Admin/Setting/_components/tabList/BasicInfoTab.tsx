import BasicInfoFormView from "./basic/BasicInfoFormView";
import { useBasicInfoForm } from "../../../../../hooks/useBasicInfoForm";

const BasicInfoTab = () => {
  const {
    form,
    setField,
    commit,
    isValid,
    isLoading,
    isSubmitting,
    maxPhotos,
    minPhotos,
  } = useBasicInfoForm(); 

  if (isLoading) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#6970F3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <BasicInfoFormView
      form={form}
      setField={setField}
      commit={commit}
      isValid={isValid}
      isSubmitting={isSubmitting}
      maxPhotos={maxPhotos}
      minPhotos={minPhotos}
    />
  );
};

export default BasicInfoTab;
