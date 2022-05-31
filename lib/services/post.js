import postApi from '../apis/api/post';

export const getPostList = (query) => {
  return postApi
    .getPostList(query)
    .then((data) => data.data)
    .catch(() => false);
};

export const getPostDetail = (id) => {
  return postApi
    .getPostDetail(id)
    .then((data) => data.data)
    .catch(() => {});
};
