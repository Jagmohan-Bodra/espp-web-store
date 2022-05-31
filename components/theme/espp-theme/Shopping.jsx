import {Badge} from 'antd';
import Router from 'next/router';
// import { useRouter } from 'next/router';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {openLoginModal} from '~/components/modals/login-modal/common';
import pathRouter from '~/constants/path-router';
// import pathRouter from '~/constants/path-router';
import {isEmptyToken} from '~/helpers/common';
import {ShoppingBag} from '~/lib/icons';
import {actGetList, getCartList} from '~/reduxs/cart/action';
import {reqGetMe} from '~/reduxs/me/action';

const Shopping = () => {
  const dispatch = useDispatch();
  // const router = useRouter();
  const data = useSelector((state) => state.cart.data);
  const me = useSelector((state) => state.me.data);

  useEffect(() => {
    !me && dispatch(actGetList([]));
    me && dispatch(getCartList());
  }, [me]);

  useEffect(() => {
    if (!isEmptyToken()) {
      dispatch(reqGetMe());
    }
  }, []);

  const handleOrderClick = () => {
    if (!isEmptyToken()) {
      Router.push(pathRouter.ORDER_IN_SHOP);
      return;
    }
    openLoginModal();
  };

  return (
    <span
      className={`mx-2`}
      onClick={handleOrderClick}
      style={{cursor: 'pointer'}}>
      <ShoppingBag />
      <Badge color="light">{isEmptyToken() ? '0' : data.length}</Badge>
    </span>
  );
};

export default Shopping;
