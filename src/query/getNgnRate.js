import { useQuery } from "react-query";
import { getRates } from "../services/crypto";

export const useGetNgnRate = (environ) => {
  return useQuery("getngnrates", () => getRates(environ), {
    // refetchOnWindowFocus: false,
    retry: 1,
  });
};
