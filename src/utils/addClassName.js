import { cryptos } from "../constants/index";

export const addClassName = (data) => {
  const joinedArr = [];

  for (let item of data) {
    for (let key of cryptos) {
      if (key.slug === item.slug) {
        joinedArr.push({
          ...item,
          ...key,
          img: key.img,
        });
      }
    }
  }
  return joinedArr;
};
