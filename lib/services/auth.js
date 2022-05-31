import authApi from '~/lib/apis/api/auth';
import md5 from 'md5';
import {notif} from '~/components/public/notification/common';
import Router from 'next/router';
import pathRouter from '~/constants/path-router';

export const reqSignIn = ({email = '', password = '', token = '', os = ''}) => {
  return authApi
    .signIn({email, password: md5(password), token, os})
    .then(async (data) => {
      localStorage.setItem('access_token', data.data.token);
    });
};

export const reqForgetPassword = ({email = ''}) => {
  authApi.forgetPassword({email}).then(() => {
    notif({message: 'Forgot password successfully'});
    Router.push({pathname: pathRouter.SIGNIN_PAGE});
  });
};
