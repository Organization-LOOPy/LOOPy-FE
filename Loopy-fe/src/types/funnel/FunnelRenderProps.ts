import type { FunnelHistory } from "./FunnelHistory";

export interface FunnelRenderProps<TStep extends string, TContext> {
  step: TStep;
  context: TContext;
  history: FunnelHistory<TStep, TContext>;
}
