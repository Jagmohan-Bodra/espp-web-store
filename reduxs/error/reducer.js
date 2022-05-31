export const THROW_ERROR = 'THROW_ERROR';
export const DROP_ERROR = 'DROP_ERROR';

const initialState = {
  isErr: false,
  message: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case THROW_ERROR:
      return {
        ...state,
        message: action.errors,
        isErr: true,
      };

    case DROP_ERROR:
      return {
        isErr: false,
      };
    default:
      return state;
  }
};

export default reducer;
