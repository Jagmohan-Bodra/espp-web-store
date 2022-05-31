import {authClient} from '../apiClient.js';

const getColorList = (data) => {
  return authClient.get('/v1/search-colors', data);
};

const getColorDetail = (id) => {
  return authClient.get('/v1/search-colors/' + id);
};

export default {
  getColorList,
  getColorDetail,
};
