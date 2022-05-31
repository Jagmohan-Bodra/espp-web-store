import apis from '~/lib/apis/api/me';

export const updateMeSettingsService = (data) => {
  return apis.updateMeSettings(data);
};

export const updateMeUserService = (data) => {
  return apis.updateMeUser(data);
};
