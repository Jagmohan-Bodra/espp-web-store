import pageApi from '../apis/api/page';

export const getPageList = (query) => {
  return pageApi
    .getPageList(query)
    .then((data) => data.data)
    .catch(() => false);
};

export const getPageDetail = (id) => {
  return pageApi
    .getPageDetail(id)
    .then((data) => data.data)
    .catch(() => {});
};

export const getPageDetailByPath = async (path) => {
  return await pageApi
    .getPageDetailByPath(path)
    .then((data) => data.data)
    .catch((e) => {
      e;
    });
};
