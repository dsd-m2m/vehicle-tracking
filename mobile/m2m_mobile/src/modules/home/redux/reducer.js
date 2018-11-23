import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { MODULE_NAME } from '../const';

export function homeReducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const persistConfig = {
  key: MODULE_NAME,
  storage,
  blacklist: ['car'],
};

export const combinedReducer = combineReducers({ home: homeReducer });

export default persistReducer(persistConfig, combinedReducer);
