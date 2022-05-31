import {authClient} from '../apiClient.js';
import endPoint from '../endPoint';

const getPostCategoryList = (data) => {
  return authClient.get(endPoint.POST_CATEGORY_LIST, data);
};

const getPostCategoryDetail = (id) => {
  return authClient.get(endPoint.POST_CATEGORY_DETAILS(id));
};

const postPostCategoryCreate = (data) => {
  return authClient.post(endPoint.POST_CATEGORY_CREATE, data);
};

const postPostCategoryUpdate = (id, data) => {
  return authClient.post(endPoint.POST_CATEGORY_UPDATE(id), data);
};

const postPostCategoryDelete = (id, data) => {
  return authClient.post(endPoint.POST_CATEGORY_DELETE(id), data);
};

export default {
  getPostCategoryList,
  getPostCategoryDetail,
  postPostCategoryCreate,
  postPostCategoryUpdate,
  postPostCategoryDelete,
};
