import { useQuery } from "@tanstack/react-query";
import { fetchCurrentPoint, fetchPointTransactions } from "../../../apis/my/api";

export const useCurrentPointQuery = () =>
  useQuery({
    queryKey: ["myPoint", "current"],
    queryFn: fetchCurrentPoint,
  });

export const usePointTransactionsQuery = () =>
  useQuery({
    queryKey: ["myPoint", "transactions"],
    queryFn: fetchPointTransactions,
  });
