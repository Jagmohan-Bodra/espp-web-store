import {authClient} from '../apiClient.js';

const getProductCategoryList = (data) => {
  return authClient.get('/v1/inventory/product-categories', data);
};

const getCategoryList = (data) => {
  return authClient.get('/v1/search-product-categories', data);
};

const getCategoryDetail = (id) => {
  return authClient.get('/v1/search-product-categories' + id);
};

export default {
  getProductCategoryList,
  getCategoryList,
  getCategoryDetail,
};
