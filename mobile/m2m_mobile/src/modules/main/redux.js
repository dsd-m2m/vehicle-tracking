import {
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// Load all imported application modules
export function composeRootReducer() {
  const moduleReducers = { };

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
    enhancers,
    rootReducer,
  };
}
