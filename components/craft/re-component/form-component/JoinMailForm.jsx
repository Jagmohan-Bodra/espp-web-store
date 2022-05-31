import {Form, Input, Row, Col} from 'antd';
import React, {useState} from 'react';
import styles from './styles.module.scss';

const JoinMailForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const onSubmit = () => {
    // console.log(name, email);
  };

  return (
    <div>
      <Form
        onFinish={onSubmit}
        fields={[
          {name: ['Name'], value: name},
          {name: ['Email'], value: email},
        ]}>
        <div className={styles.join_mail_form}>
          <div className={styles.join_mail_form_title}>Join Mailing List!</div>
          <div className={styles.join_mail_form_description}>
            Subscribe to receive updates, store offers and more!
          </div>
          <div className={`container`}>
            <Row>
              <Col span={12}>
                <Form.Item
                  name={`Name`}
                  rules={[{required: true}]}
                  style={{padding: '0 15px'}}>
                  <Input
                    className={styles.join_mail_form_input}
                    placeholder={`Name`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={`Email`}
                  rules={[{required: true, type: 'email'}]}
                  style={{padding: '0 15px'}}>
                  <Input
                    className={styles.join_mail_form_input}
                    placeholder={`Email Address`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <button className={styles.join_mail_form_submit} type={`submit`}>
            {' '}
            SUBMIT{' '}
          </button>
        </div>
      </Form>
    </div>
  );
};

JoinMailForm.craft = {
  displayName: 'JoinMailForm',
};

export default JoinMailForm;
