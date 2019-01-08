import {
  buildActionType,
  buildRequestEndpoint,
  fetchRequest,
} from '~/modules/core';
import Config from '~/appConfig';
import SocketIOClient from 'socket.io-client';
import { MODULE_NAME } from '../const';
import { getSessionAuthToken } from '~/modules/auth';

export const REQUEST_CAR_STATE = buildActionType(MODULE_NAME, 'REQUEST_CAR_STATE');
export const SET_CAR_STATE = buildActionType(MODULE_NAME, 'SET_CAR_STATE');
export const GET_CAR_STATE = buildActionType(MODULE_NAME, 'GET_CAR_STATE');

export const SET_SOCKET = buildActionType(MODULE_NAME, 'SET_SOCKET');


const VEHICLE_ENDPOINT = buildRequestEndpoint('vehicle');


export function fetchCarState(vin) {
  return (dispatch, getState) => {
    const sessionToken = getSessionAuthToken(getState());


    const fetchConfig = {
      method: 'GET',
      authorization: sessionToken,
    };

    return fetchRequest(`${VEHICLE_ENDPOINT}/${vin}/command`, fetchConfig)
      .then(payload => {
        dispatch({
          type: GET_CAR_STATE,
          payload: { state: payload },
        });
      }).catch(error => { throw error; });
  };
}

export function updateCarState(vin, sensor, value) {
  return (dispatch, getState) => {
    const sessionToken = getSessionAuthToken(getState());


    const fetchConfig = {
      method: 'PUT',
      authorization: sessionToken,
      body: `{"${sensor}" : ${value}}`,
    };

    return fetchRequest(`${VEHICLE_ENDPOINT}/${vin}/command`, fetchConfig)
      .then(() => {
        dispatch({
          type: SET_CAR_STATE,
          payload: { state: { [sensor]: value } },
        });
      }).catch(error => {
        throw error;
      });
  };
}

export function createSocket() {
  return dispatch => {
    const socket = SocketIOClient(Config.socketUrl);

    dispatch({
      type: SET_SOCKET,
      payload: socket,
    });
  };
}
