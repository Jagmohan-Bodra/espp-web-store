import productApi from '../apis/api/product';

export const getProductList = (query) => {
  return productApi
    .getProductList(query)
    .then((data) => data.data)
    .catch(() => false);
};

export const getProductDetail = (id) => {
  return productApi
    .getProductDetail(id)
    .then((data) => data.data)
    .catch(() => {});
};
