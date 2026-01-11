import type { ReactNode } from "react";
import type { FunnelHistory } from "./FunnelHistory";
import type { FunnelRenderProps } from "./FunnelRenderProps";

export interface FunnelInstance<TStep extends string, TContext> {
  step: TStep;
  context: TContext;
  history: FunnelHistory<TStep, TContext>;

  Render: (
    props: {
      [K in TStep]?: (
        args: FunnelRenderProps<TStep, TContext>
      ) => ReactNode;
    }
  ) => ReactNode | null;
}
