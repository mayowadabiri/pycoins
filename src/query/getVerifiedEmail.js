import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { verifyUser } from "../services/auth";

export const useVerifyEmail = (token, history) => {
  const req = useQuery(
    ["verifyemail", token],
    () => {
      return verifyUser(token);
    },
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        toast.success("Email verified. Redirecting");
        history.push("/auth/login");
      },
    }
  );
  return req;
};
