import {Row, Col, Button, Input} from 'reactstrap';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import { TrashIcon } from "../../../lib/icons";
import {updateCart} from '../../../lib/services/cart';
import {getCartList} from '../../../reduxs/cart/action';
import {reqSetVisible} from '../../../reduxs/public-modal/action';
import PATH from '../../../constants/path-router';
import style from './styles.module.scss';
import Loading from '~/components/public/loading';
import {func} from '~/helpers/common';
import FormatNumberText from '~/components/public/format-number-text';

const funcAwait = func(1000);

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
  const [num, setNum] = useState(1);
  useEffect(() => {
    setNum(quantity || 1);
  }, [quantity]);
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

  const handleChange = (value) => {
    setLoadding(true);
    updateCart(id, {quantity: value || 1})
      .then(() => dispatch(getCartList()))
      .then(() => setLoadding(false))
      .catch(() => setLoadding(false));
  };

  // const handleRemove = () => {
  //   openPublicModal({
  //     header: "Remove from cart",
  //     body: "Do you agree to remove this product from the order?",
  //     labelNo: "CANCEL",
  //     labelYes: "AGREE",
  //   }, SubmitRemove);
  // }

  // const SubmitRemove = () => {
  //   setLoadding(true);
  //   deleteCart(id)
  //     .then(() => dispatch(getCartList()))
  //     .then(() => setLoadding(false))
  //     .catch(() => setLoadding(false));
  // }
  return (
    <div className={style.checkout_shop_children}>
      <div className={style.cart_item_left}>
        <div>
          <div className={style.img_wrap}>
            <img src={images && images[0]} width={80} />
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
        </div>
      </div>

      <div className={style.cart_item_middle}>
        <p className={style.current_price}>${publicPrice}</p>
        <div className="operations">
          {/* <span style={{ cursor: "pointer" }} onClick={handleRemove}><TrashIcon /></span> */}
        </div>
      </div>

      <div className={style.cart_item_right}>
        <div className={style.automation_item_quantity}>
          <div className={style.automation_item_quantity_group}>
            <button
              style={{width: '40px', height: '31px'}}
              onClick={handleDown}
              disabled={quantity <= 1}>
              {' '}
              -{' '}
            </button>
            <span>
              {' '}
              <Input
                value={num}
                stype={{borderRadius: '0'}}
                type="number"
                min={1}
                max={99999}
                onChange={(e) => {
                  setNum(e.target.value);
                  funcAwait(() => handleChange(e.target.value));
                }}
              />{' '}
            </span>
            <button style={{width: '40px', height: '31px'}} onClick={handleUp}>
              {' '}
              +{' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderDetailsComponent = ({data, me, setVisible}) => {
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
    <div className={style.right_container_cr}>
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
            <Col
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                display: 'flex',
              }}>
              <span className={style.checkout_summary_value}>
                <FormatNumberText value={parseFloat(total)} />
                {/* <Statistic
                  value={total}
                  suffix={`$`}
                  valueStyle={{fontSize: '16px', fontWeight: 'bold'}}
                /> */}
              </span>
            </Col>
          </Row>
          <Row style={{justifyContent: 'space-between'}}>
            <Col xl={8}>
              <span className={style.checkout_summary_label}>
                Delivery charges
              </span>
            </Col>
            <Col
              xl={4}
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                display: 'flex',
              }}>
              <span className={style.checkout_summary_value}>$0</span>
            </Col>
          </Row>
          {/* <Row style={{margin: '10px -15px'}}>
            <Col xl={8}>
              <input
                style={{width: '100%', height: '30px'}}
                placeholder={`Discount code (code can only be used once)`}
              />
            </Col>
            <Col xl={4} style={{ justifyContent: "flex-end",flexDirection: "row", display: "flex" }}>
              <button style={{width: '100%', height: '30px'}}> APPLY</button>
            </Col>
          </Row> */}
          <Row style={{justifyContent: 'space-between'}}>
            <Col xl={6}>
              <span className={`checkout-order-total-title`}>Total</span>
            </Col>
            <Col
              xl={6}
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                display: 'flex',
              }}>
              <div className={style.checkout_order_total_fee}>
                <span className={style.checkout_summary_value}>
                  <FormatNumberText value={parseFloat(total)} />
                </span>
                <small className={style.checkout_order_total_fee_tip}>
                  VAT included (if any)
                </small>
              </div>
            </Col>
          </Row>
          <Row style={{marginTop: '15px'}}>
            <Col xl={6}>
              <Link href={PATH.CHEKING_ORDER}>
                <Button
                  className={style.cart_confirmation}
                  onClick={() => setVisible(false)}>
                  BY NOW
                </Button>
              </Link>
            </Col>
            <Col xl={6}>
              <Link href={PATH.ORDER_IN_SHOP}>
                <Button
                  className={style.un_cart_confirmation}
                  onClick={() => setVisible(false)}>
                  GO TO CART
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

const CartDetails = ({id}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart.data);
  const obj = data.find((item) => item._id == id) || {};
  const me = useSelector((state) => state.me.data);
  const [loadding, setLoadding] = useState(false);
  return (
    <div style={{backgroundColor: '#f4f4f4'}}>
      <Loading isLoading={loadding}>
        <div className={`container`}>
          <Row style={{padding: '15px 0'}}>
            <Col xl={8}>
              {obj && (
                <ProductDetails
                  {...(obj.product || {})}
                  quantity={obj.quantity}
                  quantityProduct={(obj.product || {}).quantity}
                  id={obj._id}
                  setLoadding={setLoadding}
                />
              )}
            </Col>
            <Col xl={4}>
              <OrderDetailsComponent
                data={data}
                me={me}
                setVisible={(data) => dispatch(reqSetVisible(data))}
              />
            </Col>
          </Row>
        </div>
      </Loading>
    </div>
  );
};

export default CartDetails;
