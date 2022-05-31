import {Input} from 'reactstrap';
import {openPublicModal} from '~/components/modals/public-modal/common';
import AddressForm from '~/components/public/form/AddressForm';
// import CheckboxCustom from '~/components/public/checkbox-custom';

const BoxAddress = (props) => {
  const {firstName, lastName, phone, stresstName} = props.data || {};
  const name = `${firstName || ''} ${lastName || ''}`.replace(/\s+/g, ' ');

  const handleChangeClick = () => {
    openPublicModal(
      {
        header: (
          <div className={`address_modal-header`}>
            <div className={`address_modal-header_title`}>{props.header}</div>
            <div className={`address_modal-header_tip`}>
              Please fill in the information below:
            </div>
          </div>
        ),
        bodycomponent: AddressForm,
        data: props.data || {},
        isNullFooter: true,
      },
      handleSubmit,
    );
  };

  const handleSubmit = (data) => {
    props.onChangeData && props.onChangeData(data);
  };

  return (
    <div className={`information-tab_form_box shadow`}>
      <div className={`information-tab_form_box_space`}>
        <div className={`information-tab_form_box_space_left`}>
          {name || ''}
        </div>
        <div
          className={`information-tab_form_box_space_right`}
          onClick={handleChangeClick}>
          Change
        </div>
      </div>
      <div className={`information-tab_form_box_address`}>
        {stresstName || ''}
      </div>
      <div className={`information-tab_form_box_phone`}>{phone || ''}</div>
    </div>
  );
};

const InformationTab = (props) => {
  const {onCartClick, onShoppingClick, params, me, onChangeData} = props;
  return (
    <div className={`information-tab`}>
      <div className={`information-tab_contact`}>
        <div className={`information-tab_header`}>Contact information</div>
        <div className={`information-tab_contact_customer`}>
          <img
            src={me.avatarFullPath}
            className={`information-tab_contact_customer_img`}
          />
          <div className={`information-tab_contact_customer_group`}>
            <div className={`information-tab_contact_customer_group_name`}>
              {me.email || ''}
            </div>
            <div className={`information-tab_contact_customer_group_tip`}></div>
          </div>
        </div>
        {/* <div className={`information-tab_contact_tip`}>
          <CheckboxCustom label={`Keep me up to date on news and offers`} />
        </div> */}
      </div>

      <div className={`information-tab_form`}>
        <div className={`information-tab_header`}>Shipping Address</div>
        <BoxAddress
          header={`Edit your shipping address`}
          data={params.shippingAddress || {}}
          onChangeData={(data) =>
            onChangeData && onChangeData({shippingAddress: data})
          }
        />

        <div className={`information-tab_header`}>Billing Address</div>
        <div className={`information-tab_tip`}>
          Select the address that matches your card or payment method.
        </div>
        <BoxAddress
          header={`Edit your billing address`}
          data={params.billingAddress || {}}
          onChangeData={(data) =>
            onChangeData && onChangeData({billingAddress: data})
          }
        />

        <div className={`information-tab_header`}>Purchase Order</div>
        <div className={`information-tab_purchase_order`}>
          <Input
            placeholder="Enter purchase order"
            name="purchaseOrder"
            defaultValue={params.purchaseOrder}
            onChange={(e) => onChangeData({purchaseOrder: e.target.value})}
          />
        </div>
      </div>

      <div className={`information-tab_footer`}>
        <div className={`information-tab_footer_link`} onClick={onCartClick}>
          Return to cart
        </div>
        <div className={`information-tab_footer_btn`}>
          <button onClick={onShoppingClick}>Continue to Shipping</button>
        </div>
      </div>
    </div>
  );
};

InformationTab.defaultProps = {
  me: {},
  params: {},
  onChangeData: () => {},
};

export default InformationTab;
