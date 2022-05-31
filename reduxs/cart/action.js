import * as Types from './type';
// import * as cartService from '../../lib/services/cart';

// TODO: update apis
export const getCartList = () => () => {
  return;
};

// export const getCartList = (query) => (dispatch) => {
//   dispatch(actLoading(true));
//   return cartService
//     .getCartList(query)
//     .then((data) => {
//       dispatch(actGetList(data));
//       dispatch(actLoading(false));
//       return data;
//     })
//     .catch(() => {
//       dispatch(actLoading(false));
//       return;
//     });
// };

export const actGetList = (data) => {
  return {
    type: Types.GET_CART_LIST,
    data,
  };
};

export const actLoading = (data) => {
  return {
    type: Types.CART_LOADING,
    data,
  };
};

export const isAllowCheckout = (data) => {
  return {
    type: Types.IS_ALLOW_CHECKOUT,
    data,
  };
};
