import {Button} from 'reactstrap';
import Link from 'next/link';
import pathRouter from '~/constants/path-router';

export const MyCartOrderDetails = ({data, me}) => {
  const {customer} = me || {};
  const {addresses} = customer || {};
  const {
    addressUnitNo,
    addressStresstName,
    addressCity,
    addressState,
    addressCountry,
  } = (addresses || [])[0] || {};
  const fullAddress = `${addressUnitNo || ''} ${addressStresstName || ''} ${
    addressCity || ''
  } ${addressState || ''} ${addressCountry || ''}`.replace(/\s+/g, ' ');

  const count = (data || []).reduce(
    (total, item) => total + parseInt(item.quantity),
    0,
  );
  // const total = (data || []).reduce(
  //   (total, item) => total + item.product.publicPrice * parseInt(item.quantity),
  //   0,
  // );
  const total = (data || []).reduce((total, item) => {
    const {publicPrice, membershipPrice} = item.product || {};
    const price =
      Number.parseFloat(membershipPrice) < Number.parseFloat(publicPrice)
        ? membershipPrice
        : publicPrice;
    return total + price * parseFloat(item.quantity);
  }, 0);
  return (
    <div className={`my-cart-order-details`}>
      <div className={`my-cart-order-details_section`}>
        <div className={`my-cart-order-details_section_content`}>
          <div className={`my-cart-order-details_section_content_label`}>
            Address
          </div>
          <div className={`my-cart-order-details_section_content_text`}>
            {fullAddress}
          </div>
        </div>
      </div>
      <div className={`my-cart-order-details_section`}>
        <div className={`my-cart-order-details_section_header`}>
          {' '}
          Information Order
        </div>
        <div className={`my-cart-order-details_section_content`}>
          <div className={`my-cart-order-details_section_content_row_space`}>
            <div
              className={`my-cart-order-details_section_content_row_space_label`}>
              Provisional({count} products)
            </div>
            <div
              className={`my-cart-order-details_section_content_row_space_text`}>
              ${total}
            </div>
          </div>
          <div className={`my-cart-order-details_section_content_row_space`}>
            <div
              className={`my-cart-order-details_section_content_row_space_label`}>
              Total
            </div>
            <div
              className={`my-cart-order-details_section_content_row_space_text`}>
              ${total}
              <div
                className={`my-cart-order-details_section_content_row_space_text_tip`}>
                VAT included (if any)
              </div>
            </div>
          </div>
          <div className={`my-cart-order-details_section_content_row`}>
            <Link href={pathRouter.CHEKING_ORDER}>
              <Button
                className={`my-cart-order-details_section_content_row_btn`}>
                CART CONFIRMATION
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCartOrderDetails;
