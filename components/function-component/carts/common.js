import JWTAuth from '../../../lib/apis/utils/jwtAuth';
import * as cartService from '../../../lib/services/cart';
import * as cartAction from '../../../reduxs/cart/action';
import {initializeStore} from '../../../reduxs/store';
import {openLoginModal} from '../../modals/login-modal/common';
const jwtAuth = new JWTAuth();

export const createCart = async (productId, quantity) => {
  const {dispatch} = initializeStore();
  if (jwtAuth.isEmptyToken()) {
    openLoginModal();
    throw '';
  }
  return cartService
    .createCart({productId, quantity: quantity || 1})
    .then((data) => {
      // notif({message: 'This Product has been added to your Shopping Cart.'});
      dispatch(cartAction.getCartList());
      return data.data;
    });
};
