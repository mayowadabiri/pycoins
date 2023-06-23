import { useQuery } from "react-query";
import { getRates } from "../services/userPaymentLink";

export const useGetRates = () => {
  return useQuery("getrates", () => getRates(), {
    refetchOnWindowFocus: false,
    retry: false,
  });
};
