import Router from 'next/router';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'reactstrap';
import Empty from '~/components/public/empty';
import Loading from '~/components/public/loading';
import {notif} from '~/components/public/notification/common';
import {SETTING_KEY} from '~/constants/master-data';
import pathRouter from '~/constants/path-router';
import {isEmptyToken} from '~/helpers/common';
import {LogoIcon} from '~/lib/icons';
import {postOrderCreate, putOrderPaymentService} from '~/lib/services/order';
import {actGetList, getCartList} from '~/reduxs/cart/action';
import {reqGetMe} from '~/reduxs/me/action';
import CartInfo from './CartInfo';
import InformationTab from './InformationTab';
import PaymentTab from './PaymentTab';
import ShippingTab from './ShippingTab';
import ThankYou from './ThankYou';
import {isEmpty} from 'validate.js';
import {getCache} from '~/lib/cache';

const TAB_ENUM = {
  CART: 'CART',
  INFORMATION: 'INFORMATION',
  SHIPPING: 'SHIPPING',
  PAYMENT: 'PAYMENT',
  THANKS: 'THANKS',
};

const TAB_OPTIONS = [
  {value: TAB_ENUM.CART, text: 'Cart'},
  {value: TAB_ENUM.INFORMATION, text: 'Information'},
  {value: TAB_ENUM.SHIPPING, text: 'Shipping'},
  {value: TAB_ENUM.PAYMENT, text: 'Payment'},
];

const Breadcrumbs = ({value}) => {
  let check;
  return (
    <div className={`breadcrumb-component`}>
      {(check = true)}
      {TAB_OPTIONS.map((tab, index) => {
        const active = value === tab.value;
        if (active) check = false;
        return (
          <div key={index} className={`breadcrumb-component_tab`}>
            {index !== 0 && (
              <div className={`breadcrumb-component_tab_tip`}>{`>`}</div>
            )}
            <div
              className={`breadcrumb-component_tab_link ${
                active ? 'active' : ''
              } ${check ? 'check' : ''}`}>
              {tab.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapCheckedIds = (dataCart) => {
  let checkIds = getCache('ids_checkout') || {};
  if (!isEmpty(checkIds)) {
    let arrayIds = Object.values(checkIds);
    return dataCart.filter((item) => arrayIds.includes(item._id));
  }
  return [];
};

const CheckingPage = ({settings}) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(TAB_ENUM.INFORMATION);
  const dataCart = useSelector((state) => state.cart.data);
  const me = useSelector((state) => state.me.data);
  const [params, setParams] = useState({});
  // const [payment, setPayment] = useState();
  const [loadding, setLoadding] = useState(false);
  const data = mapCheckedIds(dataCart);

  const handleOnCartClick = () => {
    Router.push({pathname: pathRouter.ORDER_IN_SHOP});
  };

  useEffect(() => {
    !me && dispatch(actGetList([]));
    if (me) {
      dispatch(getCartList());
      const {
        addressBlockNo,
        addressFloor,
        addressBuildingName,
        addressUnitNo,
        addressStresstName,
        addressCity,
        addressState,
        addressCountry,
        addressPostCode,
      } = me.customer || {};
      const fullAddress = `${addressUnitNo || ''} ${addressStresstName || ''} ${
        addressCity || ''
      } ${addressState || ''} ${addressCountry || ''}`.replace(/\s+/g, ' ');

      onChangeData({
        email: me.email,
        shippingAddress: {
          firstName: me.firstName,
          lastName: me.lastName,
          phone: me.phone,
          blockNo: addressBlockNo,
          stresstName: fullAddress,
          floor: addressFloor,
          unitNo: addressUnitNo,
          buildingName: addressBuildingName,
          state: addressState,
          country: addressCountry,
          city: addressCity,
          postCode: addressPostCode,
        },
        billingAddress: {
          firstName: me.firstName,
          lastName: me.lastName,
          phone: me.phone,
          blockNo: addressBlockNo,
          stresstName: fullAddress,
          floor: addressFloor,
          unitNo: addressUnitNo,
          buildingName: addressBuildingName,
          state: addressState,
          country: addressCountry,
          city: addressCity,
          postCode: addressPostCode,
        },
      });
    }
  }, [me]);

  useEffect(() => {
    if (!isEmptyToken()) {
      dispatch(reqGetMe());
    }
    setLoadding(false);
  }, []);

  const onChangeData = (value) => {
    setParams({
      ...params,
      ...value,
    });
  };

  const onPaymentClick = (shippingFee) => {
    const newData = {
      cartIds: data.map((item) => item._id),
      shippingAddress: params.shippingAddress,
      billingAddress: params.billingAddress,
      purchaseOrder: params.purchaseOrder,
      notes: params.notes,
      shippingFee,
    };
    setLoadding(true);
    postOrderCreate(newData)
      .then((data) => {
        notif({message: 'Successfully create a order'});
        setLoadding(false);
        onChangeData({
          _id: data._id,
          orderNo: data.orderNo,
          shippingFee,
        });
        setTab(TAB_ENUM.PAYMENT);
      })
      .catch(() => setLoadding(false));
  };

  const handleSubmit = (payment) => {
    setLoadding(true);
    putOrderPaymentService(params._id, {payment})
      .then(() => {
        notif({message: 'Successfully'});
        onChangeData({payment});
        setLoadding(false);
        setTab(TAB_ENUM.THANKS);
      })
      .catch(() => {
        setLoadding(false);
      });
  };

  return (
    <div className={`page_checking`}>
      <Loading isLoading={loadding}>
        <Row
          className={`page_checking_row`}
          style={
            tab == TAB_ENUM.THANKS || (data || []).length == 0
              ? {display: 'none'}
              : {}
          }>
          <Col xl={8} className={`page_checking_row_col_left`}>
            <div className={`page_checking_row_col_left_logo`}>
              <a href={pathRouter.ROOT}>
                <LogoIcon />
              </a>
            </div>
            <div className={`page_checking_row_col_left_breadcrumb`}>
              <Breadcrumbs value={tab} />
            </div>
            <div className={`page_checking_row_col_left_content`}>
              {tab === TAB_ENUM.INFORMATION && (
                <InformationTab
                  onCartClick={handleOnCartClick}
                  onShoppingClick={() => setTab(TAB_ENUM.SHIPPING)}
                  params={params}
                  me={me}
                  onChangeData={onChangeData}
                />
              )}
              {tab === TAB_ENUM.SHIPPING && (
                <ShippingTab
                  onInformationClick={() => setTab(TAB_ENUM.INFORMATION)}
                  onPaymentClick={onPaymentClick}
                  params={params}
                  onChangeData={onChangeData}
                />
              )}
              {tab === TAB_ENUM.PAYMENT && (
                <PaymentTab
                  onShoppingClick={() => setTab(TAB_ENUM.SHIPPING)}
                  onSubmit={handleSubmit}
                  params={params}
                  optionSetting={
                    (
                      (settings || []).find(
                        (item) => item.key == SETTING_KEY.PAYMENT_SETTING,
                      ) || {}
                    ).options
                  }
                />
              )}
            </div>
            <hr style={{marginTop: '2rem'}} />
            <div className={`page_checking_row_col_left_tip`}>
              Delivery, Returns and Exchanges
            </div>
          </Col>
          <Col xl={4} className={`page_checking_row_col_right`}>
            <div className={`page_checking_row_col_right_information`}>
              <CartInfo data={data} params={params} />
            </div>
          </Col>
        </Row>
        {TAB_ENUM.THANKS == tab && <ThankYou data={params} />}
      </Loading>
      {(data || []).length == 0 && (
        <Empty>
          <a href={pathRouter.ROOT}>
            <button className={`thank-you-page_btn_shoping`}>
              KEEP SHOPPING
            </button>
          </a>
        </Empty>
      )}
    </div>
  );
};

export default CheckingPage;
