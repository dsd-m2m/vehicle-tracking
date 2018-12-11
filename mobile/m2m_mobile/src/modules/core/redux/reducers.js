import _ from 'lodash';
import { combineReducers } from 'redux';
import {
  errorCodes,
  successCodes,
  INITIAL_SKIP,
  PAGE_SIZE,
} from '../const';
import {
  NETWORK_CONNECTION_ERROR,
  NETWORK_CONNECTION_OK,
  LOGOUT,
} from './actions';
import { createDefaultRequestStatus } from '../services';

function timestampReducerFactory(successAction) {
  return (state = -1, action) => {
    switch (action.type) {
      case successAction:
        return new Date().getTime();
      default:
        return state;
    }
  };
}

export function cacheReducerFactory(collectionReducer, successAction) {
  return combineReducers({
    collection: collectionReducer,
    lastUpdated: timestampReducerFactory(successAction),
  });
}

/**
 * Bacause of: https://github.com/rt2zz/redux-persist/issues/659
 * we have to make each reducer handle the LOGOUT action. To ease up the pain,
 * each reducer that should reset it's state on LOGOUT action can
 * be wrapped with this reducer factory. This will reset the wrapped reducer on logout action.
 * @param {*} reducer Wrapped reducer
 */
export function logoutReducerFactory(reducer) {
  return (state, action) => {
    switch (action.type) {
      case LOGOUT:
        return reducer(undefined, action);
      default:
        return reducer(state, action);
    }
  };
}

export function networkStatusReducer(state = successCodes.NETWORK_CONNECTION_OK, action) {
  switch (action.type) {
    case NETWORK_CONNECTION_ERROR: {
      return errorCodes.NETWORK_CONNECTION_ERROR;
    }
    case NETWORK_CONNECTION_OK: {
      return successCodes.NETWORK_CONNECTION_OK;
    }
    default: {
      return state;
    }
  }
}

// eslint-disable-next-line max-len
export function requestStatusReducerFactory(requestAction, successAction, errorAction) {
  const initialState = createDefaultRequestStatus();

  return (state = initialState, action) => {
    switch (action.type) {
      case requestAction: {
        const skip = _.get(action, 'payload.skip');
        const limit = _.get(action, 'payload.limit');

        return {
          ...initialState,
          inProgress: true,
          skip,
          limit,
        };
      }
      case errorAction: {
        const errorCode = _.get(action, 'payload.errorCode', null);

        return {
          ...state,
          errorCode,
          inError: true,
          inProgress: false,
        };
      }
      case successAction: {
        const append = _.get(action, 'payload.append');
        const items = _.get(action, 'payload.items');
        const skip = _.get(action, 'payload.skip', INITIAL_SKIP);
        const limit = _.get(action, 'payload.limit', PAGE_SIZE);

        const itemsCount = _.size(items);
        const pagination = !append ? {
          skip,
          limit,
        } : {};

        return {
          ...state,
          ...pagination,
          errorCode: null,
          inError: false,
          inProgress: false,
          hasMore: itemsCount === limit,
        };
      }
      default: {
        return state;
      }
    }
  };
}

export default combineReducers({ networkStatus: networkStatusReducer });
