import { authBaseUrl } from "../constants/baseUrl";
import { toast } from "react-toastify";
import { createAutoLogout } from "../utils/createAutoLogout";

export const saveToLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

export const registerUser = async (params) => {
  try {
    const { data } = await authBaseUrl.post("/signup", params);
    return data;
  } catch (error) {
    throw new Error("Error processing your request");
  }
};

export const loginUser = async (params) => {
  try {
    const { data } = await authBaseUrl.post("/login", params);
    saveToLocalStorage(data.data.token);
  } catch (error) {
    // return error;how
    throw new Error(
      error.response.data.message || "Error processing your request"
    );
  }
};

export const verifyUser = async (token) => {
  try {
    const { data } = await authBaseUrl.get(
      `/email/verify/?verification_token=${token}`
    );
    return data;
  } catch (error) {
    throw new Error("processing error");
  }
};

export const resendEmailVerify = async (email) => {
  try {
    const { data } = await authBaseUrl.put("/email/verify/resend", email);
    toast.success("Email verification sent");
    return data;
  } catch (error) {
    throw new Error("processing error");
  }
};

export const forgotpassword = async (params) => {
  try {
    const { data } = await authBaseUrl.post("/forgotPassword", params);
    toast.success(data.message);
  } catch (error) {
    throw new Error("processing error");
  }
};

export const resetPassword = async (passoword, token) => {
  try {
    await authBaseUrl.put(`/resetPassword/${token}`, passoword);
  } catch (error) {
    throw new Error("processing error");
  }
};

export const logout = async (history) => {
  await authBaseUrl.get("/logout");
  localStorage.removeItem("token");
  history.push("/auth/login");
};

const checkTimeout = (timer, history) => {
  setTimeout(() => {
    return logout(history);
  }, timer);
};

export const autoLogout = async (history) => {
  const timer = await createAutoLogout();
  if (!timer) logout(history);
  checkTimeout(timer, history);
};
