import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Input} from 'reactstrap';
import {openPublicModal} from '~/components/modals/public-modal/common';
import {func} from '~/helpers/common';
import {TrashIcon} from '~/lib/icons';
import {deleteCart, updateCart} from '~/lib/services/cart';
import {getCartList} from '~/reduxs/cart/action';

const funcAwait = func(1000);
const MyCartProductDetails = ({
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

  const SubmitRemove = () => {
    setLoadding(true);
    deleteCart(id)
      .then(() => dispatch(getCartList()))
      .then(() => setLoadding(false))
      .catch(() => setLoadding(false));
  };
  return (
    <div className={'my-cart-product-details'}>
      <div className={'my-cart-product-details_left'}>
        <div className={'my-cart-product-details_left_box'}>
          <div className={'my-cart-product-details_left_box_image'}>
            <img src={images && images[0]} width={80} />
          </div>

          <div className={'my-cart-product-details_left_box_content'}>
            <Link href={`#`}>
              <span className={'my-cart-product-details_left_box_content_link'}>
                {name}
              </span>
            </Link>
            <div
              className={
                'my-cart-product-details_left_box_content_description'
              }>
              {description}
            </div>
            <div className={'my-cart-product-details_left_box_content_sku'}>
              Brands: {(brands || []).map((item) => item.name).join(' ,')}
            </div>
            <div className={'my-cart-product-details_left_box_content_sku'}>
              Colors: {(colors || []).map((item) => item.name).join(' ,')}
            </div>
            <div
              className={'my-cart-product-details_left_box_content_good_desc'}>
              <div
                className={
                  'my-cart-product-details_left_box_good_desc_stock_tip'
                }>
                Only {quantityProduct || 0} item(s) in stock
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={'my-cart-product-details_middle'}>
        <div className={'my-cart-product-details_middle_price'}>
          <span
            className={'my-cart-product-details_middle_price_public'}
            style={privatePrice ? {textDecoration: 'line-through'} : {}}>
            {publicPrice}
          </span>
          <span className={'my-cart-product-details_middle_price_private'}>
            {privatePrice ? `$${privatePrice}` : ''}
          </span>
        </div>
        <div>
          <span style={{cursor: 'pointer'}} onClick={handleRemove}>
            <TrashIcon />
          </span>
        </div>
      </div>

      <div className={'my-cart-product-details_right'}>
        <div className={'my-cart-product-details_right_box'}>
          <button
            className={'my-cart-product-details_right_box_btn'}
            onClick={handleDown}
            disabled={quantity <= 1}>
            {' - '}
          </button>
          <Input
            className={`my-cart-product-details_right_box_input`}
            min={1}
            max={100000}
            type="number"
            value={num}
            onChange={(e) => {
              setNum(e.target.value);
              funcAwait(() => handleChange(e.target.value));
            }}
          />
          <button
            className={'my-cart-product-details_right_box_btn'}
            onClick={handleUp}>
            {' + '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCartProductDetails;
