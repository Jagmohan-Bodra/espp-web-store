import {authClient} from '../apiClient.js';

const getMe = () => {
  return authClient.get('/v1/users/me');
};

const updateMeUser = (data) => {
  return authClient.put('/v1/users/me', data);
};

const getMeSettings = () => {
  return authClient.get('/v1/users/me/settings');
};

const updateMeSettings = (data) => {
  return authClient.put('/v1/users/me/settings', data);
};

const changePasswordMe = (data) => {
  return authClient.post('/v1/change-password', data);
};

const changeEmail = (data) => {
  return authClient.post('/v1/change-email', data);
};

const signOut = () => {
  return authClient.post('/v1/auth/sign-out');
};

export default {
  getMe,
  updateMeUser,
  getMeSettings,
  updateMeSettings,
  changePasswordMe,
  changeEmail,
  signOut,
};
