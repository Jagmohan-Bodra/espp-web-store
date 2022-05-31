import cartApi from '../apis/api/cart';

export const getCartList = (query) => {
  return cartApi.getCartList(query).then((data) => data.data);
};

export const getCartDetail = (id) => {
  return cartApi.getCartDetail(id).then((data) => data.data);
};

export const createCart = (data) => {
  return cartApi.postCartCreate(data);
};

export const updateCart = (id, data) => {
  return cartApi.postCartUpdate(id, data);
};

export const deleteCart = (id) => {
  return cartApi.postCartDelete(id);
};
