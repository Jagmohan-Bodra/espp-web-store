import {Input} from 'reactstrap';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {openPublicModal} from '~/components/modals/public-modal/common';
import {deleteCart, updateCart} from '~/lib/services/cart';
import {getCartList} from '~/reduxs/cart/action';
import {func} from '~/helpers/common';

const funcAwait = func(500);

const MyCartDetails = ({
  id,
  images,
  name,
  colors,
  publicPrice,
  quantity,
  quantityProduct,
  moq,
  setLoadding,
  membershipPrice,
  onCheckProduct,
  isCheckAll,
  checkIsError,
}) => {
  const dispatch = useDispatch();
  const [num, setNum] = useState(1);
  const [isCheck, setIsCheck] = useState(true);

  const privatePrice =
    Number.parseFloat(membershipPrice) < Number.parseFloat(publicPrice)
      ? membershipPrice
      : undefined;
  const total = parseFloat(privatePrice || publicPrice) * quantity;

  useEffect(() => {
    setNum(quantity || 1);
    checkError(quantity);
  }, [quantity]);

  useEffect(() => {
    setIsCheck(isCheckAll);
  }, [isCheckAll]);

  const onChangeCheck = (e) => {
    let value = e.target.checked;
    setIsCheck(value);
    onCheckProduct && onCheckProduct(value, id);
  };

  const handleRemove = () => {
    openPublicModal(
      {
        header: 'Remove from cart',
        body: 'Do you agree to remove this product from the order?',
        labelNo: 'CANCEL',
        labelYes: 'AGREE',
        width: '400px',
      },
      SubmitRemove,
    );
  };

  const checkError = (qty) => {
    if (qty < moq || qty > quantityProduct) {
      checkIsError && checkIsError(true, id);
    } else {
      checkIsError && checkIsError(false, id);
    }
  };

  const decreaseValue = (value) => {
    if (isNaN(value) || value < 2) {
      return;
    }
    let qty = value - 1;
    handleChangeQuantity(qty);
  };

  const increaseValue = (value) => {
    let qty = isNaN(value) ? 1 : value + 1;
    handleChangeQuantity(qty);
  };

  const handleChangeQuantity = (value) => {
    let qty = value || 1;
    setNum(qty);
    funcAwait(() => updateQuantity(qty));
  };

  const updateQuantity = (value) => {
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

  const getPrice = () => {
    return (
      <div className="item-product-price">
        <span
          className={'price_public'}
          style={privatePrice ? {textDecoration: 'line-through'} : {}}>
          S${publicPrice}
        </span>
        <span className={'price_private'}>
          {privatePrice ? `S$${privatePrice}` : ''}
        </span>
      </div>
    );
  };

  const getQuantity = () => {
    return (
      <div className="item-product-quantity">
        {quantity < moq && (
          <p className="product_error_moq">Minimum order quantity is {moq}</p>
        )}
        {quantity > quantityProduct && (
          <p className="product_error_moq">
            Only {quantityProduct || 0} item(s) in stock
          </p>
        )}
        <div className="product_box_quantity">
          <div
            className="quantity-decrease value-button"
            onClick={() => decreaseValue(num)}>
            -
          </div>
          <Input
            className={`product_input_quantity`}
            min={1}
            max={100000}
            type="number"
            value={num}
            onChange={(e) => handleChangeQuantity(e.target.value)}
          />
          <div
            className="quantity-increase value-button"
            onClick={() => increaseValue(num)}>
            +
          </div>
        </div>
      </div>
    );
  };

  const getButtonRemove = () => {
    return (
      <div className="btn-cart-remove-item" onClick={handleRemove}>
        Remove
      </div>
    );
  };

  return (
    <div className="d-table product__row">
      <div className="d-table-cell product__col">
        <div className="cart_checkbox_custom">
          <label className="container_checkbox">
            <Input type="checkbox" checked={isCheck} onChange={onChangeCheck} />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
      <div className="d-table-cell product__col">
        <div>
          <img
            src={images && images[0]}
            width={80}
            className={`product__col_img`}
          />
          <div className="product__col_product_text">
            <div className="product__col_product_text_name">{name}</div>
            <div className="mt-2">
              Colors: {(colors || []).map((item) => item.name).join(' ,')}
            </div>
            <div className="d-lg-none">
              {getPrice()}
              {getQuantity()}
            </div>
          </div>
        </div>
      </div>
      <div className="product__col d-none d-lg-table-cell">{getPrice()}</div>
      <div className="product__col d-none d-lg-table-cell">
        {getQuantity()}
        {getButtonRemove()}
      </div>
      <div className="d-lg-table-cell product__col">
        S${isCheck ? total.toFixed(2) : 0}
        <div className="d-lg-none mt-4">{getButtonRemove()}</div>
      </div>
    </div>
  );
};

export default MyCartDetails;
