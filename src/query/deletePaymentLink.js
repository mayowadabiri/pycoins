import { useMutation, useQueryClient } from "react-query";
import { deletePaymentLink } from "../services/userPaymentLink";
import { toast } from "react-toastify";

export const useDeletePaymentLink = (id, history) => {
  const queryClient = useQueryClient();
  return useMutation("getpaymentlinksinfo", () => deletePaymentLink(id), {
    refetchOnWindowFocus: false,
    retry: 3,
    onSuccess: () => {
      toast.success("Payment link has been deleted");
      queryClient.invalidateQueries("getpaymentlinks");

      history.push("/payment/pay");
    },
  });
};
