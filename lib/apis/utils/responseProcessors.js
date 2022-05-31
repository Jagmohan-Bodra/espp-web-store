import {initializeStore} from '../../../reduxs/store';
import {THROW_ERROR} from '../../../reduxs/error/reducer';
import {jwtAuth} from './fetcher';
const MESSAGE_BAD_REQUEST = 'Bad Request';

export const logoutOnUnauthorized = async (response) => {
  if (response.status === 401) {
    await jwtAuth.removeToken();
  }
  return response;
};

export function rejectInvalidStatusCode({response, json}) {
  if (json.message && json.message == MESSAGE_BAD_REQUEST) {
    throwErr({
      statusCode: response.status,
      message: json.data,
    });
    throw '';
  }
  if (response.status >= 200 && response.status < 300) {
    return {response, json};
  }
  // errors for redux-form
  if (json.errors) {
    return throwErr(json.errors);
  }
  if (json.data && json.data.errors) {
    return throwErr(json.data);
  }
  throwErr({
    statusCode: response.status,
    message:
      json.message ||
      (json.data && json.data.message) ||
      `Server error: ${response.statusText}`,
  });
  throw '';
}

export async function toJson(response) {
  try {
    const json = await response.json();
    return {response, json};
  } catch (_) {
    // handle error while parsing json
    throwErr({
      statusCode: response.status,
      message: response.statusText,
    });
    throw '';
  }
}

export function getJson(res) {
  if (res && res.json) {
    return res.json;
  }
}

export const checkErr = (res) => {
  if (res && res.status && res.status >= 400 && res.status <= 500) {
    throwErr(res || {});
    throw '';
  }
  return res;
};

const throwErr = (errors) => {
  const {dispatch} = initializeStore();
  dispatch({
    type: THROW_ERROR,
    errors,
  });
};
