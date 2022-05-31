import querystring from 'querystring';
import qs from 'qs';
import config from '~/config';
export default class ApiClient {
  constructor(fetcher) {
    this._api_host = config.API_URL;
    this._fetcher = fetcher;
  }

  get(endpoint, params) {
    if (params) {
      Object.keys(params).forEach((k) => params[k] === '' && delete params[k]);
    }
    const query = params
      ? `?${qs.stringify(params, {skipNulls: true, skipEmptyStrings: true})}`
      : '';
    //return this._fetcher(this._api_host + endpoint + query);
    return this._fetcher(this._api_host + endpoint + query, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.ACCESS_TOKEN}`,
        tenant_id: config.TENANT_ID,
      },
    });
  }

  getQuery(endpoint, params) {
    if (params) {
      Object.keys(params).forEach((k) => params[k] === '' && delete params[k]);
    }
    const query = params
      ? '?tenant_id=' +
        config.TENANT_ID +
        '&' +
        qs.stringify(params, {skipNulls: true, skipEmptyStrings: true})
      : '';
    return this._fetcher(this._api_host + endpoint + query);
  }

  getBody(endpoint, data) {
    return this._fetcher(this._api_host + endpoint, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        tenant_id: config.TENANT_ID,
      },
      body: JSON.stringify(data),
    });
  }

  post(endpoint, data, headers) {
    return this._fetcher(this._api_host + endpoint, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        tenant_id: config.TENANT_ID,
        ...headers,
      },
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this._fetcher(this._api_host + endpoint, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        tenant_id: config.TENANT_ID,
      },
      body: JSON.stringify(data),
    });
  }

  patch(endpoint, data) {
    return this._fetcher(this._api_host + endpoint, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        tenant_id: config.TENANT_ID,
      },
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this._fetcher(this._api_host + endpoint, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        tenant_id: config.TENANT_ID,
      },
    });
  }

  postUploadFile(endpoint, data) {
    var formData = new FormData();
    formData.append('files', data);
    return this.uploadFile(endpoint, undefined, formData);
  }

  /* istanbul ignore next: it's very hard to test */
  uploadFile(endpoint, params, data, onProgress, headers) {
    const query = params
      ? '?tenant_id=' + config.TENANT_ID + '&' + querystring.stringify(params)
      : '';
    const url = this._api_host + endpoint + query;
    return this._fetcher(
      url,
      {
        method: 'POST',
        mode: 'cors',
        headers,
        body: data,
      },
      onProgress,
    );
  }

  /* istanbul ignore next: it's very hard to test */
  downloadFile(endpoint, params, data, onProgress) {
    const query = params ? '?' + querystring.stringify(params) : '';
    const url = this._api_host + endpoint + query;
    return this._fetcher(
      url,
      {
        method: 'GET',
        headers: {
          'Cache-Control': 'no cache',
          tenant_id: config.TENANT_ID,
        },
        body: data,
      },
      onProgress,
    );
  }
}
