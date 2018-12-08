import _ from 'lodash';
import {
  MODULE_NAME,
  errorCodes,
} from '../const';

export function getModuleState(state, moduleName) {
  return _.get(state, moduleName);
}

export function getNetworkStatus(state) {
  return _.get(getModuleState(state, MODULE_NAME), 'networkStatus', null);
}

export function isNetworkConnectionError(state) {
  const networkStatus = getNetworkStatus(state);
  return (networkStatus === errorCodes.NETWORK_CONNECTION_ERROR);
}

export function getCollection(collection) {
  return _.get(collection, 'collection');
}

export function getLastUpdated(collection) {
  return _.get(collection, 'lastUpdated');
}
