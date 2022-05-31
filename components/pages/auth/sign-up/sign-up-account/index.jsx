import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Button} from 'reactstrap';
import Steps from '~/components/public/Steps';
import HeaderAuth from '../../header-auth';
import Form from '~/components/public/form/Form';
import InputOnlyRow from '~/components/public/form/InputOnlyRow';
import {SIGN_UP_SCREENS} from '~/constants/master-data';
import pathRouter from '~/constants/path-router';

const SignUpAccount = (props) => {
  const {onSubmit} = props;
  const router = useRouter();
  const [data, setData] = useState({});
  const [err, setErr] = useState({});

  useEffect(() => {
    setData(props.data || {});
  }, [props.data]);

  const onChangeData = (value) => {
    setData({...data, ...value});
  };

  const onFinish = () => {
    onSubmit(data);
    router.push({
      pathname: pathRouter.SIGNUP_PAGE,
      query: {queryScreen: SIGN_UP_SCREENS.ACCOUNT_TYPE_CORPORATE_INFO},
    });
  };

  const checkPasswordValid = () => {
    if (data.password !== data.confirmPassword) {
      return 'Password and Confirm password must be the same';
    }
    return false;
  };

  return (
    <div className={`sign-up-account`}>
      <HeaderAuth signUp />
      <div className={`sign-up-account_container`}>
        <div className={`sign-up-account_container_box`}>
          <Steps step="STEP_1" />

          <div className={`sign-up-account_container_box_description`}>
            <p>
              Please enter your Email Address and Password to create your
              account.
            </p>
          </div>
          <div className={`sign-up-account_container_box_form`}>
            <Form
              className={`form-login`}
              data={data}
              rules={{
                email: ['required', 'email'],
                password: ['required', checkPasswordValid],
                confirmPassword: ['required', checkPasswordValid],
              }}
              setError={setErr}
              onFinish={onFinish}>
              <InputOnlyRow
                name={`Email`}
                id={`email`}
                value={data.email}
                onChange={(value) => onChangeData({email: value})}
                feedback={err.email}
              />
              <InputOnlyRow
                name={`Password`}
                id={`password`}
                type="password"
                value={data.password}
                onChange={(value) => onChangeData({password: value})}
                feedback={err.password}
              />
              <InputOnlyRow
                name={`Confirm Password`}
                id={`confirm_password`}
                type="password"
                value={data.confirmPassword}
                onChange={(value) => onChangeData({confirmPassword: value})}
                feedback={err.confirmPassword}
              />
              <Button
                className={`sign-up-account_container_box_form_btnSubmit`}
                type={`submit`}>
                NEXT
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpAccount;
