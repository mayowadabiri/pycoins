import { userAuthBaseUrl } from "../constants/baseUrl";
import { toast } from "react-toastify";

export const userProfile = async () => {
  try {
    const { data } = await userAuthBaseUrl.get("/profile");
    return data.data;
  } catch (error) {
    throw new Error("Error processing your request");
  }
};

export const getApiKeys = async () => {
  try {
    const { data } = await userAuthBaseUrl.get("/keys");
    return data.data.apiKey;
  } catch (error) {
    return error;
  }
};

export const switchToBusiness = async (params) => {
  try {
    const { data } = await userAuthBaseUrl.patch("/switch", params);
    return data;
  } catch (error) {
    throw new Error("Error processing your request");
  }
};

export const changeUserImage = async (image) => {
  try {
    const { data } = await userAuthBaseUrl.patch("/updateImage", image);
    toast.success("Photo updated successfully");
    return data;
  } catch (error) {
    throw new Error("Error processing your request");
  }
};

export const updateUserProfile = async (profile) => {
  try {
    const { data } = await userAuthBaseUrl.patch("/updateuser", profile);
    toast.success("User profile updated Successfully");
    return data;
  } catch (error) {
    throw new Error("Error processing your request");
  }
};

export const updateBusinessprofile = async (business) => {
  try {
    const { data } = await userAuthBaseUrl.patch("/updateBusiness", business);
    toast.success("User profile updated Successfully");
    return data;
  } catch (error) {
    throw new Error("Error processing your request");
  }
};

export const updatePassword = async (params) => {
  try {
    const { data } = await userAuthBaseUrl.patch("/updatePassword", params);
    toast.success("Password successfully updated");
    return data.data;
  } catch (error) {
    throw new Error("Error processing your request");
  }
};
