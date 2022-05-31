import React, {useState} from 'react';
import {Form, Input, Checkbox, Button} from 'antd';
import SelectBlock from '../../../public/Select';
import ReCAPTCHA from 'react-google-recaptcha';
import config from '~/config';
import {useRef} from 'react';
const salutation = [
  {key: 'Mr', value: 'Mr'},
  {key: 'Mrs', value: 'Mrs'},
  {key: 'Ms', value: 'Ms'},
  {key: 'Miss', value: 'Miss'},
];

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14},
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};

const RegistrationForm = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState({});
  const [captcha, setCaptcha] = useState();
  const ref = useRef(null);

  const onSubmit = async () => {
    props.onSubmit && props.onSubmit('STEPS_TWO', data);
  };

  const onFinish = () => {
    props.onFinish && props.onFinish(captcha);
    ref.current.reset();
    setCaptcha('');
  };

  function onChangereCaptcha(value) {
    setCaptcha(value);
  }

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      fields={[{name: ['captcha'], value: captcha}]}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      className={`form`}
      scrollToFirstError>
      <h1>Contact Information</h1>
      <Form.Item name="salutation" label="Salutation">
        <SelectBlock
          data={salutation}
          placeholder="Select Salutation"
          onChange={(value) => onChangeData({salutation: value})}
        />
      </Form.Item>

      <Form.Item name="firstName" label="First Name" rules={[{required: true}]}>
        <Input
          onChange={(e) => onChangeData({firstName: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="lastName" label="Last Name" rules={[{required: true}]}>
        <Input
          onChange={(e) => onChangeData({lastName: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="designation" label="Designation">
        <Input
          onChange={(e) => onChangeData({designation: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item
        name="contactNo"
        label="Contact No."
        rules={[
          {
            pattern: /^[0-9]*$/,
            message: 'Contact No. must be number',
          },
        ]}>
        <Input
          onChange={(e) => onChangeData({contactNo: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Mobile number"
        rules={[
          {
            pattern: /^[0-9]*$/,
            message: 'Mobile number must be number',
          },
        ]}>
        <Input
          onChange={(e) => onChangeData({phone: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item
        name="personalEmail"
        label="Personal Email"
        rules={[{required: true, type: 'email'}]}>
        <Input
          onChange={(e) => onChangeData({personalEmail: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <h1>Company Information</h1>
      <Form.Item name="companyName" label="Company Name">
        <Input
          onChange={(e) => onChangeData({companyName: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="companyRegNo" label="Company Reg. No">
        <Input
          onChange={(e) => onChangeData({companyRegNo: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="companyContactNo" label="Company Contact Number">
        <Input
          onChange={(e) => onChangeData({companyContactNo: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="companyFax" label="Company Fax">
        <Input
          onChange={(e) => onChangeData({companyFax: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="companyNatureOfBusiness" label="Company Nature">
        <Input
          onChange={(e) =>
            onChangeData({companyNatureOfBusiness: e.target.value})
          }
          style={{width: '100%'}}
        />
      </Form.Item>

      <h1>Billing Information</h1>
      <Form.Item name="addressBlockNo" label="Block No.">
        <Input
          onChange={(e) => onChangeData({addressBlockNo: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="addressStresstName" label="Street Name">
        <Input
          onChange={(e) => onChangeData({addressStresstName: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="addressFloor" label="Floor">
        <Input
          onChange={(e) => onChangeData({addressFloor: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="addressUnitNo" label="Unit Number">
        <Input
          onChange={(e) => onChangeData({addressUnitNo: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="addressBuildingName" label="Building Name">
        <Input
          onChange={(e) => onChangeData({addressBuildingName: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="addressPostCode" label="Postcode">
        <Input
          onChange={(e) => onChangeData({addressPostCode: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="addressCity" label="City">
        <Input
          onChange={(e) => onChangeData({addressCity: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="addressState" label="State">
        <Input
          onChange={(e) => onChangeData({addressState: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="addressCountry" label="Country">
        <SelectBlock
          data={salutation}
          placeholder="Select Country"
          onChange={(value) => onChangeData({addressCountry: value})}
        />
      </Form.Item>
      <h1>Finance Information</h1>
      <Form.Item name="financeSalutation" label="Salutation">
        <SelectBlock
          data={salutation}
          placeholder="Select Salutation"
          onChange={(value) => onChangeData({financeSalutation: value})}
        />
      </Form.Item>

      <Form.Item
        name="financeFirstName"
        label="First Name"
        rules={[{required: true}]}>
        <Input
          onChange={(e) => onChangeData({financeFirstName: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item
        name="financeLastName"
        label="Last Name"
        rules={[{required: true}]}>
        <Input
          onChange={(e) => onChangeData({financeLastName: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item
        name="financeContactNo"
        label="Contact No."
        rules={[
          {
            pattern: /^[0-9]*$/,
            message: 'Contact No. must be number',
          },
        ]}>
        <Input
          onChange={(e) => onChangeData({financeContactNo: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item
        name="financeEmail"
        label="Email Address"
        rules={[{required: true, type: 'email'}]}>
        <Input
          onChange={(e) => onChangeData({financeEmail: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        label=""
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}>
        <Checkbox>Subscribe our latest newsletter.</Checkbox>
      </Form.Item>

      <Form.Item
        name="captcha"
        valuePropName="checked"
        label=""
        rules={[{required: true}]}
        {...tailFormItemLayout}>
        <ReCAPTCHA
          ref={ref}
          sitekey={config.RE_CAPTCHA_SITEKEY}
          onChange={onChangereCaptcha}
        />
      </Form.Item>

      {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[{ required: true, message: 'Please input the captcha you got!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item> */}

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType={`submit`} onClick={onSubmit}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegistrationForm;
