import { cryptoBaseUrl } from "../constants/baseUrl";

export const initiateWithdrawal = async (details) => {
  try {
    const { data } = await cryptoBaseUrl.post("/withdrawal/initiate", details);
    return data.message;
  } catch (error) {
    throw new Error("Error initializing your request");
  }
};

export const processWithdrawal = async (otp) => {
  try {
    const { data } = await cryptoBaseUrl.post("/withdrawal/process", otp);
    return data.message;
  } catch (error) {
    throw new Error("Error initializing your request");
  }
};
