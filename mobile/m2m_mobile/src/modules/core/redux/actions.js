import _ from 'lodash';
import {
  MODULE_NAME,
  errorCodes,
} from '../const';
import { buildActionType } from '../services';
import {
  isRequestNetworkConnectionError,
  isRequestUnauthorized,
} from '../services/networking';

export const AUTHORIZATION_ERROR = buildActionType(MODULE_NAME, errorCodes.AUTHORIZATION_ERROR);

export const NETWORK_CONNECTION_ERROR = buildActionType(
  MODULE_NAME, errorCodes.NETWORK_CONNECTION_ERROR,
);

export const NETWORK_CONNECTION_OK = buildActionType(MODULE_NAME, 'NETWORK_CONNECTION_OK');

export const SERVER_ERROR = buildActionType(MODULE_NAME, errorCodes.SERVER_ERROR);

export const LOGOUT = buildActionType(MODULE_NAME, 'LOGOUT');

export function requestErrorAction(errorActionType, payload) {
  const {
    error,
    ...otherProps
  } = payload;
  const responseData = _.get(error, 'responseData', {});

  return {
    type: errorActionType,
    payload: {
      ...responseData,
      ...otherProps,
    },
  };
}

export function requestNetworkConnectionOk() {
  return { type: NETWORK_CONNECTION_OK };
}

export function requestNetworkConnectionError() {
  return {
    type: NETWORK_CONNECTION_ERROR,
    payload: { errorCode: errorCodes.NETWORK_CONNECTION_ERROR },
  };
}

export function requestUnauthorized(error) {
  return {
    type: AUTHORIZATION_ERROR,
    payload: _.get(error, 'responseData', null),
  };
}

export function requestServerError(error) {
  const responseData = _.get(error, 'responseData', {});

  return {
    type: SERVER_ERROR,
    payload: responseData,
  };
}

/**
 * Default network success thunk.
 * Dispatches network OK status, and success action with payload
 * @param {func} dispatch Store dispatch function
 * @param {string} successType Success action type to dispatch
 * @param {object} payload Payload to go with success action
 */
export function fetchSuccess(dispatch, successType, payload) {
  dispatch(requestNetworkConnectionOk());

  return dispatch({
    type: successType,
    payload,
  });
}

/**
 * Default network error thunk.
 * Checks various error statuses to determine which error action to dispatch
 * Also dispatches an error action with error payload
 * @param {func} dispatch Store dispatch function
 * @param {*} errorType Error action type to dispatch
 * @param {object} payload Payload to go with error action
 */
export function fetchError(dispatch, errorType, payload) {
  const error = _.get(payload, 'error');
  if (!error) {
    throw new Error('"error" is a required property of "fetchError" payload.');
  }

  if (isRequestNetworkConnectionError(error)) {
    dispatch(requestNetworkConnectionError());
  } else {
    dispatch(requestNetworkConnectionOk());
  }

  if (isRequestUnauthorized(error)) {
    return dispatch(requestUnauthorized());
  }

  return dispatch(requestErrorAction(errorType, payload));
}
