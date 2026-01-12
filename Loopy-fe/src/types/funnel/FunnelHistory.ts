export interface FunnelHistory<TStep extends string, TContext> {
  push: (step: TStep, ctx?: Partial<TContext>) => void;
  replace: (step: TStep, ctx: TContext) => void;
}
