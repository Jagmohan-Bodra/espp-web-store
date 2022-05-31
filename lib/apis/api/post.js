import {authClient} from '../apiClient.js';

const getPostList = (data) => authClient.get('/v1/cms/posts', data);

const getPostDetail = (postId, data) =>
  authClient.get(`/v1/cms/posts/${postId}`, data);

export default {
  getPostList,
  getPostDetail,
};
