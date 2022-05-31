import {authClient} from '../apiClient.js';

const getSettings = (data) => {
  return authClient.get(`/v1/settings`, data);
};

const getSettingByKey = (key) => {
  return authClient.get('/v1/system-settings/CLEANCLEAN/setting-keys/' + key);
};

export default {
  getSettings,
  getSettingByKey,
};
