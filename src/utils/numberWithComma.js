export const addComma = (num) => {
  return parseInt(num?.replace(/,/g, "")).toLocaleString();
};

export const extractNumber = (n) => {
  return n.replace(/[^0-9]/g, "");
};
