import { useQuery } from "react-query";
import { getUserPaymentLink } from "../services/userPaymentLink";

export const useGetUserPaymentLink = (id) => {
  return useQuery("getuserpaymentlink", () => getUserPaymentLink(id), {
    refetchOnWindowFocus: false,
    retry: false,
  });
};
