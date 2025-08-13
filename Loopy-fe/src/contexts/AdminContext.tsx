import { createContext, useContext, useEffect, useState } from "react";

type AdminCafeCtx = {
  activeCafeId?: number;
  setActiveCafeId: (id?: number) => void;
  loading: boolean;
};

const AdminCafeContext = createContext<AdminCafeCtx | null>(null);

export const AdminCafeProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeCafeId, setActiveCafeId] = useState<number | undefined>(() => {
    const saved = localStorage.getItem("activeCafeId");
    return saved ? Number(saved) : undefined;
  });
  const [loading] = useState(false);

  useEffect(() => {
    if (activeCafeId) localStorage.setItem("activeCafeId", String(activeCafeId));
  }, [activeCafeId]);

  return (
    <AdminCafeContext.Provider value={{ activeCafeId, setActiveCafeId, loading }}>
      {children}
    </AdminCafeContext.Provider>
  );
};

export const useAdminCafe = () => {
  const ctx = useContext(AdminCafeContext);
  if (!ctx) throw new Error("useAdminCafe는 AdminCafeProvider 내부에서 사용해야 합니다.");
  return ctx;
};
