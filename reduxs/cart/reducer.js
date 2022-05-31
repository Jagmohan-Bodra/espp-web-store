import * as type from './type';

const initialState = {
  data: [],
  loading: false,
  isAllowCheckout: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case type.GET_CART_LIST:
      return {
        ...state,
        data: action.data,
      };
    case type.CART_LOADING:
      return {
        ...state,
        loading: action.data,
      };
    case type.IS_ALLOW_CHECKOUT:
      return {
        ...state,
        isAllowCheckout: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
