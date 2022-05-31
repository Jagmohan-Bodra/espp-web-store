import _ from 'lodash';

import config, {getAccessToken, setAccessToken} from '~/config';
import RestfulClient from '~/helpers/restful-client';

export const publicClient = RestfulClient({
  config: {
    attempts: 3,
    baseURL: config.API_URL,
    auth: {
      email: config.LOGIN_EMAIL,
      password: config.LOGIN_PASSWORD,
    },
    baseHeaders: {
      'Content-Type': 'application/json',
      tenant_id: config.TENANT_ID,
      platform: 'web',
      currency: 'sgd',
      language: 'en-us',
    },
  },
  headerLoader: (headers) => headers,
  responseHandler: ({data}) => data,
  errorHandler: (err) => {
    throw err;
  },
});

const refreshToken = async () => {
  const resp = await publicClient.post('/v1/users/sign-in', {
    email: config.LOGIN_EMAIL,
    password: config.LOGIN_PASSWORD,
  });
  setAccessToken(_.get(resp, 'data.token'));
};

const headerLoader = (headers) => {
  return {
    ...headers,
    Authorization: `Bearer ${getAccessToken()}`,
  };
};

const responseHandler = ({data}) => {
  return data;
};

const errorHandler = async (error) => {
  if (_.get(error, 'response.status') === 401) {
    await refreshToken();
  }
  throw error;
};

export const authClient = RestfulClient({
  config: {
    attempts: 3,
    baseURL: config.API_URL,
    auth: {
      email: config.LOGIN_EMAIL,
      password: config.LOGIN_PASSWORD,
    },
    baseHeaders: {
      'Content-Type': 'application/json',
      tenant_id: config.TENANT_ID,
      platform: 'web',
      currency: 'sgd',
      language: 'en-us',
    },
  },
  headerLoader,
  responseHandler,
  errorHandler,
});
