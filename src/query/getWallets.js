import { useQuery } from "react-query";
import { getWallets } from "../services/crypto";

export const useGetWallets = () => {
  return useQuery("getwallets", () => getWallets(), {
    refetchOnWindowFocus: false,
    retyr: false,
  });
};
