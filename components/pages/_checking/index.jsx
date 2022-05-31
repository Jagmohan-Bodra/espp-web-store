import {Row, Col, Button} from 'reactstrap';
import Router from 'next/router';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Form from '~/components/public/form/Form';
import Loading from '~/components/public/loading';
import {postOrderCreate} from '~/lib/services/order';
import CartDetails from './CartDetails';
import OrderDetailsComponent from './OrderDetailsComponent';
import pathRouter from '~/constants/path-router';
import Empty from '~/components/public/empty';
import ProceedToPayment from './ProceedToPayment';
import Link from 'next/link';

const CheckingComponent = () => {
  const data = useSelector((state) => state.cart.data);
  const me = useSelector((state) => state.me.data);
  const [loadding, setLoadding] = useState(false);
  const [params, setParams] = useState({});
  const [payment, setPayment] = useState();
  const {addresses} = (me || {}).customer || {};

  useEffect(() => {
    onChangeData({
      email: (me || {}).email,
      phone: (me || {}).phone,
      addressId: ((((me || {}).customer || {}).addresses || [])[0] || {})._id,
    });
  }, []);

  const onChangeData = (value) => {
    setParams({
      ...params,
      ...value,
    });
  };

  const onFinish = () => {
    const newData = {
      cartIds: data.map((item) => item._id),
      shippingAddress: {
        ...(addresses.find((address) => address._id == params.addressId) || {}),
        email: params.email,
        phone: params.phone,
      },
      payment: payment,
    };
    setLoadding(true);
    postOrderCreate(newData)
      .then(() => {
        setLoadding(false);
        Router.push({pathname: pathRouter.ORDER_FINAL});
      })
      .catch(() => setLoadding(false));
  };

  return (
    <div className={`checking-component`}>
      <Loading isLoading={loadding}>
        <div
          className={`checking-component_cart container`}
          style={(data || []).length < 1 ? {display: 'none'} : {}}>
          <Form onFinish={onFinish}>
            <Row>
              <Col xl={8}>
                <div className={`checking-component_cart_details`}>
                  {(data || []).map((item, index) => (
                    <div key={index}>
                      <CartDetails
                        item={{
                          ...(item.product || {}),
                          quantity: item.quantity,
                          quantityProduct: (item.product || {}).quantity,
                          id: item._id,
                        }}
                        setLoadding={setLoadding}
                      />
                      <hr />
                    </div>
                  ))}
                </div>
                <ProceedToPayment onChangeData={setPayment} />
              </Col>
              <Col xl={4}>
                <OrderDetailsComponent
                  data={data}
                  me={me}
                  onChangeData={onChangeData}
                  params={params}
                />
              </Col>
            </Row>
          </Form>
        </div>
      </Loading>
      {(data || []).length < 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '500px',
          }}>
          <Empty description={`There are no products in the cart`}>
            <Link href={pathRouter.SHOP_PAGE}>
              <Button type="primary">CONTINUE SHOPPING</Button>
            </Link>
          </Empty>
        </div>
      )}
    </div>
  );
};

export default CheckingComponent;
