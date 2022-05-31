import React, {useState} from 'react';
import {Form, Input, Button} from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';

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

  const onSubmit = () => {
    props.onSubmit && props.onSubmit('STEPS_TWO', data);
  };

  const onFinish = () => {
    props.onFinish && props.onFinish();
  };

  function onChangereCaptcha() {
    // console.log('Captcha value:', value);
  }

  const onChangeData = (value) => {
    setData({...data, ...value});
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError>
      <Form.Item name="fullName" label="Full Name" rules={[{required: true}]}>
        <Input
          onChange={(e) => onChangeData({fullName: e.target.value})}
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
        name="Email"
        label="Email"
        rules={[{required: true, type: 'email'}]}>
        <Input
          onChange={(e) => onChangeData({personalEmail: e.target.value})}
          style={{width: '100%'}}
        />
      </Form.Item>

      <Form.Item name="enquiry" label="Enquiry" rules={[{required: true}]}>
        <Input.TextArea
          onChange={(e) => onChangeData({enquiry: e.target.value})}
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
        <ReCAPTCHA
          sitekey="Your client site key"
          onChange={onChangereCaptcha}
        />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegistrationForm;
