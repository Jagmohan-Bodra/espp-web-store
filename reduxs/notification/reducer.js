import * as type from './type';

const initialState = {
  ref: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case type.NOTIFICATION_SET_REF:
      return {
        ...state,
        ref: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
