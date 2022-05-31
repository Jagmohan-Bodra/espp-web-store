import {useState} from 'react';
import {Row, Col, Button} from 'reactstrap';
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

const PaymentTags = (props) => {
  const {src, title, active} = props;

  return (
    <div className={`payment-tag-component ${active ? 'active' : ''}`}>
      <div>
        <img className={`payment-tag-component_image`} src={src} />
      </div>
      <div>
        <div className={`payment-tag-component_title`}>{title}</div>
        {/* <div className={style.proceed_to_payment_content_subtitle}></div> */}
      </div>
    </div>
  );
};

const ProceedToPayment = ({onChangeData}) => {
  const [tag, setTags] = useState();

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

  return (
    <div className={`proceed-to-payment-component`}>
      <div className={`proceed-to-payment-component_title`}>
        Proceed To Payment
      </div>
      <Row className={`proceed-to-payment-component_row`}>
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
          <div className={`proceed-to-payment-component_payment_method`}>
            <div
              className={`proceed-to-payment-component_payment_method_content`}>
              {renderPaymentMethod(tag)}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProceedToPayment;
