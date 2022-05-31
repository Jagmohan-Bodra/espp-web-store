import {
  reqSetVisible,
  reqSetOkFunction,
  reqSetCancelFunction,
  reqSetPropsModal,
} from '~/reduxs/right-modal/action';
import {initializeStore} from '~/reduxs/store';

export const openRightModal = (
  props = {},
  okFunc = () => {},
  cancelFunc = () => {},
) => {
  const {dispatch} = initializeStore();
  dispatch(reqSetPropsModal(props));
  dispatch(reqSetVisible(true));
  dispatch(reqSetOkFunction(okFunc));
  dispatch(reqSetCancelFunction(cancelFunc));
};

export const closeRightModal = () => {
  const {dispatch} = initializeStore();
  dispatch(reqSetVisible(false));
};
