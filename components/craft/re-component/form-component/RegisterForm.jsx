import {Form, Input, Row, Col} from 'antd';
import React, {useEffect, useState} from 'react';
import {ButtonBlue} from '../../../public/Button';
import styles from './styles.module.scss';
const {Item} = Form;

const rulesConfirmPassword = (labelPassword) => [
  {
    required: true,
    message: 'Please confirm your password!',
  },
  ({getFieldValue}) => ({
    validator(rule, value) {
      if (!value || getFieldValue(labelPassword) === value) {
        return Promise.resolve();
      }
      return Promise.reject('The two password that you entered do not match!');
    },
  }),
];

const RegisterForm = (props) => {
  const [data, setData] = useState(props.data || {});

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  const onSubmitChange = () => {};

  const onFinish = () => {
    props.onFinish && props.onFinish('STEPS_ONE', data);
  };
  const {email, password, confirmPassword} = data || {};
  const fields = [
    {name: ['Email Address'], value: email},
    {name: ['Password'], value: password},
    {name: ['Confirm Password'], value: confirmPassword},
  ];

  return (
    <div className={styles.registerForm}>
      <Form
        scrollToFirstError
        onFinish={onFinish}
        className={`form`}
        fields={fields}>
        <div className={`form-body`}>
          <Row gutter={[8, 8]}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <span className={'label-control'}>Email Address</span>
              <Item
                name="Email Address"
                rules={[{required: true, type: 'email'}]}>
                <Input
                  size={'large'}
                  value={email}
                  placeholder="Email Address"
                  onChange={(e) => {
                    onChangeData({email: e.target.value});
                  }}
                />
              </Item>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <span className={'label-control'}>Password</span>
              <Item
                name="Password"
                hasFeedback
                rules={[{required: true, min: 6}]}>
                <Input.Password
                  size={'large'}
                  value={password}
                  placeholder="Password"
                  onChange={(e) => {
                    onChangeData({password: e.target.value});
                  }}
                />
              </Item>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <span className={'label-control'}>Confirm Password</span>
              <Item
                name="Confirm Password"
                dependencies={['Password']}
                hasFeedback
                rules={rulesConfirmPassword('Password')}>
                <Input.Password
                  size={'large'}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    onChangeData({confirmPassword: e.target.value});
                  }}
                />
              </Item>
            </Col>
          </Row>
        </div>

        <div className={`form_footer`} style={{marginTop: '15px'}}>
          <ButtonBlue htmlType="submit" onClick={onSubmitChange} text="NEXT" />
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
