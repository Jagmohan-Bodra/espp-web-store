import {authClient} from '../apiClient.js';

const getUserList = (data) => {
  return authClient.get('/v1/users', data);
};

const getUserDetail = (id, data) => {
  return authClient.get('/v1/users/' + id, data);
};

const postUserCreate = (data) => {
  return authClient.post('/v1/users', data);
};

const postUserUpdate = (id, data) => {
  return authClient.put('/v1/users/' + id, data);
};

const postUserDelete = (id, data) => {
  return authClient.delete('/v1/users/' + id, data);
};

export default {
  getUserList,
  getUserDetail,
  postUserCreate,
  postUserUpdate,
  postUserDelete,
};
