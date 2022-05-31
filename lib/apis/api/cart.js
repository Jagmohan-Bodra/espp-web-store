import {authClient} from '../apiClient.js';
const endPoint = '/v1/carts';

const getCartList = (data) => {
  return authClient.get(endPoint, data);
};

const getCartDetail = (id) => {
  return authClient.get(`${endPoint}/${id}`);
};

const postCartCreate = (data) => {
  return authClient.post(endPoint, data);
};

const postCartUpdate = (id, data) => {
  return authClient.put(`${endPoint}/${id}`, data);
};

const postCartDelete = (id, data) => {
  return authClient.delete(`${endPoint}/${id}`, data);
};

export default {
  getCartList,
  getCartDetail,
  postCartCreate,
  postCartUpdate,
  postCartDelete,
};
