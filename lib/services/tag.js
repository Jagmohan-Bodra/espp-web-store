import tagApi from '../apis/api/tag';

export const getTagList = (query) => {
  return tagApi.getTagList(query).then((data) => data.data);
};

export const getTagDetail = (id) => {
  return tagApi.getTagDetail(id).then((data) => data.data);
};
