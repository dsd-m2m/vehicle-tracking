import _ from 'lodash';

export function getParams(navigation) {
  return _.get(navigation, 'state.params', {});
}
