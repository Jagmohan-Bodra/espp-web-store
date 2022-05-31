import {Col, Row} from 'antd';
import {useRouter} from 'next/router';
import {parse, stringify} from '../../../helpers/queryString';
import ManagerMyAccount from './ManagerMyAccount';
import MenuLeft, {MENU_KEYS} from './menu-left';
import OrderDetails from './OrderDetails';

const AccountManagement = () => {
  const router = useRouter();
  const queryBuilder = parse(router.query) || {};
  const selected = queryBuilder.key || MENU_KEYS.PERSONAL;

  const changeUrlQuery = (data) => {
    router.push({
      query: stringify(data),
    });
  };

  const setFilterQueryData = (value = {}) => {
    const queryBuilder = parse(router.query) || {};
    const data = {
      ...queryBuilder,
      ...value,
    };
    changeUrlQuery(data);
  };

  const genderContent = () => {
    switch (selected) {
      case MENU_KEYS.MANAGER_MY_ACCOUNT:
        return <ManagerMyAccount />;
      case MENU_KEYS.PERSONAL:
        return 'PERSONAL';
      case MENU_KEYS.ADDRESS:
        return 'ADDRESS';
      case MENU_KEYS.PAYMENT:
        return 'PAYMENT';
      case MENU_KEYS.DISCOUNT_CODE:
        return 'DISCOUNT_CODE';

      case MENU_KEYS.ORDER_RETURN:
        return 'ORDER_RETURN';
      case MENU_KEYS.ORDER_CANCEL:
        return 'ORDER_CANCEL';
      case MENU_KEYS.ORDER_CHECK:
        return <OrderDetails />;

      case MENU_KEYS.MY_REVIEW:
        return 'MY_REVIEW';
    }

    return null;
  };

  return (
    <div className={`container`}>
      <Row>
        <Col span={6}>
          <div style={{padding: '21px 22px'}}>Hello, abc</div>
          <MenuLeft
            setKey={(key) => setFilterQueryData({key})}
            selected={selected}
          />
        </Col>
        <Col span={18}>{genderContent()}</Col>
      </Row>
    </div>
  );
};

export default AccountManagement;
