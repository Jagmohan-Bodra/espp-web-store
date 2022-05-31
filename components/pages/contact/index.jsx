import React, {useState, useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import {isEmpty} from 'validate.js';
import {stringify} from 'qs';
import {Button, Col, Row} from 'reactstrap';
import {BLOCK_2} from './mockData';
import Form from '~/components/public/form/Form';
import InputOnlyRow from '~/components/public/form/InputOnlyRow';
// import ReCAPTCHA from 'react-google-recaptcha';
// import config from '~/config';
import TextareaOnlyRow from '~/components/public/form/TextareaOnlyRow';
import {notif} from '~/components/public/notification/common';
import {getImagePath} from '~/helpers/common';
const classMain = 'page-contact';

const Contact = (props) => {
  const value = props?.data?.values?.value;
  const router = useRouter();
  // const [captcha, setCaptcha] = useState();
  const [data, setData] = useState({});
  const [err, setErr] = useState({});
  const ref = useRef(null);
  const {access, resultsSent} = props;

  useEffect(() => {
    if (!isEmpty(resultsSent) && resultsSent.id > 0) {
      notif({message: 'Thank you for your enquiry'});
    }
    router.push({
      pathname: '/contact',
    });
    ref.current?.reset();
    // setCaptcha('');
    setData({});
  }, [resultsSent]);

  const onFinish = () => {
    data.title = 'Contact us';
    const queryParams = {
      access: access,
      data: data,
    };

    router.push({
      pathname: '/contact',
      query: stringify(queryParams),
    });
  };

  // const onFinish = () => {
  //   postEnquiry(data, captcha)
  //     .then(async () => {
  //       await notif({message: 'Thank you for your enquiry'});
  //       ref.current.reset();
  //       setCaptcha('');
  //       setData({});
  //     })
  //     .catch(() => {
  //       ref.current.reset();
  //       setCaptcha('');
  //     });
  // };

  // function onChangereCaptcha(value) {
  //   setCaptcha(value);
  // }

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  return (
    <div className={`${classMain}`}>
      <section className={`${classMain}_section_1`}>
        <h1 className="common-page-title">CONTACT US</h1>
      </section>

      <section className={`${classMain}_section_2`}>
        <div className={`container`}>
          <Row>
            <Col md={6} sm={12} className={`${classMain}_col_left mb-5`}>
              <img src={getImagePath(value)} className="img-fluid" />
            </Col>
            <Col md={6} sm={12} className={`${classMain}_col_right`}>
              <div
                dangerouslySetInnerHTML={{__html: BLOCK_2.title}}
                className="mb-4"
              />
              <div
                dangerouslySetInnerHTML={{__html: BLOCK_2.description}}
                className="mb-4"
              />
              <Form
                ref={ref}
                data={{
                  ...data,
                  //captcha,
                }}
                rules={{
                  sender: ['required'],
                  email: ['email', 'required'],
                  contact: ['required'],
                  content: ['required'],
                  //captcha: ['required'],
                }}
                setError={setErr}
                onFinish={onFinish}>
                <InputOnlyRow
                  name={`Name`}
                  id={`sender`}
                  value={data.sender}
                  onChange={(value) => onChangeData({sender: value})}
                  feedback={err.sender}
                />
                <InputOnlyRow
                  name={`Email Address`}
                  id={`email_address`}
                  value={data.email}
                  onChange={(value) => onChangeData({email: value})}
                  feedback={err.email}
                />
                <InputOnlyRow
                  name={`Contact Number`}
                  id={`contact_number`}
                  value={data.contact}
                  onChange={(value) => onChangeData({contact: value})}
                  feedback={err.contact}
                />
                <TextareaOnlyRow
                  name={`Enquiry`}
                  id={`enquiry`}
                  value={data.content}
                  onChange={(value) => onChangeData({content: value})}
                  feedback={err.content}
                />
                {/* <FormGroup row>
                  <Col sm={12}>
                    <ReCAPTCHA
                      ref={ref}
                      sitekey={config.RE_CAPTCHA_SITEKEY}
                      onChange={onChangereCaptcha}
                    />
                    <div
                      className="invalid-feedback"
                      style={{display: 'block'}}>
                      {(err.captcha || '').replace(':name', 'ReCAPTCHA')}
                    </div>
                  </Col>
                </FormGroup> */}
                <Button block type={`submit`}>
                  <b>SUBMIT</b>
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default Contact;
