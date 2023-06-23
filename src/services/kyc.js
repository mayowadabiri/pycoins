import { kycBaseUrl } from "../constants/baseUrl";

export const verifyIdentity = async (data, type) => {
  try {
    await kycBaseUrl.post(`individual/${type}`, data);
    return true;
  } catch (e) {
    throw new Error("Error processing request");
  }
};

export const verifyBusiness = async (data, type) => {
  try {
    await kycBaseUrl.post(`business/`, data);
    return true;
  } catch (e) {
    throw new Error("Error processing request");
  }
};
