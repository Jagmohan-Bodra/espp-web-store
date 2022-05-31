import {
  Col,
  Input,
  Row,
  Image,
  Space,
  Spin,
  Divider,
  Button,
  Statistic,
  Form,
  Empty,
} from 'antd';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  BillIcon,
  CloseLetter,
  MarketIcon,
  PhoneIcon,
  TrashIcon,
} from '../../../lib/icons';
import {deleteCart} from '../../../lib/services/cart';
import {getCartList} from '../../../reduxs/cart/action';
import {openPublicModal} from '../../modals/public-modal/common';
import AddressesModal from './AddressesModal';
import CreateAddressesModal from './CreateAddressesModal';
import PATH from '../../../constants/path-router';
import style from './styles.module.scss';
import {postOrderCreate} from '../../../lib/services/order';
import {useEffect} from 'react';

export const ProductDetails = ({
  id,
  images,
  description,
  name,
  brands,
  colors,
  publicPrice,
  quantity,
  setLoadding,
  quantityProduct,
}) => {
  const dispatch = useDispatch();
  const handleRemove = () => {
    openPublicModal(
      {
        header: 'Remove from cart',
        body: 'Do you agree to remove this product from the order?',
        labelNo: 'CANCEL',
        labelYes: 'AGREE',
      },
      SubmitRemove,
    );
  };

  const SubmitRemove = () => {
    setLoadding(true);
    deleteCart(id)
      .then(() => dispatch(getCartList()))
      .then(() => setLoadding(false))
      .catch(() => setLoadding(false));
  };
  return (
    <div className={style.checkout_shop_children}>
      <div className={style.cart_item_left}>
        <Space>
          <div className={style.img_wrap}>
            <Image src={images && images[0]} width={80} />
          </div>

          <div className={style.content}>
            <Link href={`#`}>
              <span className={style.link}>{name}</span>
            </Link>
            <div className={style.title}>{description}</div>
            <div className={style.sku}>
              Brands: {(brands || []).map((item) => item.name).join(' ,')}
            </div>
            <div className={style.sku}>
              Colors: {(colors || []).map((item) => item.name).join(' ,')}
            </div>
            <div className={style.good_desc}>
              <p className={style.stock_tip}>
                Only {quantityProduct || 0} item(s) in stock
              </p>
            </div>
          </div>
        </Space>
      </div>

      <div className={style.cart_item_middle}>
        <p className={style.current_price}>{publicPrice} $</p>
        <div className="operations">
          <span style={{cursor: 'pointer'}} onClick={handleRemove}>
            <TrashIcon />
          </span>
        </div>
      </div>

      <div className={style.cart_item_right}>
        <div className={style.automation_item_quantity}>
          <span>Quantity: {quantity}</span>
        </div>
      </div>
    </div>
  );
};

const EditInput = (props) => {
  const {value, setValue, text, icon} = props;
  const [isEdit, setEdit] = useState(false);
  return (
    <Row style={{justifyContent: 'space-between', marginTop: '10px'}}>
      <Col span={18}>
        {isEdit && (
          <Input value={value} onChange={setValue} placeholder={text} />
        )}
        {!isEdit && (
          <Space style={{height: '40px'}}>
            <div className={style.location__body_icon}>{icon}</div>
            <div className={style.location__body_title}>{value || text}</div>
          </Space>
        )}
      </Col>
      <Col span={6} style={{textAlign: 'right'}}>
        <div className={style.location__body_action} style={{height: '40px'}}>
          {isEdit && (
            <Button onClick={() => setEdit(false)} style={{width: '100%'}}>
              Save
            </Button>
          )}
          {!isEdit && (
            <span onClick={() => setEdit(true)} style={{lineHeight: '2.4em'}}>
              {' '}
              Edit{' '}
            </span>
          )}
        </div>
      </Col>
    </Row>
  );
};

const SelectAddressForm = (props) => {
  const {value, setValue, text, icon} = props;
  const me = useSelector((state) => state.me.data);
  const {addresses} = (me || {}).customer || {};
  const address = (addresses || []).find((item) => item._id == value) || {};

  const handleANewAddress = () => {
    openPublicModal(
      {
        data: {},
        header: 'Add a new delivery address',
        isNullFooter: true,
        bodycomponent: CreateAddressesModal,
        width: 1000,
      },
      (results) => setValue(results),
    );
  };

  const handleEdit = () => {
    openPublicModal(
      {
        data: value,
        header: (
          <Space size={`large`}>
            <div>Addresses</div> |
            <div
              className={style.location__body_action}
              onClick={() => handleANewAddress()}>
              {' '}
              Add new address{' '}
            </div>
          </Space>
        ),
        labelNo: 'HUNDRED',
        labelYes: 'SAVE',
        width: 1000,
        bodycomponent: AddressesModal,
      },
      (results) => setValue(results),
    );
  };
  return (
    <Row style={{justifyContent: 'space-between'}}>
      <Col span={18}>
        <Space style={{height: '40px'}}>
          <div className={style.location__body_icon}>{icon}</div>
          <div className={style.location__body_title}>{text}</div>
        </Space>
      </Col>
      <Col span={6}>
        <div
          className={style.location__body_action}
          style={{height: '40px', textAlign: 'right'}}>
          <span onClick={() => handleEdit()} style={{lineHeight: '2.4em'}}>
            {' '}
            Edit{' '}
          </span>
        </div>
      </Col>
      {address.type && (
        <Col span={24}>
          <span className={style.location__body_details}>
            <span className={style.address_tag_label}>{address.type}</span>
            {`${address.address || ''} ${address.wards || ''} ${
              address.district || ''
            } ${address.city || ''}`}
          </span>
        </Col>
      )}
    </Row>
  );
};

export const OrderDetailsComponent = ({
  data,
  me,
  onChangeData,
  params,
  handleSubmit,
}) => {
  const {name} = me || {};
  // const { customer } = me || {};
  // const { addresses } = customer || {};
  // const { address, city, district, wards } = (addresses || [])[0] || {};
  // const fullAddress = `${address || ""} ${wards || ""} ${district || ""} ${city || ""}`.replace(/\s+/g, " ");

  const count = (data || []).reduce(
    (total, item) => total + parseInt(item.quantity),
    0,
  );
  const total = (data || []).reduce(
    (total, item) => total + item.product.publicPrice * parseInt(item.quantity),
    0,
  );
  return (
    <div className={style.right_container_cr} style={{marginLeft: '15px'}}>
      <div className={style.summary_section}>
        <div className={style.summary_section_content}>
          <div className={style.location__label}>Delivery address</div>
          <div className={style.location__body}>
            <Form.Item name="Address" rules={[{required: true}]}>
              <div className={style.location__body_content}>
                <SelectAddressForm
                  icon={<MarketIcon />}
                  value={params.addressId}
                  setValue={(value) => onChangeData({addressId: value})}
                  text={name}
                />
                {/* <Row style={{ justifyContent: "space-between" }}>
                <Space >
                  <div className={style.location__body_icon}><MarketIcon /></div>
                  <div className={style.location__body_title}>Vuong Phuoc Vi</div>
                </Space>
                <div className={style.location__body_action}><EditInput /></div>
              </Row> */}
              </div>
            </Form.Item>
            <div className={style.location__body_content}>
              <SelectAddressForm
                icon={<BillIcon />}
                value={params.billingAddressId}
                setValue={(value) => onChangeData({billingAddressId: value})}
                text={'Billing information'}
              />
            </div>
            <Form.Item name="Phone" rules={[{required: true}]}>
              <div className={style.location__body_content}>
                <EditInput
                  value={params.phone}
                  setValue={(e) => onChangeData({phone: e.target.value})}
                  text={'Phone'}
                  icon={<PhoneIcon />}
                />
              </div>
            </Form.Item>
            <Form.Item name="Email" rules={[{required: true, type: 'email'}]}>
              <div className={style.location__body_content}>
                <EditInput
                  value={params.email}
                  setValue={(e) => onChangeData({email: e.target.value})}
                  text={'Email'}
                  icon={<CloseLetter />}
                />
              </div>
            </Form.Item>
            {/* <div className={style.location__body_content}>
              <EditInput
                value={params.taxCode}
                setValue={(e) => onChangeData({ taxCode: e.target.value })}
                text={'Tax code'}
                icon={<UsdCircle />}
              />
            </div> */}
          </div>
        </div>
      </div>
      <div className={style.summary_section}>
        <div className={style.summary_section_heading}> Order Summary</div>
        <div className={style.summary_section_content}>
          <Row style={{justifyContent: 'space-between'}}>
            <Col>
              <span className={style.checkout_summary_label}>
                Provisional({count} products)
              </span>
            </Col>
            <Col>
              <span className={style.checkout_summary_value}>
                <Statistic
                  value={total}
                  suffix={`$`}
                  valueStyle={{fontSize: '16px', fontWeight: 'bold'}}
                />
              </span>
            </Col>
          </Row>
          <Row style={{justifyContent: 'space-between'}}>
            <Col>
              <span className={style.checkout_summary_label}>
                Delivery charges
              </span>
            </Col>
            <Col>
              <span className={style.checkout_summary_value}>0 ₫</span>
            </Col>
          </Row>
          <Row style={{justifyContent: 'space-between', margin: '10px 0'}}>
            <Col span={16}>
              <input
                style={{width: '100%', height: '30px'}}
                placeholder={`Discount code (code can only be used once)`}
              />
            </Col>
            <Col span={8}>
              <button style={{width: '100%', height: '30px'}}> APPLY</button>
            </Col>
          </Row>
          <Row style={{justifyContent: 'space-between'}}>
            <Col>
              <span className={`checkout-order-total-title`}>Total</span>
            </Col>
            <Col>
              <div className={style.checkout_order_total_fee}>
                <span className={style.checkout_summary_value}>
                  <Statistic
                    value={total}
                    suffix={`$`}
                    valueStyle={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#f57224',
                    }}
                  />
                </span>
                <small className={style.checkout_order_total_fee_tip}>
                  VAT included (if any)
                </small>
              </div>
            </Col>
          </Row>
          <Row style={{marginTop: '15px'}}>
            <Col span={24}>
              {/* <Link href={PATH.ORDER_FINAL}> */}
              <Button
                className={style.cart_confirmation}
                onClick={() => handleSubmit && handleSubmit()}
                htmlType={`submit`}>
                ORDER
              </Button>
              {/* </Link> */}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

const PaymentTags = (props) => {
  const {src, title, active} = props;

  return (
    <div
      className={style.proceed_to_payment_content}
      style={
        active
          ? {
              backgroundColor: 'white',
              border: 'none',
              margin: '0',
              paddingTop: '22px',
            }
          : {}
      }>
      <div>
        <img className={style.proceed_to_payment_image} src={src} />
      </div>
      <div>
        <div className={style.proceed_to_payment_content_title}>{title}</div>
        {/* <div className={style.proceed_to_payment_content_subtitle}></div> */}
      </div>
    </div>
  );
};

const PAYMENT_TAGS = {
  PAYPAL: 'PAYPAL',
  PAYNOW: 'PAYNOW',
  CASH_ON_DELIVERY: 'CASH_ON_DELIVERY',
  BANK_TRANSFER: 'BANK_TRANSFER',
};

const PAYMENT_TAGS_OPTION = [
  {
    key: PAYMENT_TAGS.PAYPAL,
    src: 'data:image/png;base64,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',
    title: 'PayPal',
  },
  {
    key: PAYMENT_TAGS.PAYNOW,
    src: 'https://abs.org.sg/images/default-album/abs-logo28f7a99f299c69658b7dff00006ed795.png?sfvrsn=1',
    title: 'PayNow',
  },
  {
    key: PAYMENT_TAGS.CASH_ON_DELIVERY,
    src: 'https://laz-img-cdn.alicdn.com/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png',
    title: 'Cash On Delivery',
  },
  {
    key: PAYMENT_TAGS.BANK_TRANSFER,
    src: 'https://laz-img-cdn.alicdn.com/tfs/TB1Iey_osKfxu4jSZPfXXb3dXXa-96-96.png',
    title: 'Bank Transfer',
  },
];

const renderPaymentMethod = (tag) => {
  switch (tag) {
    case PAYMENT_TAGS.PAYPAL:
      return (
        <div>
          <Button>Checkout with paypal</Button>
        </div>
      );
    case PAYMENT_TAGS.PAYNOW:
      return <div> paynow </div>;
    case PAYMENT_TAGS.CASH_ON_DELIVERY:
      return <div>CASH_ON_DELIVERY</div>;
    case PAYMENT_TAGS.BANK_TRANSFER:
      return <div>BANK_TRANSFER</div>;
    default:
      break;
  }
};

const ProceedToPayment = ({onChangeData}) => {
  const [tag, setTags] = useState();

  return (
    <div className={style.proceed_to_payment}>
      <Form.Item name="Payment" rules={[{required: true}]}>
        <div className={style.proceed_to_payment_title}>Proceed To Payment</div>
        <Row className={style.proceed_to_payment_body}>
          {PAYMENT_TAGS_OPTION.map((item) => (
            <Col
              key={item.key}
              span={6}
              style={{backgroundColor: '#f5f6f9'}}
              onClick={() => {
                setTags(item.key);
                onChangeData && onChangeData(item.key);
              }}>
              <PaymentTags {...item} active={item.key == tag} />
            </Col>
          ))}
        </Row>
        <Row style={{display: tag ? 'block' : 'none'}}>
          <Col span={24}>
            <div className={style.proceed_to_payment_method}>
              <div className={`proceed_to_payment_method_content`}>
                {renderPaymentMethod(tag)}
              </div>
            </div>
          </Col>
        </Row>
      </Form.Item>
    </div>
  );
};

const OrderCheckout = () => {
  const data = useSelector((state) => state.cart.data);
  const me = useSelector((state) => state.me.data);
  const [loadding, setLoadding] = useState(false);
  const [params, setParams] = useState({});
  const [payment, setPayment] = useState();
  const router = useRouter();
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
        router.push(PATH.ORDER_FINAL);
      })
      .catch(() => setLoadding(false));
  };

  return (
    <div style={{backgroundColor: '#f4f4f4'}}>
      {(data || []).length > 0 && (
        <Spin spinning={loadding}>
          <div className={`container`} style={{paddingBottom: '10vh'}}>
            <Form
              onFinish={onFinish}
              fields={[
                {name: ['Payment'], value: payment},
                {name: ['Address'], value: params.addressId},
                {name: ['Email'], value: params.email},
                {name: ['Phone'], value: params.phone},
              ]}>
              <Row>
                <Col span={16}>
                  <div className={style.scroll_height_checkout}>
                    {(data || []).map((item, index) => (
                      <span key={index}>
                        <ProductDetails
                          {...(item.product || {})}
                          quantity={item.quantity}
                          quantityProduct={item.product.quantity}
                          id={item._id}
                          setLoadding={setLoadding}
                        />
                        <Divider style={{margin: '0'}} />
                      </span>
                    ))}
                    {(data || []).length < 1 && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '70%',
                        }}>
                        {' '}
                        <Empty />
                      </div>
                    )}
                  </div>
                  <ProceedToPayment onChangeData={setPayment} />
                </Col>
                <Col span={8}>
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
        </Spin>
      )}
      {(data || []).length < 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '500px',
          }}>
          <Empty description={`There are no products in the cart`}>
            <Link href={PATH.PRODUCT_LIST}>
              <Button type="primary">CONTINUE SHOPPING</Button>
            </Link>
          </Empty>
        </div>
      )}
    </div>
  );
};

export default OrderCheckout;
