import {authClient} from '../apiClient.js';
import endPoint from '../endPoint';

const getPageList = (data) => {
  return authClient.get(endPoint.PAGE_LIST, data);
};

const getPageDetail = (id) => {
  return authClient.get(`/v1/cms/pages/${id}`);
};

const getPageDetailByPath = (path) => {
  return authClient.get(`/v1/cms/pages/${path}`);
};

const postPageCreate = (data) => {
  return authClient.post(endPoint.PAGE_CREATE, data);
};

const postPageUpdate = (id, data) => {
  return authClient.post(endPoint.PAGE_UPDATE(id), data);
};

const postPageDelete = (id, data) => {
  return authClient.post(endPoint.PAGE_DELETE(id), data);
};

export default {
  getPageList,
  getPageDetail,
  postPageCreate,
  postPageUpdate,
  postPageDelete,
  getPageDetailByPath,
};
