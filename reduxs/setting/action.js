import * as Types from './type';
import * as settingService from '~/lib/services/setting';

export const getSettingList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return settingService
    .getSettingList(query)
    .then((data) => {
      dispatch(actGetList(data));
      dispatch(actLoading(false));
      return data;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return;
    });
};

export const actGetList = (data) => {
  return {
    type: Types.GET_SETTING_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.SETTING_LOADING,
    data,
  };
};
