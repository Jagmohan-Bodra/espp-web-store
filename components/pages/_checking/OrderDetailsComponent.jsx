import {CloseLetter, MarketIcon, PhoneIcon} from '~/lib/icons';
import EditInput from './EditInput';
import SelectAddressForm from './SelectAddressForm';
import {Button} from 'reactstrap';

const OrderDetailsComponent = ({
  data,
  me,
  onChangeData,
  params,
  handleSubmit,
}) => {
  const {name} = me || {};
  const count = (data || []).reduce(
    (total, item) => total + parseInt(item.quantity),
    0,
  );
  const total = (data || []).reduce((total, item) => {
    const {publicPrice, membershipPrice} = item.product || {};
    const price =
      Number.parseFloat(membershipPrice) < Number.parseFloat(publicPrice)
        ? membershipPrice
        : publicPrice;
    return total + price * parseFloat(item.quantity);
  }, 0);

  return (
    <div className={`order-details-component`}>
      <div className={`order-details-component_summary_section`}>
        <div className={`order-details-component_summary_section_content`}>
          <div
            className={`order-details-component_summary_section_content_label`}></div>
          <div
            className={`order-details-component_summary_section_content_body`}>
            <div
              className={`order-details-component_summary_section_content_body_content`}>
              <SelectAddressForm
                icon={<MarketIcon />}
                value={params.addressId}
                setValue={(value) => onChangeData({addressId: value})}
                text={name}
              />
            </div>
            {/* <div className={`order-details-component_summary_section_content_body_content`}>
              <SelectAddressForm
                icon={<BillIcon />}
                value={params.billingAddressId}
                setValue={(value) => onChangeData({ billingAddressId: value })}
                text={'Billing information'}
              />
            </div> */}
            <div
              className={`order-details-component_summary_section_content_body_content`}>
              <EditInput
                value={params.phone}
                setValue={(e) => onChangeData({phone: e.target.value})}
                text={'Phone'}
                icon={<PhoneIcon />}
              />
            </div>
            <div
              className={`order-details-component_summary_section_content_body_content`}>
              <EditInput
                value={params.email}
                setValue={(e) => onChangeData({email: e.target.value})}
                text={'Email'}
                icon={<CloseLetter />}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`order-details-component_summary_section`}>
        <div className={`order-details-component_summary_section_header`}>
          Order Summary
        </div>
        <div className={`order-details-component_summary_section_content`}>
          <div
            className={`order-details-component_summary_section_content_row_between`}>
            <div
              className={`order-details-component_summary_section_content_row_between_label`}>
              Provisional({count} products)
            </div>
            <div
              className={`order-details-component_summary_section_content_row_between_value`}>
              {total}
            </div>
          </div>

          <div
            className={`order-details-component_summary_section_content_row_between`}>
            <div
              className={`order-details-component_summary_section_content_row_between_label`}>
              Delivery charges
            </div>
            <div
              className={`order-details-component_summary_section_content_row_between_value`}>
              $0
            </div>
          </div>

          <div
            className={`order-details-component_summary_section_content_row_between`}>
            <div
              className={`order-details-component_summary_section_content_row_between_label`}>
              Total
            </div>
            <div
              className={`order-details-component_summary_section_content_row_between_value`}>
              {total}
              <small
                className={`order-details-component_summary_section_content_row_between_value_fee_tip`}>
                VAT included (if any)
              </small>
            </div>
          </div>

          <div
            className={`order-details-component_summary_section_content_row_btn`}>
            <Button
              className={`order-details-component_summary_section_content_row_btn_submit`}
              onClick={() => handleSubmit && handleSubmit()}
              type={`submit`}>
              ORDER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsComponent;
