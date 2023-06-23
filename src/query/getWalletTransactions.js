import { useQuery } from "react-query";
import { getWalletTransactions } from "../services/crypto";

export const useGetWalletTransactions = (crypto) => {
  return useQuery(
    "getwallettransactions",
    () => getWalletTransactions(crypto),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};
