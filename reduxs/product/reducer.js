import * as type from './type';

const initialState = {
  obj: {},
  loading: false,
};

const reducter = (state = initialState, action = {}) => {
  switch (action.type) {
    case type.GET_PRODUCT_DETAILS:
      return {
        ...state,
        obj: action.data,
      };
    default:
      return state;
  }
};

export default reducter;
