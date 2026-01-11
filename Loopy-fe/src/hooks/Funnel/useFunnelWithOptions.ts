import { useRef } from "react";
import { useCreateFunnel } from "./useCreateFunnel";
import type { FunnelOptions } from "../../types/funnel/FunnelOptions";

export function useFunnelWithOptions<TStep extends string, TContext>(
  options: FunnelOptions<TStep, TContext>
) {
  const initialStepRef = useRef<TStep>(options.initial.step);
  const initialContextRef = useRef<TContext>(options.initial.context);

  const funnel = useCreateFunnel<TStep, TContext>({
    initialStep: initialStepRef.current,
    initialContext: initialContextRef.current,
  });

  const checkGuard = (step: TStep, ctx: TContext): boolean => {
    const guard = options.steps[step]?.guard;
    if (!guard) return true;

    const result = guard(ctx);
    if (result === true) return true;
    if (result === false) return false;
    if (typeof result === "object") return result.allow;

    return true;
  };

  return {
    ...funnel,
    history: {
      push: (step: TStep, patch?: Partial<TContext>) => {
        const nextContext = patch
          ? { ...funnel.context, ...patch }
          : funnel.context;

        if (!checkGuard(step, nextContext)) return;
        funnel.history.push(step, patch);
      },

      replace: (step: TStep, ctx: TContext) => {
        if (!checkGuard(step, ctx)) return;
        funnel.history.replace(step, ctx);
      },
    },
  };
}
