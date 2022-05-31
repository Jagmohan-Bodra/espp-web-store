import {Button, Col, Row} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import Form from '~/components/public/form/Form';
import InputRow from '~/components/public/form/InputRow';
import {postCustomerAddressCreate} from '~/lib/services/customer';
import {reqSetVisible} from '~/reduxs/public-modal/action';
import {reqGetMe} from '~/reduxs/me/action';
import {CUSTOMER_ADDRESS_TYPE} from '~/constants/master-data';
import {useState} from 'react';

const CreateAddressesModal = ({data, setData}) => {
  const dispatch = useDispatch();
  const okFunc = useSelector((state) => state.publicModal.okFunc);
  const [err, setErr] = useState({});

  const onChangeData = (value) => {
    setData({
      ...data,
      ...value,
    });
  };

  const onFinish = () => {
    postCustomerAddressCreate(data).then((results) => {
      okFunc(results.data);
      dispatch(reqGetMe());
      dispatch(reqSetVisible(false));
    });
  };

  const handleCancel = () => {
    dispatch(reqSetVisible(false));
  };

  return (
    <div className={`create-addresses-modal`}>
      <Form
        onFinish={onFinish}
        data={data}
        rules={{
          name: ['required'],
          phone: ['required'],
          addressStresstName: ['required'],
          addressFloor: ['required'],
          addressUnitNo: ['required'],
          addressCity: ['required'],
          addressState: ['required'],
          addressCountry: ['required'],
        }}
        setError={setErr}>
        <Row>
          <Col xl={6}>
            <InputRow
              name={`Name`}
              value={data.name}
              onChange={(value) => onChangeData({name: value})}
              feedback={err.name}
              important
            />
            <InputRow
              name={`Phone`}
              value={data.phone}
              onChange={(value) => onChangeData({phone: value})}
              feedback={err.phone}
              important
            />
          </Col>
          <Col xl={6}>
            <InputRow
              name={`Block No.`}
              value={data.addressBlockNo}
              onChange={(value) => onChangeData({addressBlockNo: value})}
              feedback={err.addressBlockNo}
            />
            <InputRow
              name={`Street Name`}
              value={data.addressStresstName}
              onChange={(value) => onChangeData({addressStresstName: value})}
              feedback={err.addressStresstName}
              important
            />
            <InputRow
              name={`Floor`}
              value={data.addressFloor}
              onChange={(value) => onChangeData({addressFloor: value})}
              feedback={err.addressFloor}
              important
            />
            <InputRow
              name={`Unit Number`}
              value={data.addressUnitNo}
              onChange={(value) => onChangeData({addressUnitNo: value})}
              feedback={err.addressUnitNo}
              important
            />
            <InputRow
              name={`Building Name`}
              value={data.addressBuildingName}
              onChange={(value) => onChangeData({addressBuildingName: value})}
              feedback={err.addressBuildingName}
            />
            <InputRow
              name={`Postcode`}
              value={data.addressPostCode}
              onChange={(value) => onChangeData({addressPostCode: value})}
              feedback={err.addressPostCode}
            />
            <InputRow
              name={`City`}
              value={data.addressCity}
              onChange={(value) => onChangeData({addressCity: value})}
              feedback={err.addressCity}
              important
            />
            <InputRow
              name={`State`}
              value={data.addressState}
              onChange={(value) => onChangeData({addressState: value})}
              feedback={err.addressState}
              important
            />
            <InputRow
              name={`Country`}
              value={data.addressCountry}
              onChange={(value) => onChangeData({addressCountry: value})}
              feedback={err.addressCountry}
              important
            />
            <div>Choose a name for a frequently used address:</div>
            <div className={`create-addresses-modal_type`}>
              <Button
                onClick={() =>
                  onChangeData({type: CUSTOMER_ADDRESS_TYPE.OFFICE})
                }
                className={
                  data.type == CUSTOMER_ADDRESS_TYPE.OFFICE && 'selected-type'
                }>
                OFFICE
              </Button>
              <Button
                onClick={() => onChangeData({type: CUSTOMER_ADDRESS_TYPE.HOME})}
                className={
                  data.type == CUSTOMER_ADDRESS_TYPE.HOME && 'selected-type'
                }>
                HOME
              </Button>
            </div>
          </Col>
        </Row>
        <hr />
        <div style={{textAlign: 'right'}}>
          <div className={`create-addresses-modal_btn`}>
            <Button onClick={handleCancel} color="secondary">
              HUNDRED
            </Button>
            <Button color="primary" type={`submit`}>
              SAVE
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateAddressesModal;
