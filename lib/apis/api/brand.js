import {authClient} from '../apiClient';

const getBrandList = (data) => {
  return authClient.get('/v1/search-brands', data);
};

const getBrandDetail = (id) => {
  return authClient.get('/v1/search-brands/' + id);
};

export default {
  getBrandList,
  getBrandDetail,
};
