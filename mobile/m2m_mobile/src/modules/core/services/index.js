export { canonicalResource } from './modules';

export {
  buildRequestEndpoint,
  fetchRequest,
  isRequestNetworkConnectionError,
  isCacheValid,
  isRequestServerError,
  isRequestUnauthorized,
  isWebViewNetworkError,
} from './networking';

export {
  buildActionType,
  createDefaultRequestStatus,
  shouldRefreshData,
  requestStatusShape,
  resolveNextPageParams,
} from './actions';

export {
  isIPhoneX,
  ifIPhoneX,
  getStatusBarHeight,
  isAndroid,
} from './platform';
