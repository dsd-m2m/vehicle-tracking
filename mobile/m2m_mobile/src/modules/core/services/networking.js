import _ from 'lodash';
import AppConfig from '~/appConfig';
import URI from 'urijs';
import {
  CACHE_EXPIRY,
  NETWORK_ERROR_CODE_ANDROID,
  NETWORK_ERROR_CODE_IOS,
} from '../const';

const defaultHeaders = {
  'Content-type': 'application/json',
  Accept: 'application/x.PBB.v1.0.0+json',
};

export function getAuthorizationHeader(accessToken) {
  return `Bearer ${accessToken}`;
}

const API_BASE_URL = AppConfig.apiBaseUrl;

function composeRequestOptions(config) {
  const {
    authorization,
    headers = {},
    ...options
  } = config;

  if (authorization) {
    headers.Authorization = getAuthorizationHeader(authorization);
  }

  return {
    ...options,

    headers: new Headers({
      ...defaultHeaders,
      ...headers,
    }),
  };
}

export class RequestError extends Error {
  constructor(response, responseData) {
    super(response.statusText);
    this.response = response;
    this.responseData = responseData;
    this.status = response.status;
    this.statusText = response.statusText;
  }
}

export function checkResponseStatus([response, responseData]) {
  if (!response.ok) {
    throw new RequestError(response, responseData);
  }

  return Promise.all([response, responseData]);
}

export function parseResponseData(response) {
  const contentTypeHeader = response.headers.get('content-type');
  const isJsonContent = contentTypeHeader && _.includes(contentTypeHeader, 'application/json');

  if (isJsonContent) {
    return Promise.all([response, response.clone().json()]);
  }

  return [response, {}];
}

export function buildRequestEndpoint(path, params = {}) {
  const endpoint = new URI(`${API_BASE_URL}/${path}`);

  endpoint.protocol('http');
  endpoint.query(params);
  return endpoint.readable();
}

export function fetchRequest(endpoint, config) {
  const requestOptions = composeRequestOptions(config);

  return new Promise((resolve, reject) => (
    fetch(endpoint, requestOptions)
      .then(parseResponseData)
      .then(checkResponseStatus)
      .then(([response, responseJson]) => ( // eslint-disable-line no-unused-vars
        resolve(responseJson)
      ))
      .catch(error => {
        reject(error);
      })
  ));
}

export function isRequestUnauthorized(error) {
  return (_.get(error, 'status') === 401);
}

export function isRequestNetworkConnectionError(error) {
  const requestMessage = _.get(error, 'message');
  return (requestMessage === 'Network request failed');
}

export function isRequestServerError(error) {
  return (_.get(error, 'status') === 500);
}

export function isCacheValid(lastUpdated) {
  if (lastUpdated === -1) {
    return false;
  }

  const now = new Date().getTime();
  const isValid = now - lastUpdated < CACHE_EXPIRY;

  return isValid;
}

export function isWebViewNetworkError(errorEvent = {}) {
  const { code } = errorEvent;

  return (
    code === NETWORK_ERROR_CODE_IOS
    || code === NETWORK_ERROR_CODE_ANDROID
  );
}
