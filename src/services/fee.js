import { userBaseUrl } from "../constants/baseUrl";

export const getFeePreference = async () => {
  try {
    const { data } = await userBaseUrl.get("/fee/preference");
    return data.data.preference;
  } catch (error) {
    throw new Error("Error processing your request");
  }
};

export const updatePreference = async (data) => {
  try {
    await userBaseUrl.post("/fee/preference", data);
  } catch (error) {
    throw new Error("Error processing your request");
  }
};
