import { useQuery } from "react-query";
import { getWalletBalance } from "../services/crypto";

export const useGetWalletBalance = (crypto) => {
  return useQuery(
    "getwalletbalance",
    () => getWalletBalance(crypto),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};
