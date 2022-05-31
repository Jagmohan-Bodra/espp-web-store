import {useNode} from '@craftjs/core';
import {notification} from 'antd';
import React, {useState} from 'react';
import {postCustomer} from '../../../../lib/services/customer';
import ContactFormChildren from '../form-component/ContactFormChildren';
import md5 from 'md5';
import {useRouter} from 'next/router';
const ContactForm = () => {
  const router = useRouter();
  const [dataRegister] = useState({});
  const [dataRegistration] = useState({});
  const {
    connectors: {connect, drag},
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const onSubmit = () => {};

  const onFinish = () => {
    postCustomer({
      email: dataRegister.email,
      password: md5(dataRegister.password),
      ...dataRegistration,
    }).then(() => {
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
      <ContactFormChildren onSubmit={onSubmit} onFinish={onFinish} />
    </div>
  );
};

ContactForm.craft = {
  displayName: 'ContactForm',
};

export default ContactForm;
