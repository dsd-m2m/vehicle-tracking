import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { logoutReducerFactory } from '~/modules/core';
import { MODULE_NAME } from '../const';
import {
  REQUEST_CAR_STATE,
  SET_CAR_STATE,
  GET_CAR_STATE,
} from './actions';


export function carStateReducer(
  state = {
    ac: false,
    radiator: false,
    lights: false,
    hazzard: false,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_CAR_STATE:
      return state;
    case GET_CAR_STATE:
      return {
        ...state,
        ...action.payload.state,
      };
    case SET_CAR_STATE:
      return {
        ...state,
        ...action.payload.state,
      };
    default:
      return state;
  }
}

export const persistConfig = {
  key: MODULE_NAME,
  storage,
  blacklist: ['carState'],
};

export const combinedReducer = combineReducers({ carState: logoutReducerFactory(carStateReducer) });

export default persistReducer(persistConfig, combinedReducer);
