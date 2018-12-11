export const MODULE_NAME = 'CORE_MODULE';

/**
 * Default page size for collections
 */
export const PAGE_SIZE = 100;

/**
 * Default skip for collections
 */
export const INITIAL_SKIP = 0;

/**
 * Number of miliseconds before cache expires (15min)
 */
export const CACHE_EXPIRY = 15 * 60 * 1000;

export const NETWORK_ERROR_CODE_IOS = -1009;
export const NETWORK_ERROR_CODE_ANDROID = -2;

export const errorCodes = {
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  INVALID_ACCESS_TOKEN: 'INVALID_JWT_TOKEN',
  NETWORK_CONNECTION_ERROR: 'NETWORK_CONNECTION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
};

export const successCodes = { NETWORK_CONNECTION_OK: 'NETWORK_CONNECTION_OK' };
