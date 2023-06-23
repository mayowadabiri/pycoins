import { useQuery, useQueryClient } from "react-query";
import { getStaticAddress } from "../services/crypto";

export const useGetStaticAddress = (crypto) => {
  const client = useQueryClient();
  return useQuery("getstaticaddress", () => getStaticAddress(crypto), {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: () => {
      client.invalidateQueries("getwallets");
    },
  });
};
