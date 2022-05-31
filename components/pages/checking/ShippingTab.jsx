import {useEffect, useState} from 'react';
import {Row, Col, Input} from 'reactstrap';
import InputGroupVertical from '~/components/public/input-group/input-group-vertical';
import SelectCustom from '~/components/public/select-custom';

const ShippingTab = (props) => {
  const {onInformationClick, onPaymentClick, params, onChangeData} = props;
  const [shippingMethod, setShippingMethod] = useState('standard');

  useEffect(() => {
    onChangeData({shippingFee: 0});
  }, []);

  const onChangeMethod = (method) => {
    if (method == 'standard') {
      onChangeData({shippingFee: 0});
    }
    if (method == 'express') {
      onChangeData({shippingFee: 20});
    }
    setShippingMethod(method);
  };

  const handleSubmit = () => {
    let shippingFee;
    if (shippingMethod == 'standard') {
      shippingFee = 0;
      onChangeData({shippingFee});
    }
    if (shippingMethod == 'express') {
      shippingFee = 20;
      onChangeData({shippingFee});
    }
    onPaymentClick(shippingFee);
  };

  return (
    <div className={`shipping-tab`}>
      <div className={`shipping-tab_form`}>
        <Row>
          <Col xl={12}>
            <InputGroupVertical
              label={`Contact`}
              value={params.email}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <InputGroupVertical
              label={`Ship to`}
              value={(params.shippingAddress || {}).stresstName || ''}
              disabled
            />
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <InputGroupVertical
              label={`Billing to`}
              value={(params.billingAddress || {}).stresstName || ''}
              disabled
            />
          </Col>
        </Row>

        <div className={`shipping-tab_header`}>Shipping method</div>
        <div className={`shipping-tab_flex_space`}>
          <SelectCustom
            label={`Standard Courier (within 5 business days)`}
            name={`method`}
            value={`standard`}
            checked={shippingMethod == 'standard'}
            className={`${shippingMethod == 'standard' ? 'active' : ''}`}
            onChange={(e) => onChangeMethod(e.target.value)}
          />
          <div>
            <b>Free</b>
          </div>
        </div>
        <div className={`shipping-tab_flex_space`}>
          <SelectCustom
            label={`Express Courier (within 1-2 business days)`}
            name={`method`}
            value={`express`}
            checked={shippingMethod == 'express'}
            className={`${shippingMethod == 'express' ? 'active' : ''}`}
            onChange={(e) => onChangeMethod(e.target.value)}
          />
          <div>
            <b>$20.00</b>
          </div>
        </div>

        <div className={`shipping-tab_notes`}>
          <div className={`shipping-tab_notes_text`}>NOTES</div>
          <div className={`shipping-tab_notes_input`}>
            <Input
              className={`shipping-tab_notes_textarea`}
              placeholder={`Please include any special requests here regarding the items in your order`}
              type={`textarea`}
              rows={6}
              defaultValue={params.notes}
              onChange={(e) => onChangeData({notes: e.target.value})}
            />
          </div>
        </div>
      </div>
      <div className={`shipping-tab_footer`}>
        <div
          className={`shipping-tab_footer_link`}
          onClick={onInformationClick}>
          Return to information
        </div>
        <div className={`shipping-tab_footer_btn`}>
          <button onClick={handleSubmit}>Continue to Payment</button>
        </div>
      </div>
    </div>
  );
};

ShippingTab.defaultProps = {
  params: {},
  onChangeData: () => {},
};

export default ShippingTab;
