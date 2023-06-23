import { useMutation, useQueryClient } from "react-query";
import { enablePaymentLink } from "../services/userPaymentLink";
import { toast } from "react-toastify";

export const useEnablePaymentLink = (id) => {
  const queryClient = useQueryClient();
  return useMutation("disablepaymentlink", () => enablePaymentLink(id), {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: () => {
      toast.success("Payment link has been enabled");

      queryClient.invalidateQueries("getuserpaymentlink");
    },
  });
};
