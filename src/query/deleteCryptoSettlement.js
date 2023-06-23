import { useMutation, useQueryClient } from "react-query";
import { deleteCryptoSettlement } from "../services/settlement";
import { toast } from "react-toastify";

export const useDeleteCryptoSettlement = (details) => {
  const queryClient = useQueryClient();
  return useMutation(
    "deleteCryptoSettlement",
    () => deleteCryptoSettlement(details),
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {
        toast.success("Deleted successfully");
        queryClient.invalidateQueries("getsettlement");
      },
    }
  );
};
