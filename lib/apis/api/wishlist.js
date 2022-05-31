import {authClient} from '../apiClient.js';

const endPoint = '/v1/wishlist';

const getWishlistList = (data) => {
  return authClient.get(endPoint, data);
};

const getWishlistDetail = (id) => {
  return authClient.get(`${endPoint}/${id}`);
};

const postWishlistCreate = (data) => {
  return authClient.post(endPoint, data);
};

const postWishlistDelete = (id, data) => {
  return authClient.delete(`${endPoint}/${id}`, data);
};

export default {
  getWishlistList,
  getWishlistDetail,
  postWishlistCreate,
  postWishlistDelete,
};
