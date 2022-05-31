import colorApi from '../apis/api/color';

export const getColorList = (query) => {
  return colorApi
    .getColorList(query)
    .then((data) => data.data)
    .catch(() => false);
};

export const getColorDetail = (id) => {
  return colorApi
    .getColorDetail(id)
    .then((data) => data.data)
    .catch(() => {});
};
