import { useQuery } from "react-query";
import { getFeePreference } from "../services/fee";

export const useGetFeePreference = () => {
  return useQuery("getfeepreference", () => getFeePreference(), {
    refetchOnWindowFocus: false,
    retry: false,
  });
};
