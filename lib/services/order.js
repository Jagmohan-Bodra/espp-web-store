import orderApi from '../apis/api/order';

export const getOrderList = (query) => {
  return orderApi.getOrderList(query).then((data) => data);
};

export const getOrderDetail = (id) => {
  return orderApi.getOrderDetail(id).then((data) => data.data);
};

export const postOrderCreate = (data) => {
  return orderApi.postOrderCreate(data).then((data) => data.data);
};

export const getOrderDetailsByNo = (orderNo) => {
  return orderApi.getOrderDetailsByNo(orderNo).then((data) => data.data);
};

export const putOrderPaymentService = (id, data) => {
  return orderApi.putOrderPayment(id, data);
};

export const updateOrderStatusService = (id, status) => {
  return orderApi.putOrdersUpdate(id, status);
};
