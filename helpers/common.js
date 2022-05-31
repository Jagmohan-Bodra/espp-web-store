import {isEmpty} from 'validate.js';
import config from '~/config';
import {parse} from './queryString';

export function getAllValueStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values = [...values, parse(localStorage.getItem(keys[i]))];
  }
  return values;
}

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export const isServer = () => typeof window === 'undefined';

export const getItemVariant = (data, key) => {
  return (data || []).find((item) => item.key === key);
};

export const getObjVariant = (arr) =>
  Object.assign({}, ...(arr || []).map((item) => ({[item.key]: item})));

export const getValueVariant = (data, key) =>
  (((data || {})[key] || {}).values || {}).value;

export function textTruncate(str, length, ending) {
  if (typeof length === 'undefined') {
    length = 100;
  }
  if (typeof ending === 'undefined') {
    ending = '...';
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  }
  return str;
}

export const getRandomString = (length = 20) => {
  var randomChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
};

export const treeArray = function (treeArr, rootId = undefined) {
  const arr = [];
  for (let i = 0; i < treeArr.length; i++) {
    const childOfI = (treeArr[i].parent || '').id == rootId && treeArr[i];
    if (childOfI) {
      const childObj = {
        ...childOfI,
        title: childOfI.name,
        value: childOfI.id,
        key: i + 1,
        children: treeArray(treeArr, childOfI.id),
      };
      arr.push(childObj);
    }
  }
  return arr;
};

export const isEmptyToken = () => {
  if (isServer()) {
    return false;
  }
  return isEmpty(localStorage.getItem('access_token'));
};

export const func = (mil = 1000) => debounce((method) => method(), mil);

export const getImagePath = (image) => {
  if (isEmpty(image)) {
    return '/images/no_image.png';
  }
  if (image.includes('http')) {
    return image;
  }
  return `${config.API_URL}${image}`;
};

export const checkImage = (imgUrl) => {
  if (!isEmpty(imgUrl)) {
    return imgUrl;
  }
  return '/images/no_image.png';
};
