import * as type from './type';

const initialState = {
  data: [],
  metadata: {},
  obj: {},
  isCreate: false,
  isUpdate: false,
  isSend: false,
  loading: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case type.GET_ORDER_LIST:
      return {
        ...state,
        data: action.data.data,
        meta: action.data.meta,
      };
    case type.GET_ORDER_ITEM:
      return {
        ...state,
        obj: action.data,
      };
    case type.ORDER_LOADING:
      return {
        ...state,
        loading: action.data,
      };
    case type.ORDER_IS_UPDATE:
      return {
        ...state,
        isUpdate: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
