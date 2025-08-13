import { useEffect, useMemo } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import CommonSideBar from '../../../components/admin/sideBar/CommonSideBar';
import AdminCouponListPage from './_components/AdminCouponListPage';
import AdminCouponCreatePage from './_components/AdminCreateCouponPage';
import { useAdminCafe } from '../../../contexts/AdminContext';

const AdminCouponPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get('step') || 'list';

  const { cafeId } = useParams<{ cafeId?: string }>();
  const { activeCafeId } = useAdminCafe();

  const cafeIdNum = useMemo(() => {
    const n = Number(cafeId);
    if (Number.isFinite(n) && n > 0) return n;
    if (typeof activeCafeId === 'number' && activeCafeId > 0) return activeCafeId;
    return 1;
  }, [cafeId, activeCafeId]);

  useEffect(() => {
    const invalid = !cafeId || Number.isNaN(Number(cafeId)) || Number(cafeId) <= 0;
    if (invalid) {
      const q = searchParams.toString();
      navigate(`/admin/coupon/${cafeIdNum}${q ? `?${q}` : ''}`, { replace: true });
    }
  }, [cafeId, cafeIdNum, searchParams, navigate]);

  const goStep = (next: 'list' | 'create') => {
    const curr = new URLSearchParams(searchParams);
    curr.set('step', next);
    setSearchParams(curr, { replace: true });
  };

  return (
    <div className="w-full min-h-screen flex font-suit text-[#252525]">
      <CommonSideBar />
      <div className="flex-1 flex flex-col ml-[12.875rem]">
        <main className="flex-1 overflow-y-auto">
          {step === 'list' && (
            <AdminCouponListPage
              cafeId={cafeIdNum}
              onAdd={() => goStep('create')}
            />
          )}
          {step === 'create' && (
            <AdminCouponCreatePage
              cafeId={cafeIdNum}
              onBack={() => goStep('list')}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminCouponPage;
