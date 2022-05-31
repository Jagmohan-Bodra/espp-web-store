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
  Empty,
} from 'antd';
import Link from 'next/link';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TrashIcon} from '../../../lib/icons';
import {updateCart, deleteCart} from '../../../lib/services/cart';
import {getCartList} from '../../../reduxs/cart/action';
import {openPublicModal} from '../../modals/public-modal/common';
import PATH from '../../../constants/path-router';
import style from './styles.module.scss';

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
  const handleDown = () => {
    if (quantity > 1) {
      setLoadding(true);
      updateCart(id, {quantity: quantity - 1})
        .then(() => dispatch(getCartList()))
        .then(() => setLoadding(false))
        .catch(() => setLoadding(false));
    }
  };

  const handleUp = () => {
    setLoadding(true);
    updateCart(id, {quantity: quantity + 1})
      .then(() => dispatch(getCartList()))
      .then(() => setLoadding(false))
      .catch(() => setLoadding(false));
  };

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
          <Space size={0}>
            <button
              style={{width: '31px', height: '31px'}}
              onClick={handleDown}
              disabled={quantity <= 1}>
              {' '}
              -{' '}
            </button>
            <span>
              {' '}
              <Input value={quantity} />{' '}
            </span>
            <button style={{width: '31px', height: '31px'}} onClick={handleUp}>
              {' '}
              +{' '}
            </button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export const OrderDetailsComponent = ({data, me}) => {
  const {customer} = me || {};
  const {addresses} = customer || {};
  const {address, city, district, wards} = (addresses || [])[0] || {};
  const fullAddress = `${address || ''} ${wards || ''} ${district || ''} ${
    city || ''
  }`.replace(/\s+/g, ' ');

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
          <div className={style.location__label}>Address</div>
          <div className={style.location__body}>{fullAddress}</div>
        </div>
      </div>
      <div className={style.summary_section}>
        <div className={style.summary_section_heading}> Information Order</div>
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
              <Link href={PATH.ORDER_CHECKOUT}>
                <Button className={style.cart_confirmation}>
                  CART CONFIRMATION
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

const OrderDetails = () => {
  const data = useSelector((state) => state.cart.data);
  const me = useSelector((state) => state.me.data);
  const [loadding, setLoadding] = useState(false);
  return (
    <div style={{backgroundColor: '#f4f4f4'}}>
      {(data || []).length > 0 && (
        <Spin spinning={loadding}>
          <div className={`container`}>
            <Row>
              <Col span={16}>
                <div className={style.scroll_height}>
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
                      <Empty />
                    </div>
                  )}
                </div>
              </Col>
              <Col span={8}>
                <OrderDetailsComponent data={data} me={me} />
              </Col>
            </Row>
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

export default OrderDetails;
