import {
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import {
  reducer as homeReducer,
  MODULE_NAME as HOME_MODULE,
} from '~/modules/home';
import {
  reducer as authReducer,
  MODULE_NAME as AUTH_MODULE,
} from '~/modules/auth';
import {
  reducer as loadingReducer,
  MODULE_NAME as LOADING_MODULE,
} from '~/modules/loading';
import {
  reducer as settingsReducer,
  MODULE_NAME as SETTINGS_MODULE,
} from '~/modules/settings';
import {
  reducer as appInfoReducer,
  MODULE_NAME as APP_INFO_MODULE,
} from '~/modules/app-info';
import {
  reducer as carInfoReducer,
  MODULE_NAME as CAR_INFO_MODULE,
} from '~/modules/car-info';
import {
  reducer as locationReducer,
  MODULE_NAME as LOCATION_MODULE,
} from '~/modules/location';
import {
  reducer as tripsReducer,
  MODULE_NAME as TRIPS_MODULE,
} from '~/modules/trips';


// Load all imported application modules
export function composeRootReducer() {
  const moduleReducers = {
    [HOME_MODULE]: homeReducer,
    [AUTH_MODULE]: authReducer,
    [LOADING_MODULE]: loadingReducer,
    [SETTINGS_MODULE]: settingsReducer,
    [APP_INFO_MODULE]: appInfoReducer,
    [CAR_INFO_MODULE]: carInfoReducer,
    [LOCATION_MODULE]: locationReducer,
    [TRIPS_MODULE]: tripsReducer,
  };

  return combineReducers(moduleReducers);
}

// Define module enhancers
// Make sure that you follow right module order
export function collectModuleEnhancers() {
  const moduleEnhancers = [];
  return moduleEnhancers;
}

export function collectCoreMiddlewares() {
  const coreMiddlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    coreMiddlewares.push(createLogger());
  }

  return coreMiddlewares;
}

export function collectModuleMiddlewares() {
  // Define module middlewares
  // Make sure that you follow right module order
  const moduleMiddleware = [];

  return moduleMiddleware;
}

export function composeStore() {
  const moduleEnhancers = collectModuleEnhancers();
  const middlewares = [...collectCoreMiddlewares(), ...collectModuleMiddlewares()];

  const enhancers = compose(
    ...moduleEnhancers,
    applyMiddleware(...middlewares),
  );

  const rootReducer = composeRootReducer();

  return {
    rootReducer,
    enhancers,
  };
}
