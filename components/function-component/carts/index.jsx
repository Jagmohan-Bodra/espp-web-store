import {Badge} from 'antd';
import {useEffect} from 'react';
import {CartIcon} from '../../../lib/icons';
import {useSelector, useDispatch} from 'react-redux';
import {getCartList, actGetList} from '../../../reduxs/cart/action';

const Carts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart.data);
  const me = useSelector((state) => state.me.data);

  useEffect(() => {
    !me && dispatch(actGetList([]));
    me && dispatch(getCartList());
  }, [me]);

  return (
    <span style={{paddingRight: '10px'}}>
      <Badge count={data.length} size={`small`}>
        <CartIcon />
      </Badge>
    </span>
  );
};

export default Carts;
