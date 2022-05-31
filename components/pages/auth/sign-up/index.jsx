import {useState} from 'react';
import {useRouter} from 'next/router';
import ChooseAccountType from '~/components/pages/auth/sign-up/choose-account-type';
import SignUpPersional from '~/components/pages/auth/sign-up/sign-up-persional';
import SignUpCorporateAccount from '~/components/pages/auth/sign-up/sign-up-account';
import SignUpCorporateInfo from '~/components/pages/auth/sign-up/sign-up-info';
import {notif} from '~/components/public/notification/common';
import pathRouter from '~/constants/path-router';
import {postCustomer} from '~/lib/services/customer';
import {SIGN_UP_SCREENS} from '~/constants/master-data';

const SignUpMain = () => {
  const router = useRouter();
  const {queryScreen} = router.query;
  const [data, setData] = useState({});

  const onSubmitAccount = (dataAccount) => {
    setData({
      ...data,
      ...dataAccount,
    });
  };

  const onFinish = (results, captcha) => {
    const newData = {
      ...data,
      ...results,
    };

    postCustomer(newData, captcha).then(() => {
      notif({message: 'Successfully register'});
      router.push({pathname: pathRouter.SIGNUP_THANK_PAGE});
    });
  };

  const renderScreenSignUp = () => {
    switch (queryScreen) {
      case SIGN_UP_SCREENS.ACCOUNT_TYPE_PERSONAL:
        return <SignUpPersional onFinish={onFinish} />;
      case SIGN_UP_SCREENS.ACCOUNT_TYPE_CORPORATE:
        return <SignUpCorporateAccount onSubmit={onSubmitAccount} />;
      case SIGN_UP_SCREENS.ACCOUNT_TYPE_CORPORATE_INFO:
        return <SignUpCorporateInfo onFinish={onFinish} />;
      default:
        return <ChooseAccountType />;
    }
  };

  return <div className={`sign-up-main`}>{renderScreenSignUp()}</div>;
};

export default SignUpMain;
