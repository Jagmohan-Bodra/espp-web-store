import {DROP_ERROR, THROW_ERROR} from './reducer';

export const dropError = () => (dispatch) => {
  dispatch({type: DROP_ERROR});
};

export const throwErr = (errors) => (dispatch) => {
  dispatch({type: THROW_ERROR, errors});
};

export const showNotification = (message, level) => (dispatch) => {
  dispatch({
    type: THROW_ERROR,
    errors: {message: message, level: level || 'warning'},
  });
};
