import { dateFormatter } from "./dateFormatter";
export const formatTransactions = (data) => {
  const formatted = [];
  data.forEach((item) => {
    item.transfers.forEach((trans) => {
      const date = dateFormatter(trans.createdAt);
      formatted.push({
        ...trans,
        ...item.metaData,
        date,
        amount: item.confirmedAmountInUsd,
        amountInCrypto: trans.amount,
        status: item.status,
      });
    });
  });

  return formatted;
};
