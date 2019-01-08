import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { logoutReducerFactory } from '~/modules/core';
import { MODULE_NAME } from '../const';
import {
  VEHICLE_SUBSCRIBED,
  VEHICLE_UNSUBSCRIBED,
  SET_GOOGLE_AUTH_TOKEN,
  CLEAR_GOOGLE_AUTH_TOKEN,
  SET_SESSION_AUTH_TOKEN,
  CLEAR_SESSION_AUTH_TOKEN,
  SET_USER,
} from './actions';
import { LOGOUT } from '../../core';

export function googleAuthTokenReducer(state = '', action) {
  switch (action.type) {
    case SET_GOOGLE_AUTH_TOKEN:
      return action.payload.token;
    case CLEAR_GOOGLE_AUTH_TOKEN:
      return '';
    default:
      return state;
  }
}

export function sessionAuthTokenReducer(state = '', action) {
  switch (action.type) {
    case SET_SESSION_AUTH_TOKEN:
      return action.payload.token;
    case LOGOUT:
    case CLEAR_SESSION_AUTH_TOKEN:
      return '';
    default:
      return state;
  }
}

export function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export function vehicleReducer(state = {}, action) {
  switch (action.type) {
    case VEHICLE_SUBSCRIBED:
      return action.payload.vehicle;
    case VEHICLE_UNSUBSCRIBED:
      return {};
    default:
      return state;
  }
}

export const persistConfig = {
  key: MODULE_NAME,
  storage,
  blacklist: [],
};

export const combinedReducer = combineReducers({
  user: logoutReducerFactory(userReducer),
  googleToken: logoutReducerFactory(googleAuthTokenReducer),
  sessionToken: logoutReducerFactory(sessionAuthTokenReducer),
  vehicle: logoutReducerFactory(vehicleReducer),
});

export default persistReducer(persistConfig, combinedReducer);
