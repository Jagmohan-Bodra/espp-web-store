import {publicClient} from '../apiClient.js';

const signIn = (data) => {
  return publicClient.post('/v1/users/sign-in', data);
};

const forgetPassword = (data) => {
  return publicClient.post('/v1/users/forgot-password', data);
};

export default {
  signIn,
  forgetPassword,
};
