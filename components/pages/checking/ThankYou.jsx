import {PAYMENT_OPTION} from '~/constants/master-data';
import pathRouter from '~/constants/path-router';
import {LogoIcon} from '~/lib/icons';

const ThankYou = (props) => {
  const {payment} = props.data || {};

  const title =
    payment == PAYMENT_OPTION.PAYPAL
      ? `Payment done successfully!`
      : payment == PAYMENT_OPTION.PAYNOW ||
        payment == PAYMENT_OPTION.LOCAL_BANK_TRANSFER
      ? 'Your order will be processed after your payment is successful!'
      : `Your payment is being processed`;

  return (
    <div className={`thank-you-page`}>
      <div className={`thank-you-page_logo`}>
        <a href={pathRouter.ROOT}>
          <LogoIcon width="200px" height="auto" />
        </a>
      </div>
      <div className={`thank-you-page_header`}>THANK YOU!</div>
      <div className={`thank-you-page_title`}>{title}</div>
      <div className={`thank-you-page_description`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute...
      </div>
      <div className={`thank-you-page_btn`}>
        <a href={pathRouter.ROOT}>
          <button className={`thank-you-page_btn_shoping`}>
            KEEP SHOPPING
          </button>
        </a>
      </div>
    </div>
  );
};

export default ThankYou;
