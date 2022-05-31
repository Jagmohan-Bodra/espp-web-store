import * as Types from './type';
import meApi from '~/lib/apis/api/me';
import {jwtAuth} from '~/lib/apis/utils/fetcher';

export const reqSignOut = (Router) => (dispatch) => {
  dispatch(reqRemoveMe());
  jwtAuth.removeToken();
  Router && Router.reload();
};

export const changeEmailUpdate = (data) => {
  return meApi
    .changeEmail(data)
    .then(() => true)
    .catch(() => false);
};

export const reqGetMe = () => (dispatch) => {
  return meApi.getMe().then((data) => {
    dispatch(actGetMe(data.data));
  });
};

export const reqRemoveMe = () => (dispatch) => {
  return dispatch(actGetMe(''));
};

const actGetMe = (data) => {
  return {
    type: Types.GET_ME,
    data,
  };
};

export const reqIsUpdate = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

const actIsUpdate = (data) => {
  return {
    type: Types.ME_IS_UPDATE,
    data,
  };
};
