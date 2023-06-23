import { useQuery } from "react-query";

import { getEnvironment } from "../services/crypto";
import { useContext } from "react";
import { AppContext } from "./../context/index";

export const useGetUserEnvironment = () => {
  const { saveUserEnvironment } = useContext(AppContext);

  return useQuery("getuserenvironment", () => getEnvironment(), {
    onSuccess: (data) => saveUserEnvironment(data),
    refetchOnWindowFocus: false,
    retry: false,
  });
};
