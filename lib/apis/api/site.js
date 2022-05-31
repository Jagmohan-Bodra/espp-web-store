import {authClient} from '../apiClient.js';
import endPoint from '../endPoint';

const getSiteList = (data) => {
  return authClient.get(endPoint.SITE_LIST, data);
};

const getSiteDetail = (id) => {
  return authClient.get(endPoint.SITE_DETAILS(id));
};

const postSiteCreate = (data) => {
  return authClient.post(endPoint.SITE_CREATE, data);
};

const postSiteUpdate = (id, data) => {
  return authClient.post(endPoint.SITE_UPDATE(id), data);
};

const postSiteDelete = (id, data) => {
  return authClient.post(endPoint.SITE_DELETE(id), data);
};

export default {
  getSiteList,
  getSiteDetail,
  postSiteCreate,
  postSiteUpdate,
  postSiteDelete,
};
