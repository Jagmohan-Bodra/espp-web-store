import Link from 'next/link';
import {useDispatch} from 'react-redux';
import {openPublicModal} from '~/components/modals/public-modal/common';
import {TrashIcon} from '~/lib/icons';
import {deleteCart} from '~/lib/services/cart';
import {getCartList} from '~/reduxs/cart/action';

const CartDetails = (props) => {
  const {item, setLoadding} = props;
  const {
    id,
    images,
    description,
    name,
    brands,
    colors,
    publicPrice,
    quantity,
    quantityProduct,
    membershipPrice,
  } = item || {};
  const privatePrice =
    Number.parseFloat(membershipPrice) < Number.parseFloat(publicPrice)
      ? membershipPrice
      : undefined;

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
    <div className={`cart-details-component`}>
      <div className={`cart-details-component_left`}>
        <div className={`cart-details-component_left_body`}>
          <div className={`cart-details-component_left_body_image`}>
            <img src={images && images[0]} width={80} />
          </div>

          <div className={`cart-details-component_left_body_content`}>
            <Link
              href={`#`}
              className={`cart-details-component_left_body_content_link`}>
              {name}
            </Link>
            <div
              className={`cart-details-component_left_body_content_description`}>
              {description}
            </div>
            <div className={`cart-details-component_left_body_content_brand`}>
              Brands: {(brands || []).map((item) => item.name).join(' ,')}
            </div>
            <div className={`cart-details-component_left_body_content_color`}>
              Colors: {(colors || []).map((item) => item.name).join(' ,')}
            </div>
            <div
              className={`cart-details-component_left_body_content_good_desc`}>
              Only {quantityProduct || 0} item(s) in stock
            </div>
          </div>
        </div>
      </div>

      <div className={`cart-details-component_middle`}>
        <div className={`cart-details-component_middle_current_price`}>
          <span style={privatePrice ? {textDecoration: 'line-through'} : {}}>
            ${publicPrice}
          </span>
          <span
            className={`cart-details-component_middle_current_price_private`}>
            {privatePrice ? `$${privatePrice}` : ''}
          </span>
        </div>
        <div
          className={`cart-details-component_middle_operations`}
          onClick={handleRemove}>
          <TrashIcon />
        </div>
      </div>

      <div className={`cart-details-component_right`}>
        <div className={`cart-details-component_right_quantity`}>
          <span>Quantity: {quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
