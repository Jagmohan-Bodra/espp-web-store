import moment from 'moment-timezone';
import {isEmpty} from 'validate.js';
import {isServer} from '~/helpers/common';
import config from '~/config';

export default class JWTAuth {
  isEmptyToken() {
    return isEmpty(this.getToken()) || this.getToken() == config.ACCESS_TOKEN;
  }

  setAccessToken(token) {
    if (isServer()) {
      return 'token';
    }
    return localStorage.setItem('access_token', token);
  }

  getToken() {
    if (isServer()) {
      return config.ACCESS_TOKEN;
    }
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('access_token') || config.ACCESS_TOKEN;
    }
  }

  checkToken() {
    if (isServer()) {
      return '';
    }
    if (localStorage.getItem('access_token')) {
      return true;
    }
    return false;
  }

  removeToken() {
    if (isServer()) {
      return '';
    }
    return localStorage.removeItem('access_token');
  }

  appendToken(opts = {}) {
    const optHeaders = opts.headers || {};
    return {
      ...opts,
      headers: {
        ...optHeaders,
        timezone: moment.tz.guess(),
        Authorization: `Bearer ${this.getToken()}`,
        tenant_id: config.TENANT_ID,
      },
    };
  }

  getFetchFn() {
    return (url, options) => fetch(url, this.appendToken(options));
  }
}
