import {authClient} from '../apiClient.js';

const getOrderList = (data) => {
  return authClient.get('/v1/me-orders', data);
};

const getOrderDetail = (id) => {
  return authClient.get(`/v1/orders/${id}`);
};

const postOrderCreate = (data) => {
  return authClient.post(`/v1/orders`, data);
};

const getOrderDetailsByNo = (orderNo) => {
  return authClient.get(`/v1/orders-by-no/${orderNo}`);
};

const putOrderPayment = (id, data) => {
  return authClient.put(`/v1/orders/${id}/update-payment`, data);
};

const putOrdersUpdate = (id, orderStatus) => {
  return authClient.put(`/v1/orders/${id}`, {status: orderStatus});
};

const putOrderUpdateArchiveAll = (data) => {
  return authClient.put(`/v1/orders/update-archive-all`, data);
};

export default {
  getOrderList,
  getOrderDetail,
  postOrderCreate,
  getOrderDetailsByNo,
  putOrderPayment,
  putOrdersUpdate,
  putOrderUpdateArchiveAll,
};
