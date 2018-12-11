import _ from 'lodash';

export function getAuthState(state) {
  return _.get(state, 'AUTH_MODULE');
}

export function getGoogleAuthToken(state) {
  const authState = getAuthState(state);

  return _.get(authState, 'googleToken');
}

export function getSessionAuthToken(state) {
  const authState = getAuthState(state);

  return _.get(authState, 'sessionToken');
}

export function getUser(state) {
  const authState = getAuthState(state);

  return _.get(authState, 'user');
}
