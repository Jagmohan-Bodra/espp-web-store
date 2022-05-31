import {Button, Col, Input, Row, Space, Form, Divider} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {CUSTOMER_ADDRESS_TYPE} from '../../../constants/master-data';
import {postCustomerAddressCreate} from '../../../lib/services/customer';
import {reqGetMe} from '../../../reduxs/me/action';
import {reqSetVisible} from '../../../reduxs/public-modal/action';

const TextInput = ({label, value, setValue, placeholder, rules}) => {
  return (
    <Form.Item name={label} rules={rules}>
      <div style={{margin: '0 30px 0px 0'}}>
        <label>{label}</label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </Form.Item>
  );
};

const CreateAddressesModal = ({data, setData}) => {
  const dispatch = useDispatch();
  const okFunc = useSelector((state) => state.publicModal.okFunc);

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

  const handleSubmit = () => {};

  return (
    <div>
      <Form
        onFinish={onFinish}
        fields={[
          {name: ['Name'], value: data.name},
          {name: ['Phone number'], value: data.phone},
          {name: ['Delivery address'], value: data.address},
          {name: ['Province/City'], value: data.city},
          {name: ['District'], value: data.district},
          {name: ['Wards'], value: data.wards},
        ]}>
        <Row>
          <Col span={12}>
            <TextInput
              label={`Name`}
              value={data.name}
              setValue={(value) => onChangeData({name: value})}
              placeholder={`Full name`}
              rules={[{required: true}]}
            />
            <TextInput
              label={`Phone number`}
              value={data.phone}
              setValue={(value) => onChangeData({phone: value})}
              placeholder={`Please enter your phone number`}
              rules={[{required: true}]}
            />
          </Col>
          <Col span={12}>
            <TextInput
              label={`Delivery address`}
              value={data.address}
              setValue={(value) => onChangeData({address: value})}
              placeholder={`Please enter your address`}
              rules={[{required: true}]}
            />
            <TextInput
              label={`Province/City`}
              value={data.city}
              setValue={(value) => onChangeData({city: value})}
              placeholder={`Please select province/city`}
              rules={[{required: true}]}
            />
            <TextInput
              label={`District`}
              value={data.district}
              setValue={(value) => onChangeData({district: value})}
              placeholder={`Please select a country/district`}
              rules={[{required: true}]}
            />
            <TextInput
              label={`Wards`}
              value={data.wards}
              setValue={(value) => onChangeData({wards: value})}
              placeholder={`Please select ward/commune`}
              rules={[{required: true}]}
            />

            <div>Choose a name for a frequently used address:</div>
            <Space>
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
            </Space>
          </Col>
        </Row>
        <Divider />
        <div style={{textAlign: 'right'}}>
          <Space size={`small`}>
            <Button className={'ant-btn cancel-btn'} onClick={handleCancel}>
              {' '}
              HUNDRED{' '}
            </Button>
            <Button
              className={'ant-btn success-btn'}
              onClick={handleSubmit}
              htmlType={`submit`}>
              {' '}
              SAVE{' '}
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default CreateAddressesModal;
