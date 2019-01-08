import { google } from 'react-native-simple-auth';
import Config from '~/appConfig';
import {
  buildActionType,
  buildRequestEndpoint,
  fetchRequest,
  LOGOUT,
} from '~/modules/core';
import { MODULE_NAME } from '../const';
import {
  getGoogleAuthToken,
  getSessionAuthToken,
} from './selectors';

export const SET_SESSION_AUTH_TOKEN = buildActionType(MODULE_NAME, 'SET_SESSION_AUTH_TOKEN');
export const CLEAR_SESSION_AUTH_TOKEN = buildActionType(MODULE_NAME, 'CLEAR_SESSION_AUTH_TOKEN');

export const SET_GOOGLE_AUTH_TOKEN = buildActionType(MODULE_NAME, 'SET_GOOGLE_AUTH_TOKEN');
export const CLEAR_GOOGLE_AUTH_TOKEN = buildActionType(MODULE_NAME, 'CLEAR_GOOGLE_AUTH_TOKEN');

export const VEHICLE_SUBSCRIBED = buildActionType(MODULE_NAME, 'VEHICLE_SUBSCRIBED');
export const VEHICLE_UNSUBSCRIBED = buildActionType(MODULE_NAME, 'VEHICLE_UNSUBSCRIBED');

export const SET_USER = buildActionType(MODULE_NAME, 'SET_USER');

const LOGIN_ENDPOINT = buildRequestEndpoint('auth/login/mobile');

const VEHICLE_ENDPOINT = buildRequestEndpoint('vehicle');

export function logout() {
  return { type: LOGOUT };
}

export function fetchGoogleAuthToken() {
  return dispatch => google({
    appId: Config.google.appId,
    callback: Config.google.callback,
  }).then(info => dispatch({
    type: SET_GOOGLE_AUTH_TOKEN,
    payload: { token: info.credentials.id_token },
  })).catch(error => { throw error; });
}

export function fetchSessionAuthToken() {
  return (dispatch, getState) => {
    const state = getState();

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify({ social_token: getGoogleAuthToken(state) }),
    };

    return fetchRequest(LOGIN_ENDPOINT, fetchConfig)
      .then(payload => dispatch({
        type: SET_SESSION_AUTH_TOKEN,
        payload,
      }))
      .catch(error => { throw error; });
  };
}

export function fetchUser() {
  return (dispatch, getState) => {
    const fetchConfig = {
      method: 'POST',
      authorization: getSessionAuthToken(getState()),
    };

    return fetchRequest(LOGIN_ENDPOINT, fetchConfig)
      .then(payload => dispatch({
        type: SET_USER,
        payload,
      }))
      .catch(error => { throw error; });
  };
}

export function subscribeToCar(vin) {
  return (dispatch, getState) => {
    const sessionToken = getSessionAuthToken(getState());


    const fetchConfig = {
      method: 'PUT',
      authorization: sessionToken,
    };

    return fetchRequest(`${VEHICLE_ENDPOINT}/${vin}/subscribe`, fetchConfig)
      .then(payload => {
        dispatch({
          type: VEHICLE_SUBSCRIBED,
          payload: { vehicle: payload },
        });
      }).catch(error => { throw error; });
  };
}


export function unsubscribeFromCar(vin) {
  return (dispatch, getState) => {
    const sessionToken = getSessionAuthToken(getState());


    const fetchConfig = {
      method: 'PUT',
      authorization: sessionToken,
    };

    return fetchRequest(`${VEHICLE_ENDPOINT}/${vin}/unsubscribe`, fetchConfig)
      .then(() => {
        dispatch({ type: VEHICLE_UNSUBSCRIBED });
      }).catch(error => { throw error; });
  };
}
