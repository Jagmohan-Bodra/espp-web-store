import * as type from './type';

const initialState = {
  data: '',
  loading: false,
  isUpdate: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case type.GET_ME:
      return {
        ...state,
        data: action.data,
      };
    case type.ME_LOADING:
      return {
        ...state,
        loading: action.data,
      };

    case type.ME_IS_UPDATE:
      return {
        ...state,
        isUpdate: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
