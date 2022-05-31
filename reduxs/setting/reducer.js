import * as type from './type';

const initialState = {
  data: [],
  loading: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case type.GET_SETTING_LIST:
      return {
        ...state,
        data: action.data,
      };
    case type.SETTING_LOADING:
      return {
        ...state,
        loading: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
