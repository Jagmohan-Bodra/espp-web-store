import {authClient} from '../apiClient.js';
import endPoint from '../endPoint';

const getBlockList = (data) => {
  return authClient.get(endPoint.BLOCK_LIST, data);
};

const getBlockDetail = (id) => {
  return authClient.get(`/v1/search-blocks/${id}`);
};

const postBlockCreate = (data) => {
  return authClient.post(endPoint.BLOCK_CREATE, data);
};

const postBlockUpdate = (id, data) => {
  return authClient.post(endPoint.BLOCK_UPDATE(id), data);
};

const postBlockDelete = (id, data) => {
  return authClient.post(endPoint.BLOCK_DELETE(id), data);
};

export default {
  getBlockList,
  getBlockDetail,
  postBlockCreate,
  postBlockUpdate,
  postBlockDelete,
};
