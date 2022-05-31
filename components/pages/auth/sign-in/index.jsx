import {useState, useEffect} from 'react';
import {Form, FormGroup, Button, Input} from 'reactstrap';
import validate, {isArray, isEmpty, isObject} from 'validate.js';
import {FormErrorMessage} from '~/components/public/FormHelpers/FormErrorMessage';
import {reqSignIn} from '~/lib/services/auth';
import HeaderAuth from '../header-auth';
import Router from 'next/router';
import {reqGetMe} from '~/reduxs/me/action';
import {useDispatch, useSelector} from 'react-redux';
import {getCache} from '~/lib/cache';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faUser} from '@fortawesome/free-regular-svg-icons';
// import {faLock} from '@fortawesome/free-solid-svg-icons';

const SignIn = (props) => {
  const dispatch = useDispatch();
  const {isModal, loginClick, signUpClick, onFinish} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [err, setErr] = useState();
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (error.isErr) {
      setErr(error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate(
      {email, password},
      {
        email: {
          presence: {
            allowEmpty: false,
            message: 'Username is required',
          },
        },
        password: {
          presence: {
            allowEmpty: false,
            message: 'Password is required',
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
    await reqSignIn({email, password})
      .then(() => {
        if (!isEmpty(getCache('access_token'))) {
          dispatch(reqGetMe());
        }
      })
      .then(() => onFinish());
  };

  const messageBuilder = (fieldName) => {
    let errs = errors[fieldName];
    if (isEmpty(errs)) return;
    return <FormErrorMessage data={errs} />;
  };

  const handleSignUpClick = () => {
    if (isModal) {
      return signUpClick();
    }
    Router.push({pathname: '/auth/sign-up'});
  };

  const getMessageErr = () => {
    const notif = ((err || {}).message || {}).message || '';
    if (!notif) {
      return false;
    }
    if (isArray(notif) && notif.length > 0) {
      return notif[0].reason;
    }
    if (isObject(notif) && notif.arg && notif.reason) {
      return notif.reason;
    }
    return JSON.stringify(notif || '');
  };

  return (
    <div className={`sign-in`}>
      <div className={`sign-in_container`}>
        <HeaderAuth
          signIn={true}
          isModal={isModal}
          loginClick={loginClick}
          signUpClick={signUpClick}
        />
        <div className={`sign-in_container_box`}>
          <div className={`sign-in_container_box_description`}>
            <p className={`sign-in_container_box_text`}>
              Please enter your Email Address and Password to access account.
            </p>
          </div>
          <div className={`sign-in_container_box_form`}>
            <Form className={`form-login`} onSubmit={handleSubmit}>
              <FormGroup>
                {/* <FontAwesomeIcon icon={faUser} className="form-icon" /> */}
                <Input
                  className={`sign-in_container_box_form_input`}
                  placeholder="Email"
                  name="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  invalid={messageBuilder('email') ? true : false}
                />
                {messageBuilder('email')}
              </FormGroup>

              <FormGroup>
                {/* <FontAwesomeIcon icon={faLock} className="form-icon" /> */}
                <Input
                  className={`sign-in_container_box_form_input`}
                  placeholder="Password"
                  name="password"
                  type="password"
                  defaultValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                  invalid={messageBuilder('password') ? true : false}
                />
                {messageBuilder('password')}
              </FormGroup>
              {!!getMessageErr() && (
                <p className="alert alert-danger" role="alert">
                  {getMessageErr()}
                </p>
              )}

              <Button
                onClick={() => Router.push({pathname: '/auth/forgot-password'})}
                className={`sign-in_container_box_form_btnForGot`}
                color="link">
                Forgot your password?
              </Button>
              <br />
              <Button
                className={`sign-in_container_box_form_btnSubmit`}
                type={'submit'}>
                LOGIN
              </Button>
            </Form>
          </div>
          <div className={`sign-in_container_box_bottom`}>
            <span className={`sign-in_container_box_text`}>
              {`Don't have an account?`}
            </span>
            <Button
              className={`sign-in_container_box_bottom_btnSignUp`}
              color="link"
              onClick={handleSignUpClick}>
              Sign up
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
