import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { logoutReducerFactory } from '~/modules/core';
import { MODULE_NAME } from '../const';
import {
  SET_AUTH_TOKEN,
  CLEAR_AUTH_TOKEN,
  USER_REGISTERED,
  USER_LOGGED_OUT,
  USER_SETTINGS_UPDATED,
} from './actions';

export function googleAuthTokenReducer(state = '', action) {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return action.payload.token;
    case CLEAR_AUTH_TOKEN:
      return '';
    default:
      return state;
  }
}

export function sessionAuthTokenReducer(state = '', action) {
  switch (action.type) {
    default:
      return state;
  }
}

export function userReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTERED:
      return {
        ...state,
        ...action.payload,
      };
    case USER_LOGGED_OUT:
      return {};
    case USER_SETTINGS_UPDATED:
      return {
        ...state,
        settings: action.payload,
      };
    default:
      return state;
  }
}

export const persistConfig = {
  key: MODULE_NAME,
  storage,
  blacklist: ['token', 'appReady'],
};

export const combinedReducer = combineReducers({
  user: logoutReducerFactory(userReducer),
  googleToken: logoutReducerFactory(googleAuthTokenReducer),
  sessionToken: logoutReducerFactory(sessionAuthTokenReducer),
});

export default persistReducer(persistConfig, combinedReducer);
