import _ from 'lodash';

export function getHomeState(state) {
  return _.get(state, 'HOME_MODULE');
}

export function getCarState(state) {
  const homeState = getHomeState(state);

  return _.get(homeState, 'carState');
}

export function getSocket(state) {
  const homeState = getHomeState(state);

  return _.get(homeState, 'socket');
}

export function getTripData(state) {
  const homeState = getHomeState(state);

  return _.get(homeState, 'tripData');
}
