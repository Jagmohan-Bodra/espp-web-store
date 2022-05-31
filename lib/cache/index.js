import {isServer} from '~/helpers/common';
import {parse, stringify} from '~/helpers/queryString';

export const setCache = (key, value) => {
  if (isServer()) return false;
  localStorage.setItem(key, stringify(value));
};

export const getCache = (key) => {
  if (isServer()) return false;
  return parse(localStorage.getItem(key));
};

export const removeCache = (key) => {
  if (isServer()) return false;
  localStorage.removeItem(key);
};

export const toggleCompares = (data = {}) => {
  let productList = getCache('compare-product-list') || {};
  if (!productList[data._id]) {
    productList[data._id] = data;
  } else {
    delete productList[data._id];
  }
  setCache('compare-product-list', productList);
};

export const toggleRecentlyView = (data = {}) => {
  let productList = getCache('recently-view-product-list') || {};
  if (!productList[data._id]) {
    productList[data._id] = data;
  }
  setCache('recently-view-product-list', productList);
};

export const checkCompares = (id) => {
  if (isServer()) return false;
  let productList = getCache('compare-product-list') || {};
  return productList[id] != undefined;
};
