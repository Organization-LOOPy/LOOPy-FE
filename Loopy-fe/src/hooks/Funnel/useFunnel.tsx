import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

export const useFunnel = <T extends string>(
  initial: T,
  queryKey: string = "step"
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState<T>((searchParams.get(queryKey) as T) ?? initial);

  useEffect(() => {
    const current = searchParams.get(queryKey) as T;
    if (current) setStep(current);
    else setStep(initial);
  }, [searchParams, queryKey, initial]);

  const go = useCallback(
    (next: T) => {
      setSearchParams({ [queryKey]: next });
    },
    [setSearchParams, queryKey]
  );

  const back = useCallback(
    (fallback: T) => {
      return () => setSearchParams({ [queryKey]: fallback });
    },
    [setSearchParams, queryKey]
  );

  return { step, go, back };
};
