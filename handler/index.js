import {isArray} from 'validate.js';

export const convertToCurrencyList = (currencyList) => {
  if (!isArray(currencyList)) {
    return [];
  }
  const arr = [];
  currencyList.map((item) => {
    const obj = {
      ...item,
      id: item.code,
      name: `${item.name} (${item.code})`,
    };
    arr.push(obj);
  });
  return arr;
};
