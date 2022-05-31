import * as Types from './type';
import * as orderService from '../../lib/services/order';

export const getOrderList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return orderService
    .getOrderList(query)
    .then((data) => {
      dispatch(actGetList(data));
      dispatch(actLoading(false));
      return data;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return;
    });
};

export const getOrdersDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  orderService
    .getOrderDetail(id)
    .then((data) => {
      dispatch(actGetItem(data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const actGetList = (data) => {
  return {
    type: Types.GET_ORDER_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.ORDER_LOADING,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_ORDER_ITEM,
    data,
  };
};
