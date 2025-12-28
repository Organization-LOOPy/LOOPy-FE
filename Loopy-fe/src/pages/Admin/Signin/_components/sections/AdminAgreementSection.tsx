import AgreementItem from "../../../../User/Signin/_components/AgreementItem";
import type { AgreementKey } from "../../../../../types/agreement";

interface Props {
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreelocation: boolean;
  onToggle: (key: "agreeTerms" | "agreePrivacy" | "agreelocation") => void;
  onOpenDetail: (key: AgreementKey) => void;
}

const AdminAgreementSection = ({
  agreeTerms,
  agreePrivacy,
  agreelocation,
  onToggle,
  onOpenDetail,
}: Props) => {
  return (
    <>
      <div className="h-[0.5px] w-full bg-[#DFDFDF] my-[0.5rem]" />

      <AgreementItem
        label="서비스 이용약관"
        checked={agreeTerms}
        onClick={() => onToggle("agreeTerms")}
        onArrowClick={() => onOpenDetail("terms")}
      />

      <AgreementItem
        label="개인정보 수집 및 이용 동의"
        checked={agreePrivacy}
        onClick={() => onToggle("agreePrivacy")}
        onArrowClick={() => onOpenDetail("privacy")}
      />

      <AgreementItem
        label="위치기반 서비스 이용약관 동의"
        checked={agreelocation}
        onClick={() => onToggle("agreelocation")}
        onArrowClick={() => onOpenDetail("location")}
      />
    </>
  );
};

export default AdminAgreementSection;
