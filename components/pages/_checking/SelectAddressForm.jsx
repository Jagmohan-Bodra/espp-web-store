import {useSelector} from 'react-redux';
import {openPublicModal} from '~/components/modals/public-modal/common';
import AddressesModal from './AddressesModal';
import CreateAddressesModal from './CreateAddressesModal';

const SelectAddressForm = (props) => {
  const {value, setValue, text, icon} = props;
  const me = useSelector((state) => state.me.data);
  const {addresses} = (me || {}).customer || {};
  const address = (addresses || []).find((item) => item._id == value) || {};
  const {
    addressUnitNo,
    addressStresstName,
    addressCity,
    addressState,
    addressCountry,
  } = address;
  const fullAddress = `${addressUnitNo || ''} ${addressStresstName || ''} ${
    addressCity || ''
  } ${addressState || ''} ${addressCountry || ''}`.replace(/\s+/g, ' ');
  const handleANewAddress = () => {
    openPublicModal(
      {
        data: {},
        header: 'Add a new delivery address',
        isNullFooter: true,
        bodycomponent: CreateAddressesModal,
        width: 1000,
      },
      (results) => setValue(results),
    );
  };

  const handleEdit = () => {
    openPublicModal(
      {
        data: value,
        header: (
          <div>
            <span>Addresses</span> |
            <span onClick={() => handleANewAddress()}>Add new address</span>
          </div>
        ),
        labelNo: 'HUNDRED',
        labelYes: 'SAVE',
        width: 1000,
        bodycomponent: AddressesModal,
      },
      (results) => setValue(results),
    );
  };
  return (
    <div className={`select-address-form`}>
      <div className={`select-address-form_content`}>
        <div className={`select-address-form_content_space`}>
          <div className={`select-address-form_content_space_icon`}>{icon}</div>
          <div className={`select-address-form_content_space_text`}>{text}</div>
        </div>
        <div className={`select-address-form_content_form`}>
          <div
            onClick={() => handleEdit()}
            className={`select-address-form_content_form_link`}>
            Edit
          </div>
        </div>
      </div>
      <div
        className={`select-address-form_adress`}
        style={address ? {} : {display: 'none'}}>
        <span
          className={`select-address-form_adress_tag`}
          style={address.type ? {} : {display: 'none'}}>
          {address.type}
        </span>
        <span className={`select-address-form_adress_text`}>{fullAddress}</span>
      </div>
    </div>
    // <Row style={{justifyContent: 'space-between'}}>
    //   <Col span={18}>
    //     <Space style={{height: '40px'}}>
    //       <div className={style.location__body_icon}>{icon}</div>
    //       <div className={style.location__body_title}>{text}</div>
    //     </Space>
    //   </Col>
    //   <Col span={6}>
    //     <div
    //       className={style.location__body_action}
    //       style={{height: '40px', textAlign: 'right'}}>
    //       <span onClick={() => handleEdit()} style={{lineHeight: '2.4em'}}>
    //         {' '}
    //         Edit{' '}
    //       </span>
    //     </div>
    //   </Col>
    //   {address.type && (
    //     <Col span={24}>
    //       <span className={style.location__body_details}>
    //         <span className={style.address_tag_label}>{address.type}</span>
    //         {`${address.address || ''} ${address.wards || ''} ${
    //           address.district || ''
    //         } ${address.city || ''}`}
    //       </span>
    //     </Col>
    //   )}
    // </Row>
  );
};

export default SelectAddressForm;
