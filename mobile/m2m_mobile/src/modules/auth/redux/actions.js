import _ from 'lodash';
import config from '~/appConfig';
import {
  buildActionType,
  buildRequestEndpoint,
  fetchRequest,
  LOGOUT,
} from '~/modules/core';
import { MODULE_NAME } from '../const';

export const SET_AUTH_TOKEN = buildActionType(MODULE_NAME, 'SET_AUTH_TOKEN');
export const CLEAR_AUTH_TOKEN = buildActionType(MODULE_NAME, 'CLEAR_AUTH_TOKEN');

export const USER_REGISTERED = buildActionType(MODULE_NAME, 'USER_REGISTERED');
export const USER_LOGGED_OUT = buildActionType(MODULE_NAME, 'USER_LOGGED_OUT');

export const USER_SETTINGS_UPDATED = buildActionType(MODULE_NAME, 'USER_SETTINGS_UPDATED');

export const SET_APP_READY = buildActionType(MODULE_NAME, 'SET_APP_READY');

const AUTH_TOKEN_ENDPOINT = buildRequestEndpoint('/auth/login');

export function setAppReady() {
  return { type: SET_APP_READY };
}

export function logout() {
  return { type: LOGOUT };
}

export function fetchAuthToken() {
  return dispatch => {
    const authTokenBody = {
      email: config.auth.email,
      password: config.auth.pass,
      application: config.applicationId,
    };

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(authTokenBody),
    };

    return fetchRequest(AUTH_TOKEN_ENDPOINT, fetchConfig)
      .then(payload => dispatch({
        type: SET_AUTH_TOKEN,
        payload: { token: payload.token },
      }))
      .catch(error => { throw error; });
  };
}
