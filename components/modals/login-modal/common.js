import {
  reqSetVisible,
  reqSetOkFunction,
  reqSetCancelFunction,
  reqSetPropsModal,
} from '../../../reduxs/login-modal/action';
import {initializeStore} from '../../../reduxs/store';

export const openLoginModal = (props = {}) => {
  const okFunc = () => {};
  const cancelFunc = () => {};
  const {dispatch} = initializeStore();
  dispatch(reqSetPropsModal(props));
  dispatch(reqSetVisible(true));
  dispatch(reqSetOkFunction(okFunc));
  dispatch(reqSetCancelFunction(cancelFunc));
};
