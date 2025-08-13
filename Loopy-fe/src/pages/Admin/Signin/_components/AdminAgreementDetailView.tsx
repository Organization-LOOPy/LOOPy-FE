import type { AgreementKey } from "../../../../types/agreement";

interface AgreementDetailViewProps {
  agreementKey: AgreementKey; 
}

const AdminAgreementDetailView = ({ agreementKey }: AgreementDetailViewProps) => {
  switch (agreementKey) {
    case "terms":
      return (
        <div className="mt-[1.5rem] font-normal leading-relaxed">
          <h2 className="text-[1.125rem] font-bold mb-4">제1조 (목적)</h2>
          <p className="text-[0.875rem]">
            본 약관은 “LOOPY”(이하 “회사”)가 제공하는 LOOPY 서비스(이하 “서비스”)의 파트너 이용과 관련하여,
            회사와 파트너 간의 권리·의무·책임사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제2조 (정의)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">
            1. “파트너”란, 회사와 서비스 이용계약을 체결하고 LOOPY 기능(쿠폰 발행, 포인트·스탬프 적립, 챌린지 인증, 메시지 전송 등)을 통해 고객에게 혜택을 제공하는 매장 운영자를 의미합니다.<br />
            2. “고객”이란 LOOPY를 통해 혜택을 받거나 서비스를 이용하는 개인을 말합니다.<br />
            3. “서비스 이용계약”이란, LOOPY 신청서 및 본 약관을 포함한 계약을 말합니다.
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제3조 (약관의 명시 및 개정)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">
            1. 회사는 약관 내용, 대표자, 연락처, 개인정보관리책임자 등을 파트너가 쉽게 확인할 수 있는 화면에 게시합니다.<br />
            2. 관련 법령에 따라 본 약관을 개정할 수 있으며, 개정 시 적용일 및 사유를 사전 공지합니다.
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제4조 (파트너의 의무)</h2>
          <p className="text-[0.875rem] mb-4">
            파트너는 다음 각 호의 행위를 하지 않아야 합니다.
          </p>
          <p className="text-[0.875rem] text-[#8E9398]">
            1. 허위 거래나 부정한 방식의 쿠폰·포인트 제공<br />
            2. 고객 정보의 목적 외 사용 또는 개인정보법 위반<br />
            3. 시스템 무단 변경, 리버스 엔지니어링 등 기능 오용<br />
            4. 스탬프·챌린지 인증 조작, 부정 이용<br />
            5. 알림 설정한 고객에게만 메시지 전송, 무차별 광고성 정보 발송 금지<br />
            6. 전기통신사업법·카카오톡 정책 준수, 발신자 번호 사전 등록<br />
            7. 장애 발생 시 즉시 통보 및 복구 요청<br />
            8. 계정 공유 금지, 비밀번호 유출 시 즉시 회사에 통보
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제5조 (메시지 전송 서비스)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">
            1. 파트너는 알림 친구톡, SMS 등 메시지 전송 기능을 고객의 알림 설정에 따라 사용할 수 있습니다.<br />
            2. 메시지 기능 사용 시 별도 비용이 부과될 수 있으며, 회사가 사전에 공지한 방식으로 지급해야 합니다.<br />
            3. 메시지 방식 및 내용은 회사의 가이드라인을 준수해야 하며, 회사는 기술 사양 변경 시 사전 공지합니다.
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제6조 (서비스 제공 및 운영의무)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">
            1. 회사는 서비스 안정 운영 및 보안 시스템을 제공합니다.<br />
            2. 파트너는 고객에게 쿠폰·포인트·스탬프·챌린지 인증 등 기능을 이용 가능하도록 제공하며,
            해당 비용 및 운영은 파트너 책임 하에 이루어져야 합니다.
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제7조 (정산 및 수수료)</h2>
          <p className="text-[0.875rem]">
            정산 주기 및 수수료, 지급 방식은 별도 계약 또는 정책에 따라 정합니다. 이의 제기는 지급일로부터 7일 이내 가능해야 합니다.
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제8조 (면책 및 서비스 중단)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">
            1. 천재지변, 통신 장애, 시스템 오류 등 불가항력 상황에서는 회사의 책임이 제한됩니다.<br />
            2. 파트너가 약관 위반 시 메시지 서비스 이용 제한, 계약 해제 등의 조치를 할 수 있으며,
            회사는 이로 발생한 파트너 손해에 대해 책임지지 않습니다.
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제9조 (계약 해지)</h2>
          <p className="text-[0.875rem] mb-8">
            1. 파트너는 해지 의사가 있을 경우 서면 또는 전자 방식으로 요청할 수 있습니다.<br />
            2. 메시지 기능은 자동 해지될 수 있으며, 정산 대금은 계약에 따라 지급됩니다.
          </p>
        </div>
      );

    case "privacy":
      return (
        <div className="mt-[1.5rem] font-normal leading-relaxed">
          <h2 className="text-[1.125rem] font-bold mb-4">제1조(개인정보의 수집 항목)</h2>
          <p className="text-[0.875rem] mb-4">회사는 파트너 관리 및 서비스 제공을 위해 다음의 개인정보를 수집한다.</p>
          <p className="text-[0.875rem] text-[#8E9398]">
            1. 필수 항목: 사업자명(대표자명), 사업자등록번호, 매장 주소, 연락처(휴대전화번호, 이메일)
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제2조(개인정보의 수집 및 이용 목적)</h2>
          <p className="text-[0.875rem] mb-4">회사는 수집한 개인정보를 다음의 목적으로 이용한다.</p>
          <p className="text-[0.875rem] text-[#8E9398]">
            1. 서비스 계약 체결 및 운영 (쿠폰 발행, 포인트 관리, 스탬프 적립, 챌린지 인증, 메시지 전송 등) <br />
            2. 정산 및 세금계산서 발행 <br />
            3. 파트너 지원 및 고객 응대
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제3조(개인정보의 보유 및 이용 기간)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">
            1. 계약 종료 및 정산 완료 시 개인정보를 지체 없이 파기한다. <br />
            2. 다만, 관련 법령에 따른 보존 의무가 있는 경우에는 그 기간 동안 개인정보를 보유한다.
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제4조(정보주체의 권리 및 행사 방법)</h2>
          <p className="text-[0.875rem]">
            파트너는 개인정보 열람, 정정, 삭제, 처리 정지 및 수집·이용 동의 철회를 요구할 수 있으며, 회사는 지체 없이 이를 처리한다.
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제5조(동의를 거부할 권리 및 불이익)</h2>
          <p className="text-[0.875rem] mb-8">
            파트너는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 필수 항목에 동의하지 않을 경우 파트너 등록 및 서비스 이용이 제한될 수 있다.
            선택 항목 미동의 시 마케팅 및 이벤트 혜택 제공에 제한이 있을 수 있다.
          </p>
        </div>
      );

    case "location":
      return (
        <div className="mt-[1.5rem] font-normal leading-relaxed">
          <h2 className="text-[1.125rem] font-bold mb-4">제1조(목적)</h2>
          <p className="text-[0.875rem]">
            본 동의서는 LOOPY(이하 “회사”)가 파트너의 매장 주소 등록 및 위치 정보 수집·이용과 관련하여 개인정보 보호법 등 관련 법령에 따라 파트너로부터 동의를 얻기 위해 작성되었습니다.
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제2조(수집하는 개인정보 항목)</h2>
          <p className="text-[0.875rem] mb-4">
            회사는 매장 주소 등록 과정에서 다음의 개인정보를 수집합니다.
          </p>
          <p className="text-[0.875rem] text-[#8E9398]">
            • 매장 주소(도로명, 지번, 상세주소 등) <br />
            • 위치 정보(주소 검색 시 활용되는 GPS, 위도·경도 등)
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제3조(개인정보 수집 및 이용 목적)</h2>
          <p className="text-[0.875rem] mb-4">
            수집된 개인정보는 다음과 같은 목적으로 이용됩니다.
          </p>
          <p className="text-[0.875rem] text-[#8E9398]">
            1. 매장 위치의 정확한 등록 및 서비스 제공 <br />
            2. 위치 기반 서비스 제공 및 매장 검색 기능 지원 <br />
            3. 파트너 관리 및 정산 등 운영 목적
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제4조(개인정보 보유 및 이용 기간)</h2>
          <p className="text-[0.875rem]">
            수집된 개인정보는 매장 등록 및 서비스 제공 기간 동안 보유하며, 서비스 종료 또는 매장 정보 삭제 시 즉시 파기합니다.
            단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보유합니다.
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제5조(정보주체 권리 및 행사 방법)</h2>
          <p className="text-[0.875rem]">
            파트너는 언제든지 자신의 매장 주소 및 위치 정보에 대해 열람, 수정, 삭제를 요구할 수 있으며, 회사는 지체 없이 처리합니다.
          </p>

          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제6조(동의 거부 권리 및 불이익 안내)</h2>
          <p className="text-[0.875rem] mb-8">
            파트너는 본 개인정보 수집·이용에 동의를 거부할 권리가 있으며, 동의 거부 시 매장 주소 등록 및 서비스 이용에 제한이 있을 수 있습니다.
          </p>
        </div>
      );

    case "marketing":
      return null;

    default:
      return null;
  }
};

export default AdminAgreementDetailView;
