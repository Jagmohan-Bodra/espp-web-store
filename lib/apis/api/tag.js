import {authClient} from '../apiClient.js';

const getTagList = (data) => {
  return authClient.get('/v1/search-tags', data);
};

const getTagDetail = (id) => {
  return authClient.get('/v1/search-tags/' + id);
};

export default {
  getTagList,
  getTagDetail,
};
