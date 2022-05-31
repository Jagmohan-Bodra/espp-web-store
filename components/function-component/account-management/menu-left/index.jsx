import {Menu} from 'antd';
import styles from './styles.module.scss';

export const MENU_KEYS = {
  MANAGER_MY_ACCOUNT: 'MANAGER_MY_ACCOUNT',
  ACCOUNT: 'ACCOUNT',
  ORDER: 'ORDER',
  PERSONAL: 'PERSONAL',
  ADDRESS: 'ADDRESS',
  PAYMENT: 'PAYMENT',
  DISCOUNT_CODE: 'DISCOUNT_CODE',
  ORDER_RETURN: 'ORDER_RETURN',
  ORDER_CANCEL: 'ORDER_CANCEL',
  ORDER_CHECK: 'ORDER_CHECK',
  MY_REVIEW: 'MY_REVIEW',
};

const genderItemMenu = (data) => {
  if (data.children) {
    return (
      <Menu.SubMenu
        {...data}
        style={data.disabled ? {display: 'none'} : {}}
        className={`${data.className || ''} menu_left_submenu`}>
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
    <Menu.Item
      {...data}
      style={
        data.disabled ? {display: 'none'} : {textAlign: 'left', ...data.style}
      }>
      {data.text || ''}
    </Menu.Item>
  );
};

const MenuLeft = ({setKey, selected}) => {
  // const me = useSelector((state) => state.me.data);

  const MENU_OPTIONS = [
    {
      key: MENU_KEYS.ACCOUNT,
      title: 'Account',
      children: [
        {key: MENU_KEYS.MANAGER_MY_ACCOUNT, text: 'Manager my account'},
        // {key: MENU_KEYS.PERSONAL, text: 'Personal information'},
        // {key: MENU_KEYS.ADDRESS, text: 'Address'},
        // {key: MENU_KEYS.PAYMENT, text: 'Payment options'},
        // {key: MENU_KEYS.DISCOUNT_CODE, text: 'Discount code'},
      ],
    },
    // {
    //   key: MENU_KEYS.ORDER,
    //   title: 'My Order',
    //   children: [
    //     {key: MENU_KEYS.ORDER_RETURN, text: 'Return orders'},
    //     {key: MENU_KEYS.ORDER_CANCEL, text: 'Canceled order'},
    //     // {key: MENU_KEYS.ORDER_CHECK, text: 'Checking order'},
    //   ],
    // },
    // {
    //   key: MENU_KEYS.MY_REVIEW,
    //   text: 'My review',
    //   style: {fontWeight: 'bold'},
    // },
  ];

  return (
    <div className={styles.menu_left}>
      <Menu
        mode="inline"
        style={{textAlign: 'right'}}
        triggerSubMenuAction={'click'}
        defaultOpenKeys={[MENU_KEYS.ACCOUNT, MENU_KEYS.ORDER]}
        onSelect={({key}) => setKey(key)}
        selectedKeys={[selected]}>
        {MENU_OPTIONS.map((item) => genderItemMenu(item))}
      </Menu>
    </div>
  );
};

export default MenuLeft;
