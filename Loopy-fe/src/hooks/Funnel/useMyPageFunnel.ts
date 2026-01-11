import { useCreateFunnel } from "./useCreateFunnel";
import type { MyPageStep, MyPageContext } from "../../types/mySteps";

export const useMyPageFunnel = () =>
  useCreateFunnel<MyPageStep, MyPageContext>({
    initialStep: "my",
    initialContext: {},
  });
