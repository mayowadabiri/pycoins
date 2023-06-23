import { useQuery } from "react-query";
import { getPaymentLinkTransactions } from "../services/userPaymentLink";

export const useGetPaymentTransactions = (id) => {
  return useQuery(
    "getpaymentlinkstransactions",
    () => getPaymentLinkTransactions(id),
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
};
