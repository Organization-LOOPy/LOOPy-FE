import type { AgreementKey } from "../../../../types/agreement";

interface AgreementDetailViewProps {
  agreementKey: AgreementKey; 
}

const UserAgreementDetailView = ({ agreementKey }: AgreementDetailViewProps) => {
  switch (agreementKey) {
    case "terms":
      return (
        <div className="mt-[1.5rem] font-normal leading-relaxed">
          <h2 className="text-[1.125rem] font-bold mb-4">제1조 (목적)</h2>
          <p className="text-[0.875rem]">본 약관은 LOOPY(이하 “회사”)가 제공하는 포인트 적립, 쿠폰 발행·사용, 가맹점 주문 및 관련 제반 서비스(이하 “서비스”)의 이용과 관련하여 회사와 고객 간 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제2조 (정의)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">1. “고객”이란 회사의 앱·웹 등 플랫폼에 접속하여 본 약관에 동의하고 서비스를 이용하는 개인을 말합니다. <br />
            2. “파트너”란 회사와 계약하여 LOOPY 서비스를 통해 상품·서비스를 판매하거나 포인트·쿠폰을 제공하는 가맹점 운영자를 말합니다. <br />
            3. “포인트”란 파트너 매장에서 적립 및 사용할 수 있는 회사의 서비스 혜택 단위를 말합니다. <br />
            4. “쿠폰”이란 파트너 또는 회사가 발행하여 특정 조건 충족 시 혜택을 제공하는 수단입니다.
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제3조 (약관의 효력 및 변경)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">1. 본 약관은 서비스 초기 화면 또는 연결 화면에 게시하며, 동의한 시점부터 효력이 발생합니다. <br />
            2. 회사는 관련 법령에 따라 약관을 개정할 수 있으며, 개정 시 적용일 7일 전부터 사전 공지합니다. <br />
            3. 고객이 개정 약관에 동의하지 않는 경우 회원 탈퇴로 이용계약을 해지할 수 있습니다.
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제4조 (서비스 이용)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">1. 고객은 회원가입 또는 비회원 인증 절차를 거쳐 서비스를 이용할 수 있습니다. <br />
            2. 포인트·쿠폰의 적립 및 사용 조건은 파트너별 정책에 따릅니다. <br />
            3. 서비스는 1년 365일, 1일 24시간 제공함을 원칙으로 하나, 시스템 점검, 장애, 불가항력 사유가 있는 경우 일시 중단될 수 있습니다.
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제5조 (고객의 의무)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">1. 타인의 개인정보를 무단으로 이용하거나 도용하지 않아야 합니다. <br />
            2. 포인트·쿠폰을 부정한 방법으로 적립·사용해서는 안 됩니다. <br />
            3. 서비스의 정상 운영을 방해하는 행위를 해서는 안 됩니다.
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제6조 (포인트·쿠폰 관리)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">1. 포인트·쿠폰은 현금으로 환급되지 않습니다. <br />
            2. 유효기간이 경과하면 자동 소멸됩니다. <br />
            3. 탈퇴 시 미사용 포인트·쿠폰은 복구되지 않습니다.
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제7조 (회사의 면책)</h2>
          <p className="text-[0.875rem] mb-4">회사는 다음 사유로 인한 손해에 대해 책임지지 않습니다.</p>
          <p className="text-[0.875rem] text-[#8E9398]">1. 천재지변, 전쟁, 테러, 해킹, 서버 장애 등 불가항력 사유 <br />
            2. 파트너의 귀책 사유로 인한 서비스 장애 <br />
            3. 고객의 귀책 사유로 발생한 손해
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제8조 (계약 해지)</h2>
          <p className="text-[0.875rem] mb-8">고객은 언제든지 탈퇴를 요청할 수 있으며, 회사는 이를 1달의 휴면계정 기한을 둔 뒤 탈퇴 처리합니다. </p>
        </div>
      );
    case "privacy":
      return (
        <div className="mt-[1.5rem] font-normal leading-relaxed">
          <h2 className="text-[1.125rem] font-bold mb-4">제1조(개인정보의 수집 항목)</h2>
          <p className="text-[0.875rem] mb-4">회사는 서비스 제공을 위하여 다음과 같은 개인정보를 수집한다.</p>
          <p className="text-[0.875rem] text-[#8E9398]">
            1. 필수 항목: 이름, 휴대전화번호, 이메일 주소, 서비스 이용 기록(포인트 적립·사용 내역, 쿠폰 사용 내역), 기기 정보(IP 주소, OS 정보, 앱 버전 등)
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제2조(개인정보의 수집 및 이용 목적)</h2>
          <p className="text-[0.875rem] mb-4">회사는 수집한 개인정보를 다음의 목적을 위하여 이용한다.</p>
          <p className="text-[0.875rem] text-[#8E9398]">1. 서비스 제공 및 회원 관리 (포인트 적립, 쿠폰 발행·사용, 주문 및 결제 등) <br />
            2. 본인 확인 및 인증 <br />
            3. 고객 문의 및 불만 처리 <br />
            4. 맞춤형 마케팅 및 프로모션 제공(선택 항목에 한함)
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제3조(개인정보의 보유 및 이용 기간)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">1. 회원 탈퇴 시까지 개인정보를 보유하며, 탈퇴 후에는 지체 없이 해당 개인정보를 파기한다. <br />
            2. 다만, 관련 법령에 따라 일정 기간 보존이 필요한 경우에는 그 기간 동안 개인정보를 보관한다.
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제4조(정보주체의 권리 및 행사 방법)</h2>
          <p className="text-[0.875rem]">정보주체는 언제든지 개인정보 열람, 정정, 삭제, 처리 정지 및 수집·이용 동의 철회를 요구할 수 있으며, 회사는 지체 없이 처리한다. 만 14세 미만 아동의 경우 법정대리인이 이를 대리할 수 있다.</p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제5조(동의를 거부할 권리 및 불이익)</h2>
          <p className="text-[0.875rem] mb-8">정보주체는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 필수 항목에 대한 동의를 거부할 경우 서비스 이용이 제한될 수 있다. 선택 항목 미동의 시 마케팅 정보 및 이벤트 참여에 제한이 있을 수 있다.</p>
        </div>
      );
    case "location":
      return (
        <div className="mt-[1.5rem] font-normal leading-relaxed">
          <h2 className="text-[1.125rem] font-bold mb-4">제1조(목적)</h2>
          <p className="text-[0.875rem]">본 약관은 LOOPY(이하 “회사”)가 제공하는 위치 기반 서비스 이용과 관련하여 회사와 이용자 간 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제2조(위치 정보의 수집 및 이용 목적)</h2>
          <p className="text-[0.875rem] mb-4">회사는 이용자의 위치 정보를 다음과 같은 목적으로 수집·이용합니다.</p>
          <p className="text-[0.875rem] text-[#8E9398]">1. 주변 매장 및 프로모션 정보 제공 <br />
            2. 위치 기반 쿠폰 및 이벤트 서비스 제공 <br />
            3. 서비스 품질 개선 및 맞춤형 서비스 제공 <br />
            4. 부정 이용 방지 및 서비스 안전성 확보
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제3조(위치 정보의 수집 방법 및 범위)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">1. 회사는 모바일 기기, 앱, 웹 등을 통해 GPS, Wi-Fi, 셀룰러 기지국 등에서 위치 정보를 수집합니다. <br />
            2. 수집되는 위치 정보는 실시간 위치 및 위치 이력 정보를 포함합니다.
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제4조(위치 정보의 보유 및 이용 기간)</h2>
          <p className="text-[0.875rem] text-[#8E9398]">1. 위치 정보는 서비스 제공 목적 달성 시까지 보유하며, 목적 달성 후 즉시 파기합니다. <br />
            2. 다만, 법령에 따른 보존 의무가 있을 경우 해당 기간 동안 보관할 수 있습니다.
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제5조(정보주체 권리 및 행사 방법)</h2>
          <p className="text-[0.875rem]">회사는 이용자의 위치 정보를 다음과 같은 목적으로 수집·이용합니다.
            이용자는 위치 정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의 거부 시 위치 기반 서비스 이용에 제한이 있을 수 있습니다. <br />
            동의 철회 및 위치 정보 삭제 요청은 서비스 내 설정 또는 고객센터를 통해 할 수 있습니다.
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제6조(위치 정보 제3자 제공)</h2>
          <p className="text-[0.875rem]">회사는 이용자의 위치 정보를 제3자에게 제공하지 않으며, 다만 법령에 따라 요청 시 제공할 수 있습니다.</p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제7조(책임 및 면책)</h2>
          <p className="text-[0.875rem] mb-8">회사는 위치 정보의 정확성, 실시간성, 완전성에 대해 최선을 다하지만, 통신 장애, 기기 오류 등 불가항력적인 사유에 대해 책임을 지지 않습니다.</p>
        </div>
      );
    case "marketing":
      return (
        <div className="mt-[1.5rem] font-normal leading-relaxed">
          <h2 className="text-[1.125rem] font-bold mb-4">제1조(개인정보 수집 항목)</h2>
          <p className="text-[0.875rem] mb-4">회사는 마케팅 및 광고, 이벤트 안내를 위하여 아래 개인정보를 수집·이용합니다.</p>
          <p className="text-[0.875rem] text-[#8E9398]">
            • 휴대전화번호, 이메일 주소, 서비스 이용 기록, 관심 분야, 접속 빈도 등
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제2조(수집 및 이용 목적)</h2>
          <p className="text-[0.875rem] mb-4">수집한 개인정보는 다음 목적에 사용됩니다.</p>
          <p className="text-[0.875rem] text-[#8E9398]">1. 맞춤형 마케팅 정보 제공 <br />
            2. 이벤트, 프로모션, 광고성 정보 안내 <br />
            3. 신규 서비스 및 혜택 안내
          </p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제3조(보유 및 이용 기간)</h2>
          <p className="text-[0.875rem]">마케팅 정보 활용 동의 철회 시 즉시 해당 정보의 이용을 중지하며, 관련 정보는 지체 없이 파기합니다.</p>
          <h2 className="text-[1.125rem] font-bold mt-10 mb-4">제4조(동의 거부 권리 및 불이익 안내)</h2>
          <p className="text-[0.875rem] mb-8">마케팅 정보 활용에 대한 동의는 선택 사항이며, 동의하지 않아도 서비스 이용에 제한은 없습니다. 다만, 마케팅 혜택 및 이벤트 참여가 제한될 수 있습니다.</p>
        </div>
      );
    default:
      return null;
  }
};

export default UserAgreementDetailView;
