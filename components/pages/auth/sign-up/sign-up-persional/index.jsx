import {useState, useRef} from 'react';
import {Form, FormGroup, Button, Input, Row, Col} from 'reactstrap';
import validate, {isEmpty} from 'validate.js';
import ReCAPTCHA from 'react-google-recaptcha';
import {FormErrorMessage} from '~/components/public/FormHelpers/FormErrorMessage';
import HeaderAuth from '~/components/pages/auth/header-auth';
import formConstraints from './formConstraints';
import config from '~/config';
const cssClass = 'sign-up-persional-form';

const SignUpPersionalForm = (props) => {
  const {onFinish} = props;
  const [data, setData] = useState({});
  const [errors, setErrors] = useState([]);
  const [captcha, setCaptcha] = useState();
  const ref = useRef(null);

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = {...data, ...{captcha: captcha}};
    let errs = validate(check, formConstraints, {
      fullMessages: false,
    });
    if (!isEmpty(errs)) {
      return setErrors(errs);
    }
    setErrors(true);
    onFinish && onFinish(data, captcha);
    ref.current.reset();
    setCaptcha('');
  };

  const messageBuilder = (fieldName) => {
    let errs = errors[fieldName];
    if (isEmpty(errs)) return;
    return <FormErrorMessage data={errs} />;
  };

  const messageBuilderReCaptcha = () => {
    let errs = errors['captcha'];
    if (isEmpty(errs)) return;
    return <FormErrorMessage data={errs} className="d-block" />;
  };

  return (
    <div className={`${cssClass}`}>
      <div className={`${cssClass}_container`}>
        <HeaderAuth signUp />
        <div className={`${cssClass}_container_box`}>
          <div className={`${cssClass}_container_box_description`}>
            <p className={`${cssClass}_container_box_text`}>
              Please fill out the information below to create your ESPP account.
              All fields are required.
            </p>
          </div>
          <div className={`${cssClass}_container_box_form`}>
            <Form className={`form-login`} onSubmit={handleSubmit}>
              <Row>
                <Col xs="6">
                  <FormGroup>
                    <Input
                      className={`${cssClass}_container_box_form_input`}
                      placeholder="First Name"
                      name="firstName"
                      defaultValue={data.firstName}
                      onChange={(e) =>
                        onChangeData({firstName: e.target.value})
                      }
                      invalid={messageBuilder('firstName') ? true : false}
                    />
                    {messageBuilder('firstName')}
                  </FormGroup>
                </Col>
                <Col xs="6">
                  <FormGroup>
                    <Input
                      className={`${cssClass}_container_box_form_input`}
                      placeholder="Last Name"
                      name="lastName"
                      defaultValue={data.lastName}
                      onChange={(e) => onChangeData({lastName: e.target.value})}
                      invalid={messageBuilder('lastName') ? true : false}
                    />
                    {messageBuilder('lastName')}
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <Input
                  className={`${cssClass}_container_box_form_input`}
                  placeholder="Contact Number"
                  name="phone"
                  defaultValue={data.phone}
                  onChange={(e) => onChangeData({phone: e.target.value})}
                  invalid={messageBuilder('phone') ? true : false}
                />
                {messageBuilder('phone')}
              </FormGroup>

              <FormGroup>
                <Input
                  className={`${cssClass}_container_box_form_input`}
                  placeholder="Email Address"
                  name="email"
                  defaultValue={data.email}
                  onChange={(e) => onChangeData({email: e.target.value})}
                  invalid={messageBuilder('email') ? true : false}
                />
                {messageBuilder('email')}
              </FormGroup>

              <FormGroup>
                <Input
                  className={`${cssClass}_container_box_form_input`}
                  placeholder="Password"
                  name="password"
                  type="password"
                  defaultValue={data.password}
                  onChange={(e) => onChangeData({password: e.target.value})}
                  invalid={messageBuilder('password') ? true : false}
                />
                {messageBuilder('password')}
              </FormGroup>

              <FormGroup>
                <Input
                  className={`${cssClass}_container_box_form_input`}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  defaultValue={data.confirmPassword}
                  onChange={(e) =>
                    onChangeData({confirmPassword: e.target.value})
                  }
                  invalid={messageBuilder('confirmPassword') ? true : false}
                />
                {messageBuilder('confirmPassword')}
              </FormGroup>

              <FormGroup>
                <ReCAPTCHA
                  ref={ref}
                  sitekey={config.RE_CAPTCHA_SITEKEY}
                  onChange={setCaptcha}
                />
                {messageBuilderReCaptcha()}
              </FormGroup>

              <Button
                className={`${cssClass}_container_box_form_btnSubmit`}
                type={'submit'}>
                SIGN UP
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPersionalForm;
