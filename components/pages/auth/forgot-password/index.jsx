import {useState} from 'react';
import {Form, FormGroup, Button, Input} from 'reactstrap';
import validate, {isEmpty} from 'validate.js';
import {FormErrorMessage} from '~/components/public/FormHelpers/FormErrorMessage';
import {reqForgetPassword} from '~/lib/services/auth';
import Router from 'next/router';
import pathRouter from '~/constants/path-router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate(
      {email},
      {
        email: {
          presence: {
            allowEmpty: false,
            message: 'Email is required',
          },
        },
      },
      {
        fullMessages: false,
      },
    );

    if (!isEmpty(errs)) {
      return setErrors(errs);
    }
    setErrors(true);
    await reqForgetPassword({email});
  };

  const messageBuilder = (fieldName) => {
    let errs = errors[fieldName];
    if (isEmpty(errs)) return;
    return <FormErrorMessage data={errs} />;
  };

  return (
    <div className={`forgot-password`}>
      <div className={`forgot-password_container`}>
        <div className={`forgot-password_container_header`}>
          <h2 className={`forgot-password_container_header_title`}>
            FORGOT YOUR PASSWORD?
          </h2>
        </div>
        <div className={`forgot-password_container_box`}>
          <div className={`forgot-password_container_box_description`}>
            <p className={`forgot-password_container_box_text`}>
              Please enter the email you registered to ESPP
            </p>
          </div>
          <div className={`forgot-password_container_box_form`}>
            <Form className={`form-login`} onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  className={`forgot-password_container_box_form_input`}
                  placeholder="Email"
                  name="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  invalid={messageBuilder('email') ? true : false}
                />
                {messageBuilder('email')}
              </FormGroup>
              <br />
              <Button
                className={`forgot-password_container_box_form_btnSubmit`}
                type={'submit'}>
                SEND
              </Button>
            </Form>
          </div>
          <div className={`sign-in_container_box_bottom`}>
            <Button
              onClick={() => Router.push({pathname: pathRouter.SIGNIN_PAGE})}
              className={`sign-in_container_box_bottom_btnBackSignIn`}
              color="link">
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

SignIn.defaultProps = {
  isModal: false,
  loginClick: () => {},
  signUpClick: () => {},
  onFinish: () => {},
};

export default SignIn;
