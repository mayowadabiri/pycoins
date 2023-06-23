import { toast } from "react-toastify";

import { paymentlinkBaseUrl, base } from "../constants/baseUrl";

export const createPaymentLink = async (params) => {
  try {
    const { data } = await paymentlinkBaseUrl.post("/create", params);
    return data.data;
  } catch (error) {
    throw new Error("Error processing your request");
  }
};

export const getPaymentLinks = async () => {
  try {
    const { data } = await paymentlinkBaseUrl.get("/?page=1&limit=10");
    return data.data;
  } catch (error) {
    throw new Error("Error processing your request");
  }
};

export const getUserPaymentLink = async (id) => {
  try {
    const { data } = await paymentlinkBaseUrl.get(`/single/${id}`);
    return data.data;
  } catch (error) {
    throw new Error("Error processing your request");
  }
};

export const deletePaymentLink = async (id) => {
  try {
    const response = await paymentlinkBaseUrl.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error deleting payment link");

    throw new Error("Error processing your request");
  }
};

export const enablePaymentLink = async (id) => {
  try {
    await paymentlinkBaseUrl.put(`/enable/${id}`);
  } catch (error) {
    toast.error("Error enabling payment link");
  }
};

export const disablePaymentLink = async (id) => {
  try {
    await paymentlinkBaseUrl.put(`/disable/${id}`);
    return true;
  } catch (error) {
    toast.error("Error disabling payment link");
    throw new Error("Error processing your request");
  }
};
export const getPaymentInfo = async (slug) => {
  try {
    const { data } = await paymentlinkBaseUrl.get(`/${slug}`);
    return data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else throw new Error("Error processing payment page");
  }
};

export const getPaymentLinkTransactions = async (id) => {
  try {
    const { data } = await paymentlinkBaseUrl.get(`/transactions/${id}`);
    return data.data.paymentPage;
  } catch (error) {
    throw new Error(`Error`);
  }
};

export const processPaymentLink = async ({ environ, paymentData, ref }) => {
  try {
    const { data } = await base.post(
      `/${environ}/page/${ref}/process`,
      paymentData
    );
    return data.details;
  } catch (error) {
    throw new Error("Error processing payment");
  }
};

// export const getProcessedPayment = async () => {
//   const token = localStorage.getItem("token");
//   try {
//     const data = await base.get(
//       "/sandbox/page/e8db4e366fbce6c2aa1c73a232bd7510bf057338ec5eb90b661d5ded8479c9fa6a4ed0d254b74b9a",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return data;
//   } catch (error) {
//     throw new Error("Error processing your request");
//   }
// };

export const getRates = async () => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await base.get(
      "/live/payment/crypto/rate?cryptos=BTC,ETH,USDT&currencies=USD",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.rates;
  } catch (error) {
    throw new Error("Error processing your request");
  }
};
