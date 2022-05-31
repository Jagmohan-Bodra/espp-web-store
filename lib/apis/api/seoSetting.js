import {authClient} from '../apiClient.js';
import endPoint from '../endPoint';

const getSeoSettingList = (data) => {
  return authClient.get(endPoint.SEO_SETTING_LIST, data);
};

const getSeoSettingDetail = (id) => {
  return authClient.get(endPoint.SEO_SETTING_DETAILS(id));
};

const postSeoSettingCreate = (data) => {
  return authClient.post(endPoint.SEO_SETTING_CREATE, data);
};

const postSeoSettingUpdate = (id, data) => {
  return authClient.post(endPoint.SEO_SETTING_UPDATE(id), data);
};

const postSeoSettingDelete = (id, data) => {
  return authClient.post(endPoint.SEO_SETTING_DELETE(id), data);
};

export default {
  getSeoSettingList,
  getSeoSettingDetail,
  postSeoSettingCreate,
  postSeoSettingUpdate,
  postSeoSettingDelete,
};
