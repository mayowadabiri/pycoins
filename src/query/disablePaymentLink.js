import { useMutation, useQueryClient } from "react-query";
import { disablePaymentLink } from "../services/userPaymentLink";
import { toast } from "react-toastify";

export const useDisablePaymentLink = (id, history) => {
  const queryClient = useQueryClient();
  return useMutation("disablepaymentlink", () => disablePaymentLink(id), {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: () => {
      toast.success("Payment link has been disabled");

      queryClient.invalidateQueries("getuserpaymentlink");
    },
  });
};
