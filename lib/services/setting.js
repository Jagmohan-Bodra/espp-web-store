import settingApi from '../apis/api/settings';

export const getSettingList = (data) => {
  return settingApi.getSettings(data).then((data) => data.data);
};

export const getSettingByKey = (key) => {
  return settingApi.getSettingByKey(key).then((data) => data.data);
};
