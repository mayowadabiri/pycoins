import { useQuery } from "react-query";
import { getTransactions } from "../services/crypto";

export const useGetTransactions = (page, pageSize) => {
  return useQuery(
    ["gettransactions", page],
    () => getTransactions(page, pageSize),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};
