interface Coupon {
  id: number;        
  name: string;
  description?: string;
  status: '발행 중' | '종료됨'; 
  usage: number;
  period: string;
  type: string;
}

interface CouponListProps {
  coupons: Coupon[];
  onEndIssue: (id: number) => void;
}

const CouponList = ({ coupons, onEndIssue }: CouponListProps) => (
  <table className="w-full text-center">
    <thead className="text-[0.875rem] font-semibold text-[#747474] uppercase border-b-[0.5px] border-[#DFDFDF]">
      <tr>
        <th className="py-4 text-left pl-[5rem]">쿠폰명</th>
        <th className="py-4">상태</th>
        <th className="py-4">사용 건수</th>
        <th className="py-4">사용 기한</th>
        <th className="py-4">유형</th>
        <th className="py-4"></th>   
      </tr>
    </thead>

    <tbody className="w-full text-[0.875rem] font-normal">
      {coupons.map((coupon) => {
        const isEnded = coupon.status === '종료됨';
        return (
          <tr key={coupon.id} className="border-b-[0.5px] border-[#DFDFDF]">
            <td className="py-6 text-left">
              <div className="font-semibold text-[1rem]">{coupon.name}</div>
              {coupon.description && (
                <div className="text-[#747474] mt-1">{coupon.description}</div>
              )}
            </td>

            <td className="py-6">
              <span
                className={`px-[1.406rem] py-[0.625rem] rounded-[8px] text-[0.875rem] ${
                  isEnded
                    ? 'bg-[#A8A8A81A] text-[#747474] border border-[#A8A8A8]'
                    : 'bg-[#00C2571A] text-[#00C257] border border-[#00C257]'
                }`}
              >
                {coupon.status}
              </span>
            </td>

            <td className="py-6">{coupon.usage}건</td>
            <td className="py-6">{coupon.period}</td>
            <td className="py-6">{coupon.type}</td>

            <td className="py-6">
              <button
                type="button"
                disabled={isEnded}
                onClick={() => onEndIssue(coupon.id)}
                className="block px-[1.406rem] py-[0.625rem] rounded-[8px] 
                          text-[0.875rem] font-semibold text-[#6970F3] 
                          bg-[#F0F1FE] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                발행 종료
              </button>
            </td>

          </tr>
        );
      })}
    </tbody>
  </table>
);

export default CouponList;
