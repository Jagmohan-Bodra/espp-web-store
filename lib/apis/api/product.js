import {authClient} from '../apiClient.js';

const getProductList = (data) => {
  return authClient.get('/v1/inventory/product', data);
};

const getProductDetail = (id) => {
  return authClient.get('/v1/inventory/product/' + id);
};

export default {
  getProductList,
  getProductDetail,
};
