import { useQuery } from "react-query";
import { getPaymentLinks } from "../services/userPaymentLink";

export const useGetPaymentLinks = () => {
  return useQuery("getpaymentlinks", () => getPaymentLinks(), {
    refetchOnWindowFocus: false,
    retry: false,
  });
};
