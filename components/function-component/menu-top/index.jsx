import {Divider, Menu} from 'antd';
import {useRouter} from 'next/router';
import Carts from '../carts';
import styles from './styles.module.scss';
import {openLoginModal} from '../../modals/login-modal/common';
import {useDispatch, useSelector} from 'react-redux';
import {reqGetMe, reqSignOut} from '../../../reduxs/me/action';
import {useEffect} from 'react';
import JWTAuth from '../../../lib/apis/utils/jwtAuth';
import PATH from '../../../constants/path-router';
import CheckYourOrder from './CheckYourOrder';
const jwtAuth = new JWTAuth();

const genderItemMenu = (data) => {
  if (data.children) {
    return (
      <Menu.SubMenu {...data} style={data.disabled ? {display: 'none'} : {}}>
        {data.children.map((item) => genderItemMenu(item))}
      </Menu.SubMenu>
    );
  }
  if (data.mode === 'div') {
    return (
      <div {...data} style={data.disabled ? {display: 'none'} : {}}>
        {data.text || ''}
      </div>
    );
  }
  return (
    <Menu.Item {...data} style={data.disabled ? {display: 'none'} : {}}>
      {data.text || ''}
    </Menu.Item>
  );
};

const MenuTop = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const me = useSelector((state) => state.me.data);
  const token = jwtAuth.getToken();
  const handleLogin = () => {
    openLoginModal();
  };
  const handleLogout = () => {
    dispatch(reqSignOut());
  };
  useEffect(() => {
    token && dispatch(reqGetMe());
  }, [token]);

  const handleOrderClick = () => {
    if (me) {
      router.push(PATH.ORDER_IN_SHOP);
      return;
    }
    openLoginModal();
  };

  const handleCompareClick = () => {
    router.push(PATH.PRODUCT_COMPARE);
  };

  const MENU_OPTIONS = [
    {
      key: 'usd',
      title: 'USD',
      children: [
        {key: 'option1', text: 'Singapore ( SGD )'},
        {key: 'option2', text: 'United States ( USD )'},
      ],
    },
    {
      key: 'my_compares',
      text: 'MY COMPARES',
      onClick: handleCompareClick,
    },
    {
      key: 'CHECK_YOUR_ORDER',
      title: 'CHECK YOUR ORDER',
      popupClassName: 'check_your_order',
      children: [
        {
          key: 'check_your_order_option',
          text: <CheckYourOrder />,
          className: 'check_your_order_option',
          mode: 'div',
        },
      ],
    },
    {
      key: 'order',
      text: 'ORDER',
      icon: <Carts />,
      onClick: handleOrderClick,
    },
    {
      key: 'login_sign_up',
      text: 'LOGIN OR SIGN UP',
      onClick: handleLogin,
      disabled: me,
    },
    {
      key: 'sub_login',
      title: me.name || 'No name',
      children: [
        {key: 'sub_login_Logout', text: 'Logout', onClick: handleLogout},
      ],
      disabled: !me,
    },
  ];

  return (
    <span>
      <div className={styles.menu_top}>
        <div className={`container`}>
          <Menu
            mode="horizontal"
            style={{textAlign: 'right'}}
            triggerSubMenuAction={'click'}>
            {MENU_OPTIONS.map((item) => genderItemMenu(item))}
          </Menu>
          <Divider style={{margin: '0 0'}} />
        </div>
      </div>
      <div className={styles.pd_t}></div>
    </span>
  );
};

export default MenuTop;
