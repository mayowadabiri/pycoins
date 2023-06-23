import { useQuery, useQueries } from "react-query";
import { getCryptos, userAcceptedWallet } from "../services/crypto";

export const useGetUserCryptos = () => {
  return useQueries([
    {
      queryKey: ["getusercrypto", 1],
      queryFn: () => getCryptos(),
      refetchOnWindowFocus: false,
      retry: false,
    },
    {
      queryKey: ["getusercrypto", 2],
      queryFn: () => userAcceptedWallet(),
      refetchOnWindowFocus: false,
      retry: false,
    },
  ]);
};

export const useGetCrypto = () => {
  return useQuery("getcryptos", () => getCryptos());
};

export const useGetUserWallets = () => {
  return useQuery("getuserwallets", () => userAcceptedWallet());
};
