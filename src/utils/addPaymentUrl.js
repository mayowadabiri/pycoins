import serverConfig from "../env";
export const addPaymentUrl = (data) => {
  return {
    ...data,
    paymenturl: `${serverConfig.baseurl}/pay/${data.paymentSlug}`,
  };
};
