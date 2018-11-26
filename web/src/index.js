import React from 'react';
import thunkMiddleware from 'redux-thunk';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';

import rootReducer from './_reducers';
import App from './App';

const history = createBrowserHistory();
const loggerMiddleware = createLogger();
const store = createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware, loggerMiddleware),
);

ReactDom.render(
	<Provider store={store}>
		<App history={history} />
	</Provider>,
	document.getElementById('app'),
);
