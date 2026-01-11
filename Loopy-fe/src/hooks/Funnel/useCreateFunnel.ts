import { useCallback, useMemo, useState } from "react";
import type { FunnelInstance } from "../../types/funnel/FunnelInstance";

export function useCreateFunnel<TStep extends string, TContext>(params: {
  initialStep: TStep;
  initialContext: TContext;
}): FunnelInstance<TStep, TContext> {
  const { initialStep, initialContext } = params;

  const [step, setStep] = useState<TStep>(initialStep);
  const [context, setContext] = useState<TContext>(initialContext);

  const push = useCallback(
    (nextStep: TStep, ctx?: Partial<TContext>) => {
      setStep(nextStep);
      if (ctx) {
        setContext((prev) => ({ ...prev, ...ctx }));
      }
    },
    []
  );

  const replace = useCallback((nextStep: TStep, ctx: TContext) => {
    setStep(nextStep);
    setContext(ctx);
  }, []);

  const history = useMemo(
    () => ({ push, replace }),
    [push, replace]
  );

  const Render: FunnelInstance<TStep, TContext>["Render"] = (map) => {
    const renderFn = map[step];
    if (!renderFn) return null;

    return renderFn({
      step,
      context,
      history,
    });
  };

  return {
    step,
    context,
    history,
    Render,
  };
}
