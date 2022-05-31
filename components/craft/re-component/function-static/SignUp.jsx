import {useNode} from '@craftjs/core';
import {Steps, notification} from 'antd';
import React, {useState} from 'react';
import {postCustomer} from '../../../../lib/services/customer';
import RegisterForm from '../form-component/RegisterForm';
import RegistrationForm from '../form-component/RegistrationForm';
import {useRouter} from 'next/router';

const {Step} = Steps;
const SignUp = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [dataRegister, setDataRegister] = useState({});
  const [dataRegistration, setDataRegistration] = useState({});
  const {
    connectors: {connect, drag},
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const onSubmit = (key, data) => {
    if (key === 'STEPS_ONE') {
      setCurrent(1);
      setDataRegister(data);
    }
    if (key === 'STEPS_TWO') {
      setDataRegistration(data);
    }
  };

  const onFinish = (captcha) => {
    postCustomer(
      {
        email: dataRegister.email,
        password: dataRegister.password,
        ...dataRegistration,
      },
      captcha,
    ).then(() => {
      notification.success({
        message: 'Create account successful',
        description: '',
        placement: 'topRight',
      });
      router.back();
    });
  };

  return (
    <div
      className={`container empty-component craft-block ${
        selected ? 'selected' : ''
      }`}
      ref={(ref) => connect(drag(ref))}>
      <Steps
        type="navigation"
        current={current}
        onChange={(current) => setCurrent(current)}
        className="site-navigation-steps">
        <Step title="Step 1" />
        <Step disabled={current === 0 ? true : false} title="Step 2" />
      </Steps>
      {current === 0 && (
        <RegisterForm data={dataRegister} onFinish={onSubmit} />
      )}
      {current === 1 && (
        <RegistrationForm onSubmit={onSubmit} onFinish={onFinish} />
      )}
    </div>
  );
};

SignUp.craft = {
  displayName: 'SignUp',
};

export default SignUp;
