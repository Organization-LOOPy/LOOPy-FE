export type FunnelGuardResult =
  | true
  | false
  | { allow: boolean; reason?: string };

export type FunnelStepOption<TContext> = {
  guard?: (context: TContext) => FunnelGuardResult;
};

export type FunnelOptions<TStep extends string, TContext> = {
  id: string;
  initial: {
    step: TStep;
    context: TContext;
  };
  steps: {
    [K in TStep]?: FunnelStepOption<TContext>;
  };
};
