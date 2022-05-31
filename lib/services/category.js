import categoryApi from '../apis/api/category';

export const getProductCategoryList = (query) => {
  return categoryApi
    .getProductCategoryList(query)
    .then((data) => data.data)
    .catch(() => false);
};

export const getCategoryList = (query) => {
  return categoryApi
    .getCategoryList(query)
    .then((data) => data.data)
    .catch(() => false);
};

export const getCategoryDetail = (id) => {
  return categoryApi
    .getCategoryDetail(id)
    .then((data) => data.data)
    .catch(() => {});
};
