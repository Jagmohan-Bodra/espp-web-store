import brandApi from '../apis/api/brand';

export const getBrandList = (query) => {
  return brandApi
    .getBrandList(query)
    .then((data) => data.data)
    .catch(() => false);
};

export const getBrandDetail = (id) => {
  return brandApi
    .getBrandDetail(id)
    .then((data) => data.data)
    .catch(() => {});
};
