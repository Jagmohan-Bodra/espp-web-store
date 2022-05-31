import {openPublicModal} from '~/components/modals/public-modal/common';
import AddressForm from '~/components/public/form/AddressForm';
import Loading from '~/components/public/loading';
import {
  postCustomerAddressCreate,
  deleteCustomerAddress,
  putCustomerAddressUpdate,
} from '~/lib/services/customer';
import countryJson from '~/lib/resource/country-region-data';
import {EditIcon, TrashIcon} from '~/lib/icons';
import {useState} from 'react';
import {notif} from '~/components/public/notification/common';
import {useDispatch, useSelector} from 'react-redux';
import {reqGetMe} from '~/reduxs/me/action';

const AddressBookPage = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.me.data) || {};
  const {addresses} = me.customer || {};
  const [loadding, setLoadding] = useState(false);

  const handleCallApiFunc = (actionFunc) => {
    setLoadding(true);
    actionFunc()
      .then(() => {
        setLoadding(false);
        notif({message: 'Successfully'});
        dispatch(reqGetMe());
      })
      .catch(() => {
        setLoadding(false);
      });
  };

  const onCreateClick = () => {
    const handleCreate = (results) => {
      handleCallApiFunc(() => postCustomerAddressCreate(results));
    };

    openPublicModal(
      {
        header: (
          <div className={`address-book-page_modal`}>
            <div className={`address-book-page_modal_title`}>
              Add a new address
            </div>
            <div className={`address-book-page_modal_tip`}>
              Please fill in the information below:
            </div>
          </div>
        ),
        bodycomponent: AddressForm,
        data: {default: true},
        isNullFooter: true,
      },
      handleCreate,
    );
  };

  const onEditClick = (item) => {
    const handleEdit = (results) => {
      handleCallApiFunc(() => putCustomerAddressUpdate(item._id, results));
    };

    openPublicModal(
      {
        header: (
          <div className={`address-book-page_modal`}>
            <div className={`address-book-page_modal_title`}>
              Edit a address
            </div>
            <div className={`address-book-page_modal_tip`}>
              Please fill in the information below:
            </div>
          </div>
        ),
        bodycomponent: AddressForm,
        data: {
          ...item,
          default: true,
          isDefault: (me.customer || {}).addressesDefault == item._id,
        },
        isNullFooter: true,
      },
      handleEdit,
    );
  };

  const onDeleteClick = (item) => {
    const SubmitRemove = () => {
      handleCallApiFunc(() => deleteCustomerAddress(item._id));
    };
    openPublicModal(
      {
        header: 'Remove address',
        body: 'Do you agree to remove this address?',
        labelNo: 'CANCEL',
        labelYes: 'AGREE',
        width: '400px',
      },
      SubmitRemove,
    );
  };

  return (
    <div className={`address-book-page`}>
      <Loading isLoading={loadding}>
        <div className={`address-book-page_btn`}>
          <button
            onClick={onCreateClick}
            className={`address-book-page_btn_create`}>
            Add a new address
          </button>
        </div>
        <div className={`address-book-page_table`}>
          <div className="d-none d-lg-table product__row">
            <div className="d-lg-table-cell product__col col__title">Name</div>
            <div className="d-lg-table-cell product__col col__title">
              Address
            </div>
            <div className="d-lg-table-cell product__col col__title">Phone</div>
            <div className="d-lg-table-cell product__col col__title">
              Actions
            </div>
          </div>
          {(addresses || []).map((item, index) => {
            const country =
              countryJson.find((coun) => coun.value == item.country) || {};
            const countryText = country.text || '';
            const cityText =
              (
                (country.regions || []).find((reg) => reg.value == item.city) ||
                {}
              ).text || '';
            const fullAddress = `${item.unitNo || ''} ${
              item.stresstName || ''
            } ${item.floor || ''} ${item.buildingName || ''} ${
              item.state || ''
            } ${cityText} ${countryText} ${item.postCode || ''}`
              .replace(/\s+/g, ' ')
              .trim();
            return (
              <div className="d-table product__row" key={index}>
                <div className="d-table-cell product__col">
                  {`${item.firstName || ''} ${item.lastName || ''}`
                    .replace(/\s+/g, ' ')
                    .trim()}
                </div>
                <div className="d-table-cell product__col">{fullAddress}</div>
                <div className="d-table-cell product__col">
                  {item.phone || ''}
                </div>
                <div className="d-table-cell product__col product__col_actions">
                  <div>
                    <EditIcon
                      onClick={() => onEditClick(item)}
                      style={{
                        color: '#dbcaa5',
                        marginRight: '10px',
                        cursor: 'pointer',
                      }}
                    />
                    <TrashIcon
                      onClick={() => onDeleteClick(item)}
                      style={{color: '#dbcaa5', cursor: 'pointer'}}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Loading>
    </div>
  );
};

export default AddressBookPage;
