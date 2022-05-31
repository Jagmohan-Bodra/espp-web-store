import {useState} from 'react';
import {useRouter} from 'next/router';
import {Button} from 'reactstrap';
import SelectCustom from '~/components/public/select-custom';
import HeaderAuth from '~/components/pages/auth/header-auth';
import {SIGN_UP_SCREENS, ACCOUNT_TYPE} from '~/constants/master-data';
import pathRouter from '~/constants/path-router';
const cssClass = 'sign-up-choose-account-type';

const ChooseAccountType = () => {
  const router = useRouter();
  const [accountType, setAccountType] = useState({});

  const onChangeType = (value) => {
    setAccountType(value);
  };

  const onNextClick = () => {
    if (accountType === ACCOUNT_TYPE.PERSONAL) {
      router.push({
        pathname: pathRouter.SIGNUP_PAGE,
        query: {queryScreen: SIGN_UP_SCREENS.ACCOUNT_TYPE_PERSONAL},
      });
    }

    if (accountType === ACCOUNT_TYPE.CORPORATE) {
      router.push({
        pathname: pathRouter.SIGNUP_PAGE,
        query: {queryScreen: SIGN_UP_SCREENS.ACCOUNT_TYPE_CORPORATE},
      });
    }
  };

  return (
    <div className={cssClass}>
      <p></p>
      <HeaderAuth signUp />
      <div className={`${cssClass}_container`}>
        <div className={`${cssClass}_container_box`}>
          <div className={`${cssClass}_container_box_description`}>
            <p> Sign up your account as: </p>
          </div>
          <div className={`${cssClass}_container_box_form`}>
            <div className={`${cssClass}_container_box_form_flex_space`}>
              <SelectCustom
                label={`Personal`}
                name={`type`}
                value={ACCOUNT_TYPE.PERSONAL}
                checked={accountType == ACCOUNT_TYPE.PERSONAL}
                onChange={(e) => onChangeType(e.target.value)}
                className={accountType == ACCOUNT_TYPE.PERSONAL ? 'active' : ''}
              />
              <SelectCustom
                label={`Corporate`}
                name={`type`}
                value={ACCOUNT_TYPE.CORPORATE}
                checked={accountType == ACCOUNT_TYPE.CORPORATE}
                onChange={(e) => onChangeType(e.target.value)}
                className={
                  accountType == ACCOUNT_TYPE.CORPORATE ? 'active' : ''
                }
              />
            </div>

            <Button
              className={`${cssClass}_container_box_form_btnSubmit`}
              onClick={onNextClick}>
              NEXT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseAccountType;
