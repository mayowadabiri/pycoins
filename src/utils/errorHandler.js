import { toast } from "react-toastify";
import { createAutoLogout } from "./createAutoLogout";

export const errorHandler = (error) => {
  if (!error.response) toast.error(error.message);
  if (error.response && error.response.status) {
    if (
      error.response.data.message.includes("jwt") ||
      error.response.data.message.includes("signature") ||
      error.response.data.message.includes("token")
    ) {
      toast.error("Your session has expired. Please login again");
      localStorage.removeItem("token");
      window.location.reload();
    }
    if (error.response.data.message === "This user no longer exist") {
      console.log("YES");
      localStorage.removeItem("token");
      window.location.reload();
    }
    toast.error(error.response.data.message);
  }
  return error;
};
