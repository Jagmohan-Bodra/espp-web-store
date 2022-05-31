import {Input} from 'reactstrap';
import {useEffect, useState} from 'react';
import {openPublicModal} from '~/components/modals/public-modal/common';

const TableRow = ({
  images,
  name,
  colors,
  publicPrice,
  quantity,
  setQuantity,
  quantityProduct,
  moq,
  membershipPrice,
  isCheck,
  onChangeCheck,
  SubmitRemove,
}) => {
  const [num, setNum] = useState(1);

  const privatePrice =
    Number.parseFloat(membershipPrice) < Number.parseFloat(publicPrice)
      ? membershipPrice
      : undefined;
  const total = parseFloat(privatePrice || publicPrice) * quantity;

  useEffect(() => {
    setNum(quantity || 1);
  }, [quantity]);

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
    if (qty > quantityProduct) {
      qty = quantityProduct;
    }
    setNum(qty);
    setQuantity && setQuantity(qty);
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
            <div>
              Colors: {(colors || []).map((item) => item.name).join(' ,')}
            </div>
          </div>
        </div>
      </div>
      <div className="d-table-cell product__col">
        <span
          className={'price_public'}
          style={privatePrice ? {textDecoration: 'line-through'} : {}}>
          S${publicPrice}
        </span>
        <span className={'price_private'}>
          {privatePrice ? `S$${privatePrice}` : ''}
        </span>
      </div>
      <div className="d-table-cell product__col">
        {quantity < moq && (
          <p className="product_error_moq">Minimum order quantity is {moq}</p>
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
          <div className="btn-cart-remove-item" onClick={handleRemove}>
            Remove
          </div>
        </div>
      </div>
      <div className="d-lg-table-cell product__col">
        S${isCheck ? total.toFixed(2) : 0}
      </div>
    </div>
  );
};

export default TableRow;
