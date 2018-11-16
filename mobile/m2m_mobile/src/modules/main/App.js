import React from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './navigator';

import { composeStore } from './redux';

const {
  rootReducer,
  enhancers,
} = composeStore();

const store = createStore(
  rootReducer,
  enhancers,
);

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}
