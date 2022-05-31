import {
  reqSetVisible,
  reqSetOkFunction,
  reqSetCancelFunction,
  reqSetPropsModal,
} from '../../../reduxs/public-modal/action';
import {initializeStore} from '../../../reduxs/store';

export const openPublicModal = (
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

export const closePublicModal = () => {
  const {dispatch} = initializeStore();
  dispatch(reqSetVisible(false));
};

export const submitPublicModal = (data) => {
  const store = initializeStore();
  const okFunc = store.getState().publicModal.okFunc;
  okFunc(data);
  store.dispatch(reqSetVisible(false));
};
