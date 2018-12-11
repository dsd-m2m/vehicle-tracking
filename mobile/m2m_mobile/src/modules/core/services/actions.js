import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  INITIAL_SKIP,
  PAGE_SIZE,
} from '../const';

export function buildActionType(moduleName, actionType) {
  return `@@PuppySpot-PPA/${moduleName}/${actionType}`;
}

export const requestStatusShape = PropTypes.shape({
  errorCode: PropTypes.string,
  inError: PropTypes.bool,
  inProgress: PropTypes.bool,
});

export function createDefaultRequestStatus() {
  return {
    errorCode: null,
    inError: false,
    inProgress: false,
    skip: INITIAL_SKIP,
    limit: PAGE_SIZE,
    hasMore: false,
  };
}

export function shouldRefreshData(data, requestStatus) {
  if (_.isEmpty(data) || _.isEmpty(requestStatus)) {
    return true;
  }

  if (requestStatus.inProgress) {
    return false;
  }

  if (requestStatus.inError) {
    return true;
  }

  return requestStatus.hasMore;
}

const FIRST_PAGE = {
  skip: INITIAL_SKIP,
  limit: PAGE_SIZE,
};

/**
 * Resolves next page parameters from current pagination
 * status in request status object.
 * @param {object} requestStatus Request status object
 * @param {bool} append An indication whether action is appending data
 */
export function resolveNextPageParams(requestStatus, append, pageSize = PAGE_SIZE) {
  if (!append) {
    return {
      ...FIRST_PAGE,
      limit: pageSize,
    };
  }

  const skip = _.get(requestStatus, 'skip');

  return {
    skip: skip + pageSize,
    limit: pageSize,
  };
}
