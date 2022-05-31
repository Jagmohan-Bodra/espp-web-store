import {Input} from 'reactstrap';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {openPublicModal} from '~/components/modals/public-modal/common';
import {
  openRightModal,
  closeRightModal,
} from '~/components/modals/right-modal/common';
import {deleteCart, updateCart} from '~/lib/services/cart';
import {getCartList, isAllowCheckout} from '~/reduxs/cart/action';
import Loading from '~/components/public/loading';
import Link from 'next/link';
import {func} from '~/helpers/common';
import pathRouter from '~/constants/path-router';

const funcAwait = func(500);

const HeaderTip = () => {
  const data = useSelector((state) => state.cart.data);
  return (
    <div>
      {`${(data || []).length} item${(data || []).length > 1 ? 's' : ''}`}{' '}
    </div>
  );
};

const ProductDetails = ({
  id,
  imageFullPaths,
  name,
  brands,
  colors,
  publicPrice,
  quantity,
  moq,
  setLoadding,
  quantityProduct,
  membershipPrice,
}) => {
  const dispatch = useDispatch();
  const [num, setNum] = useState(1);
  const privatePrice =
    Number.parseFloat(membershipPrice) < Number.parseFloat(publicPrice)
      ? membershipPrice
      : undefined;

  useEffect(() => {
    setNum(quantity || 1);
    checkAllowCheckout(quantity);
  }, [quantity]);

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

  const handleChange = (value) => {
    setLoadding(true);
    updateCart(id, {quantity: value || 1})
      .then(() => dispatch(getCartList()))
      .then(() => setLoadding(false))
      .catch(() => setLoadding(false));
  };

  const checkAllowCheckout = (qty) => {
    if (qty < moq || qty > quantityProduct) {
      dispatch(isAllowCheckout(false));
    } else {
      dispatch(isAllowCheckout(true));
    }
  };

  const handleChangeQuantity = (value) => {
    let qty = value || 1;
    setNum(qty);
    funcAwait(() => handleChange(qty));
  };

  const SubmitRemove = () => {
    setLoadding(true);
    deleteCart(id)
      .then(() => dispatch(getCartList()))
      .then(() => setLoadding(false))
      .then(() => closeRightModal())
      .catch(() => setLoadding(false));
  };

  return (
    <div className={'product-details'}>
      <div className={'product-details_left'}>
        <div className={'product-details_left_box'}>
          <div className={'product-details_left_box_image'}>
            <img src={imageFullPaths && imageFullPaths[0]} />
          </div>
        </div>
      </div>

      <div className={'product-details_middle'}>
        <div className={'product-details_middle_box_content'}>
          <Link href={`#`}>
            <span className={'product-details_middle_box_content_link'}>
              {name}
            </span>
          </Link>
          <div className={'product-details_middle_box_content_price'}>
            <span
              className={'product-details_middle_box_content_price_public'}
              style={privatePrice ? {textDecoration: 'line-through'} : {}}>
              S${publicPrice}
            </span>
            <span
              className={'product-details_middle_box_content_price_private'}>
              {privatePrice ? `S$${privatePrice}` : ''}
            </span>
          </div>
          <div className={'product-details_middle_box_content_sku'}>
            Brands: {(brands || []).map((item) => item.name).join(' ,')}
          </div>
          <div className={'product-details_middle_box_content_sku mb-4'}>
            Colors: {(colors || []).map((item) => item.name).join(' ,')}
          </div>
          <div className={'product-details_middle_box_content_good_desc'}>
            {num > quantityProduct && (
              <div
                className={
                  'product-details_middle_box_content_good_desc_stock_tip'
                }>
                Only {quantityProduct || 0} item(s) in stock
              </div>
            )}
            {num < moq && (
              <div
                className={
                  'product-details_middle_box_content_good_desc_stock_tip'
                }>
                Minimum order quantity is {moq}
              </div>
            )}
          </div>
        </div>
        <div className={'product-details_middle_box_input'}>
          {/* <button
            className={'product-details_middle_box_input_btn'}
            onClick={handleDown}
            disabled={quantity <= 1}>
            {' - '}
          </button> */}
          <Input
            className={`product-details_middle_box_input_input`}
            min={1}
            max={100000}
            type="number"
            value={num}
            onChange={(e) => handleChangeQuantity(e.target.value)}
          />
          {/* <button
            className={'product-details_middle_box_input_btn'}
            onClick={handleUp}>
            {' + '}
          </button> */}
        </div>
      </div>

      <div className={'product-details_right'}>
        <span style={{cursor: 'pointer'}} onClick={handleRemove}>
          Remove
          {/* <TrashIcon /> */}
        </span>
      </div>
    </div>
  );
};

const Body = ({id}) => {
  const data = useSelector((state) => state.cart.data);
  const obj = data.find((item) => item._id == id) || {};
  const [loadding, setLoadding] = useState(false);
  return (
    <div>
      <Loading isLoading={loadding}>
        <ProductDetails
          {...(obj.product || {})}
          quantity={obj.quantity}
          quantityProduct={(obj.product || {}).quantity}
          moq={(obj.product || {}).moq}
          id={obj._id}
          setLoadding={setLoadding}
        />
      </Loading>
    </div>
  );
};

const Footer = () => {
  const isAllow = useSelector((state) => state.cart.isAllowCheckout);
  const data = useSelector((state) => state.cart.data);
  const total = (data || []).reduce((total, item) => {
    const {publicPrice, membershipPrice} = item.product || {};
    const price =
      Number.parseFloat(membershipPrice) < Number.parseFloat(publicPrice)
        ? membershipPrice
        : publicPrice;
    return total + price * parseFloat(item.quantity);
  }, 0);

  const handleClose = () => {
    closeRightModal();
  };

  return (
    <div className={`product-details-footer`}>
      <div className={`product-details-footer_total`}>
        <div>Total</div>
        <div>
          <b>S${total}</b>
        </div>
      </div>
      <a href={pathRouter.ORDER_IN_SHOP}>
        <button
          className={`product-details-footer_btn cart`}
          disabled={!isAllow}>
          GO TO CART
        </button>
      </a>
      <a href={pathRouter.CHEKING_ORDER}>
        <button
          className={`product-details-footer_btn checking`}
          disabled={!isAllow}>
          CHECK OUT
        </button>
      </a>
      <div className={`product-details-footer_link`} onClick={handleClose}>
        Continue Shopping
      </div>
    </div>
  );
};

export const openCartDetailsModal = (id) => {
  openRightModal({
    header: 'Your Cart',
    headerTip: <HeaderTip />,
    body: <Body id={id} />,
    footer: <Footer />,
  });
};

export default openCartDetailsModal;
