import {useState} from 'react';
import {Row, Col} from 'reactstrap';
import InputGroupVertical from '~/components/public/input-group/input-group-vertical';
import SelectDropdown from '~/components/public/select-dropdown';
import {PAYMENT_OPTION} from '~/constants/master-data';

const PaymentTab = (props) => {
  const {onSubmit, params, optionSetting} = props;
  const [payment, setPayment] = useState(PAYMENT_OPTION.CASH_ON_DELIVERY);
  const paymentSetting = {
    paypal: optionSetting.find((item) => item.id == 1) || {},
    paynow: optionSetting.find((item) => item.id == 2) || {},
    banktransfer: optionSetting.find((item) => item.id == 3) || {},
    cashOnDelivery: optionSetting.find((item) => item.id == 4) || {},
  };
  const method =
    params.shippingFee == 0
      ? 'Standard Courier (within 5 business days)'
      : params.shippingFee > 0
      ? 'Express Courier (within 1-2 business days)'
      : '';
  return (
    <div className={`payment-tab`}>
      <div className={`payment-tab_form`}>
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
        <Row>
          <Col xl={12}>
            <InputGroupVertical label={`Method`} value={method} disabled />
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <InputGroupVertical
              label={`Order No`}
              value={params.orderNo}
              disabled
            />
          </Col>
        </Row>
        <div className={`payment-tab_form_payment`}>
          <div className={`payment-tab_header`}>Payment</div>
          <div className={`payment-tab_text`}>
            All transactions are secure and encrypted.
          </div>
          <div className={`payment-tab_form_payment_collap`}>
            <SelectDropdown
              data={[
                // {
                //   label: paymentSetting.banktransfer.label || '',
                //   value: PAYMENT_OPTION.LOCAL_BANK_TRANSFER,
                //   body: (
                //     <div
                //       dangerouslySetInnerHTML={{
                //         __html: paymentSetting.banktransfer.instruction || '',
                //       }}></div>
                //   ),
                //   status: paymentSetting.banktransfer.status,
                // },
                // {
                //   label: paymentSetting.paynow.label || '',
                //   value: PAYMENT_OPTION.PAYNOW,
                //   body: (
                //     <div
                //       dangerouslySetInnerHTML={{
                //         __html: paymentSetting.paynow.instruction || '',
                //       }}></div>
                //   ),
                //   status: paymentSetting.paynow.status,
                // },
                // {
                //   label: paymentSetting.paypal.label || '',
                //   value: PAYMENT_OPTION.PAYPAL,
                //   body: (
                //     <div>
                //       <img src={`/images/paypal.png`} width="200" />
                //     </div>
                //   ),
                //   status: paymentSetting.paypal.status,
                // },
                {
                  label: paymentSetting.cashOnDelivery.label || '',
                  value: PAYMENT_OPTION.CASH_ON_DELIVERY,
                  body: (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: paymentSetting.cashOnDelivery.instruction || '',
                      }}></div>
                  ),
                  status: paymentSetting.cashOnDelivery.status,
                },
              ].filter((item) => item.status)}
              value={payment}
              setValue={setPayment}
            />
          </div>
        </div>

        {/* <div className={`payment-tab_form_billing_address`}>
          <div className={`payment-tab_header`}>Billing Address</div>
          <div className={`payment-tab_text`}>
            Select the address that matches your card or payment method.
          </div>
          <div className={`payment-tab_form_billing_address_select_group`}>
            <Row>
              <Col xl={12}>
                <SelectCustom
                  label={`Same as shipping address`}
                  name={`shipping_address`}
                  onChange={() => setSameAddress(true)}
                />
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <SelectCustom
                  label={`Use a different billing address`}
                  name={`shipping_address`}
                  onChange={() => setSameAddress(false)}
                />
              </Col>
            </Row>
          </div>
          <Collapse isOpen={!sameAddress}>
            <div className={`payment-tab_form_billing_address_select_form`}>
              <Row>
                <Col xl={6}>
                  <Input
                    placeholder={`First name`}
                    value={address.firstName}
                    onChange={(e) =>
                      onChangeAddress({firstName: e.target.value})
                    }
                  />
                </Col>
                <Col xl={6}>
                  <Input
                    placeholder={`Last name`}
                    value={address.lastName}
                    onChange={(e) =>
                      onChangeAddress({lastName: e.target.value})
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col xl={12}>
                  <Input
                    placeholder={`Company (optional)`}
                    value={address.companyName}
                    onChange={(e) =>
                      onChangeAddress({companyName: e.target.value})
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col xl={12}>
                  <Input
                    placeholder={`Address`}
                    value={address.addressStresstName}
                    onChange={(e) =>
                      onChangeAddress({addressStresstName: e.target.value})
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col xl={12}>
                  <Input
                    placeholder={`Apartment, suite, etc.`}
                    value={address.addressBuildingName}
                    onChange={(e) =>
                      onChangeAddress({addressBuildingName: e.target.value})
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col xl={12}>
                  <Input
                    placeholder={`City`}
                    value={address.addressCity}
                    onChange={(e) =>
                      onChangeAddress({addressCity: e.target.value})
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col xl={6}>
                  <Input
                    placeholder={`Country/region`}
                    type={`select`}
                    value={address.addressCountry}
                    onChange={(e) =>
                      onChangeAddress({addressCountry: e.target.value})
                    }>
                    {countryJson.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.text}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col xl={6}>
                  <Input
                    placeholder={`Postal code`}
                    value={address.addressPostCode}
                    onChange={(e) =>
                      onChangeAddress({addressPostCode: e.target.value})
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col xl={12}>
                  <Input
                    placeholder={`Phone (required)`}
                    value={address.phone}
                    onChange={(e) => onChangeAddress({phone: e.target.value})}
                  />
                </Col>
              </Row>
            </div>
          </Collapse>
        </div> */}

        <div className={`payment-tab_footer`}>
          {/* <div className={`payment-tab_footer_link`} onClick={onShoppingClick}>
            Return to shipping
          </div> */}
          <div></div>
          <div className={`payment-tab_footer_btn`}>
            <button onClick={() => onSubmit(payment)}>Pay now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

PaymentTab.defaultProps = {
  params: {},
  onChangeData: () => {},
  optionSetting: [],
};

export default PaymentTab;
