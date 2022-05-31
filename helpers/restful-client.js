import axios from 'axios';
import qs from 'qs';
import _ from 'lodash';

const getQueryString = (params) => {
  if (_.isEmpty(params)) {
    return '';
  }

  const validParam = Object.keys(params).reduce((prev, cur) => {
    if (params[cur] === '') {
      return prev;
    }

    return {
      ...prev,
      [cur]: params[cur],
    };
  }, {});

  const queryStr = qs.stringify(validParam, {
    skipNulls: true,
    skipEmptyStrings: true,
  });

  return `?${queryStr}`;
};

const asyncRetry = async (next, attempts) => {
  // console.log('Try to call API.....', attempts);
  if (attempts <= 0) {
    throw new Error(`Retry ${attempts}, But It didn't success`);
  }

  try {
    return await next();
  } catch (err) {
    return await asyncRetry(next, attempts - 1);
  }
};

export default ({config, headerLoader, responseHandler, errorHandler}) => {
  const {attempts, baseURL, baseHeaders} = config;

  const clientWrapper = (method, url, params) => () => {
    // console.log('[Call API] ', {url, params});
    const headers = headerLoader(baseHeaders);

    const client = axios.create({
      baseURL: baseURL,
      headers,
    });

    switch (method) {
      case 'GET':
        return client
          .get(`${url}${getQueryString(params)}`)
          .then(responseHandler)
          .catch(errorHandler);

      case 'POST':
        return client
          .post(url, params)
          .then(responseHandler)
          .catch(errorHandler);

      case 'PUT':
        return client
          .put(url, params)
          .then(responseHandler)
          .catch(errorHandler);

      case 'DELETE':
        return client
          .delete(url, params)
          .then(responseHandler)
          .catch(errorHandler);
    }
  };

  return {
    get: (url, params) =>
      asyncRetry(clientWrapper('GET', url, params), attempts),
    post: (url, params) =>
      asyncRetry(clientWrapper('POST', url, params), attempts),
    put: (url, params) =>
      asyncRetry(clientWrapper('PUT', url, params), attempts),
    delete: (url, params) =>
      asyncRetry(clientWrapper('DELETE', url, params), attempts),
  };
};
